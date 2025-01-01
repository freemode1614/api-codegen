/* eslint-disable unicorn/filename-case */
/**
 * OpenAPI v3 Schema Parser and Code Generator
 * Converts OpenAPI v3 specifications to TypeScript code
 */

import { createScopedLogger } from "@moccona/logger";
import { OpenAPIV3 } from "openapi-types";

import Adaptor from "@/providers/Adaptor";
import Client from "@/providers/Client";
import { ClientInfo } from "@/types/client";
import { isV3ArrySchemaObject, isV3ReferenceObject } from "@/types/openapi";
import type { MaybeTagItem } from "@/types/tag";
import {
  ArrayType,
  Enum,
  IntersectionType,
  intersectionType,
  PropertySignature,
  TypeAlias,
  UnionType,
  unionType,
} from "@/types/type";
// Utilities
import format2type from "@/utils/format2type";
import { formatCode } from "@/utils/formatCode";
import isSameEnum from "@/utils/isSameEnum";
import normalizeName from "@/utils/normalizeName";
import pathToName, { capitalize, upperCamelCase } from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";
import { writeToFile } from "@/utils/writetoFile";

const logger = createScopedLogger("OpenAPIV3");

/**
 * OpenApiV3 Class
 * Implements the Adaptor interface for OpenAPI v3 schema parsing
 */
export default class OpenApiV3 implements Adaptor {
  /** Store for enum definitions generated during parsing */
  protected enums: Record<string, Enum> = {};

  /** Client instance for code generation */
  private client: Client;

  /**
   * Returns the banner comment for generated code
   * Including version, title and description from OpenAPI doc
   */
  public get banner() {
    const { info } = this.doc;
    const { version, title, description } = info;

    return this.client.comment([
      {
        comment: version,
      },
      { comment: title },
      { comment: description ?? "" },
    ]);
  }

  public get schemas() {
    const { components } = this.doc;
    if (components) {
      const { schemas = {}, requestBodies = {}, responses = {} } = components;

      const schemas_ = schemas as Record<string, OpenAPIV3.SchemaObject>;

      return {
        ...schemas,
        ...this.analyzeMediaSchemas(schemas_, requestBodies),
        ...this.analyzeMediaSchemas(schemas_, responses),
      } as Record<string, OpenAPIV3.SchemaObject>;
    }

    return {};
  }

  public get parameters() {
    const { components } = this.doc;
    if (components) {
      const { parameters = {}, headers = {} } = components;

      return {
        ...(headers as Record<string, OpenAPIV3.ParameterObject>),
        ...(parameters as Record<string, OpenAPIV3.ParameterObject>),
      };
    }

    return {};
  }

  protected analyzeMediaSchemas(
    schemas: Record<string, OpenAPIV3.SchemaObject>,
    mediaSchemas: Record<string, OpenAPIV3.RequestBodyObject | OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject>,
  ) {
    const resolveReference = (ref: string) => schemas[reference2name(ref)];

    const otherSchemasWithNoReference = {};

    return Object.entries(mediaSchemas).reduce<Record<string, OpenAPIV3.SchemaObject>>((acc, [key, schema]) => {
      key = upperCamelCase(normalizeName(key));

      if (isV3ReferenceObject(schema)) {
        return Object.assign(acc, {
          [key]: resolveReference(schema.$ref),
        });
      }

      const { content } = schema;

      if (!content) {
        return acc;
      }

      const mediaTypeSchema = (
        "application/json" in content
          ? content["application/json"]
          : "*/*" in content
            ? content["*/*"]
            : Object.values(content)[0]
      ).schema;

      if (!mediaTypeSchema) {
        return acc;
      }

      if ((mediaTypeSchema as OpenAPIV3.ReferenceObject).$ref) {
        return Object.assign(acc, {
          [key]: resolveReference((mediaTypeSchema as OpenAPIV3.ReferenceObject).$ref),
        });
      }

      return Object.assign(acc, {
        [key]: mediaTypeSchema as OpenAPIV3.SchemaObject,
      });
    }, otherSchemasWithNoReference);
  }

  protected expandSchemaObject(
    schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
    parentName: string,
  ): ArrayType["elementType"] {
    if (isV3ReferenceObject(schema)) return upperCamelCase(reference2name(schema.$ref));
    if (isV3ArrySchemaObject(schema)) {
      const { items } = schema;
      if (isV3ReferenceObject(items)) {
        return {
          elementType: upperCamelCase(reference2name(items.$ref)),
        } as ArrayType;
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const isEmptyItems = items == undefined || Object.keys(items).length === 0;

      return {
        elementType: isEmptyItems ? "unknown" : this.expandSchemaObject(items, ""),
      } as ArrayType;
    } else {
      const { type, format, allOf, oneOf, anyOf, enum: enums_, required, additionalProperties } = schema;
      const { properties } = schema;

      if (oneOf || anyOf) {
        return {
          name: unionType,
          types: (oneOf ?? anyOf ?? allOf)!.map((s) => this.expandSchemaObject(s, "")),
        } as UnionType;
      }

      if (allOf) {
        return {
          name: intersectionType,
          types: allOf.map((schema) =>
            isV3ReferenceObject(schema)
              ? upperCamelCase(reference2name(schema.$ref))
              : this.expandSchemaObject(schema, ""),
          ),
        } as IntersectionType;
      }

      if (type === "object" && !properties) {
        return {
          typeName: "Record",
          typeArguments: ["string", "unknown"],
        };
      }

      if (additionalProperties) {
        const propertiesSchema = isV3ReferenceObject(additionalProperties)
          ? this.schemas[reference2name(additionalProperties.$ref)]
          : additionalProperties;

        if (typeof propertiesSchema !== "boolean") {
          return this.expandSchemaObject(propertiesSchema, "");
        }
      }

      if (properties && Object.keys(properties).length > 0) {
        return {
          members: Object.keys(properties).reduce<PropertySignature[]>((acc, propKey) => {
            const propSchema = properties[propKey];

            if (isV3ReferenceObject(propSchema)) {
              acc.push({
                name: propKey,
                type: upperCamelCase(reference2name(propSchema.$ref)),
              });
            } else {
              if (propSchema.enum) {
                const name = capitalize(parentName) + capitalize(propKey);
                const preDefinedSchemaName = this.getEnum(propSchema.enum);
                if (preDefinedSchemaName) {
                  acc.push({
                    name: propKey,
                    type: name,
                  });
                } else {
                  acc.push({
                    name: propKey,
                    type: {
                      name: unionType,
                      types:
                        propSchema.type === "number"
                          ? ([...new Set(propSchema.enum)] as (string | number)[])
                          : ([...new Set(propSchema.enum)] as (string | number)[]).map((v) => `"${v}"`),
                    } as UnionType,
                  });
                }
              } else {
                if ((propSchema as OpenAPIV3.ParameterObject).in === "cookie") {
                  acc.push({
                    in: (propSchema as OpenAPIV3.ParameterObject).in,
                    deprecated: propSchema.deprecated,
                    name: propKey,
                    format: propSchema.format,
                    required: (propSchema as OpenAPIV3.ParameterObject).required ?? required?.includes(propKey),
                    type: this.expandSchemaObject(propSchema, propKey),
                    description: propSchema.description,
                  } as PropertySignature);
                }
              }
            }

            return acc;
          }, []),
        };
      }

      if (enums_) {
        return {
          name: unionType,
          types: (enums_ as (string | number)[]).map((v) => `"${v}"`),
        } as UnionType;
      }

      // @ts-expect-error format and type are good.
      return format ? format2type(format) : format2type(type);
    }
  }

  protected expandParameterSchema(
    parameters: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[],
  ): PropertySignature[] {
    const items: PropertySignature[] = [];

    parameters.forEach((parameter) => {
      parameter = isV3ReferenceObject(parameter) ? this.parameters[reference2name(parameter.$ref)] : parameter;
      const { name, deprecated, schema, required, in: in_ } = parameter;
      if (schema) {
        items.push({
          name,
          in: in_,
          required: !!required,
          deprecated: !!deprecated,
          type: this.expandSchemaObject(schema, name),
        });
      }
    });

    return items;
  }

  private getEnum(enumValue: unknown[]) {
    const enum_ = Object.values(this.enums).find((value) =>
      isSameEnum(
        value.members.map((m) => m.name),
        enumValue,
      ),
    );

    return enum_?.name;
  }

  protected analyzeApis() {
    const { paths } = this.doc;
    if (Object.keys(paths).length === 0) {
      return [];
    }
    const schemas = this.schemas;
    for (const schemaKey in schemas) {
      const schema = schemas[schemaKey];
      if (schema.properties) {
        for (const propKey in schema.properties) {
          const prop = schema.properties[propKey];
          if (!isV3ReferenceObject(prop) && prop.enum) {
            const name = capitalize(schemaKey) + capitalize(propKey);
            this.enums[name] = {
              name,
              modifier: ["export"],
              members: [...new Set(prop.enum)].map((value: string) => ({ name: value, type: value })),
            } as Enum;
          }
        }
      }
    }
    return Object.entries(paths).reduce<ClientInfo[]>((acc, [path, schema]) => {
      const apiObjects: ClientInfo[] = [];

      if (schema) {
        const { parameters: commonParameters = [] } = schema;
        Object.keys(OpenAPIV3.HttpMethods).forEach((method) => {
          //@ts-expect-error Make it all lowercase
          const apiMethodObject = schema[(method as keyof typeof schema).toLowerCase()] as
            | OpenAPIV3.OperationObject
            | undefined;

          if (apiMethodObject) {
            const methodSchema = apiMethodObject;
            const {
              summary,
              description,
              parameters = [],
              responses = {},
              deprecated,
              requestBody,
              tags = [],
              operationId,
            } = methodSchema;

            commonParameters.forEach((p) => {
              if (
                !parameters
                  .map((s) => (isV3ReferenceObject(s) ? reference2name(s.$ref) : s.name))
                  .includes(isV3ReferenceObject(p) ? reference2name(p.$ref) : p.name)
              ) {
                parameters.push(p);
              }
            });

            const comments = [
              summary && {
                comment: summary,
              },
              description && {
                comment: description,
              },
              tags.length > 0 && {
                tag: "tag",
                comment: tags.join(", "),
              },
              deprecated && {
                tag: "deprecated",
                name: "",
                comment: "",
              },
            ].filter(Boolean) as MaybeTagItem[];

            const clientApiObject = {
              comments,
              method,
              url: path,
              name: pathToName(path, method, operationId),
              metadata: {},
            } as ClientInfo;

            if (requestBody) {
              if (isV3ReferenceObject(requestBody)) {
                clientApiObject.body = upperCamelCase(reference2name(requestBody.$ref));
              } else {
                const shouldPutInFormData =
                  "multipart/form-data" in requestBody.content ||
                  "application/x-www-form-urlencoded" in requestBody.content;

                clientApiObject.metadata.useFormData = shouldPutInFormData;

                const type = Object.values(requestBody.content)[0].schema;

                if (isV3ReferenceObject(type)) {
                  clientApiObject.body = upperCamelCase(reference2name(type.$ref));
                } else {
                  if (type?.properties) {
                    const required = type.required;
                    Object.assign(
                      type.properties,
                      Object.keys(type.properties).reduce((acc, propName) => {
                        const schema = type.properties![propName];
                        return {
                          ...acc,
                          [propName]: {
                            ...schema,
                            required: shouldPutInFormData || required?.includes(propName),
                            in: shouldPutInFormData ? "form-data" : "body",
                          },
                        };
                      }, {}),
                    );
                  }

                  clientApiObject.body = type ? this.expandSchemaObject(type, "") : "";
                }
              }
            }

            if (parameters.length === 0) {
              clientApiObject.parameters = "";
            } else {
              clientApiObject.parameters = {
                members: this.expandParameterSchema(parameters),
              };
            }

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const mediaType = responses["200"] || responses["201"];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (mediaType) {
              if (isV3ReferenceObject(mediaType)) {
                clientApiObject.response = upperCamelCase(reference2name(mediaType.$ref));
              } else {
                if (mediaType.content) {
                  const shouldParseResponseToJSON =
                    "application/json" in mediaType.content || "*/*" in mediaType.content;

                  clientApiObject.metadata.useJSONResponse = shouldParseResponseToJSON;

                  const type = (
                    "*/*" in mediaType.content
                      ? mediaType.content["*/*"]
                      : "application/json" in mediaType.content
                        ? mediaType.content["application/json"]
                        : Object.values(mediaType.content)[0]
                  ).schema;

                  if (type) {
                    if (isV3ReferenceObject(type)) {
                      clientApiObject.response = upperCamelCase(reference2name(type.$ref));
                    } else {
                      clientApiObject.response = this.expandSchemaObject(type, "");
                    }
                  }
                } else {
                  clientApiObject.response = "";
                }
              }
            } else {
              clientApiObject.response = "";
            }

            apiObjects.push(clientApiObject);
          }
        });
      }

      return [...acc, ...apiObjects];
    }, []);
  }

  protected readonly doc!: OpenAPIV3.Document;

  constructor(doc: OpenAPIV3.Document, client: Client) {
    this.doc = doc;
    this.client = client;
  }

  public async parse() {
    const apis = this.analyzeApis();
    logger.debug(apis);

    const code = [
      this.banner,
      Object.keys(this.enums)
        .map((enumName) => this.client.enumDeclaration(this.enums[enumName]))
        .join("\n\n"),
      "\n\n",
      Object.keys(this.schemas)
        .map((typeName) => {
          const schema = this.schemas[typeName];
          const typeAlias: TypeAlias = {
            name: upperCamelCase(typeName),
            modifier: ["export"],
            type: this.expandSchemaObject(schema, typeName),
          };

          return this.client.typeDeclaration(typeAlias, true);
        })
        .join(";\n\n"),
      "\n\n",
      this.client.templates(apis),
    ].join("\n");

    writeToFile("output.ts", await formatCode(code))
      .then(() => {
        //
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return await formatCode(code);
  }
}
