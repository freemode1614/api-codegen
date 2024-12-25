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
import pathToName, { capitalize } from "@/utils/pathToName";
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
      if (isV3ReferenceObject(schema)) {
        return Object.assign(acc, {
          [key]: resolveReference(schema.$ref),
        });
      }

      const { content } = schema;

      if (!content) {
        return acc;
      }

      const mediaTypeSchema = (content["application/json"] ?? content["*/*"]).schema;

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
    const schema_ = isV3ReferenceObject(schema) ? this.schemas[reference2name(schema.$ref)] : schema;

    if (isV3ArrySchemaObject(schema_)) {
      const { items } = schema_;
      if (isV3ReferenceObject(items)) {
        return {
          elementType: reference2name(items.$ref),
        } as ArrayType;
      }
      return {
        elementType: this.expandSchemaObject(items, ""),
      } as ArrayType;
    } else {
      const { type, format, properties, allOf, oneOf, anyOf, enum: enums_, required } = schema_;

      if (oneOf || anyOf) {
        return {
          type: unionType,
          types: (oneOf ?? anyOf ?? allOf)!.map((s) => this.expandSchemaObject(s, "")),
        } as unknown as UnionType;
      }

      if (allOf) {
        return {
          type: intersectionType,
          types: allOf.map((schema) =>
            isV3ReferenceObject(schema) ? reference2name(schema.$ref) : this.expandSchemaObject(schema, ""),
          ),
        } as unknown as IntersectionType;
      }

      if (type === "object" && !properties) {
        return {
          typeName: "Record",
          typeArguments: ["string", "unknown"],
        };
      }

      if (properties && Object.keys(properties).length > 0) {
        return {
          members: Object.keys(properties).reduce<PropertySignature[]>((acc, propKey) => {
            const propSchema = properties[propKey];

            if (isV3ReferenceObject(propSchema)) {
              acc.push({
                name: propKey,
                type: reference2name(propSchema.$ref),
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
                          ? (propSchema.enum as (string | number)[])
                          : (propSchema.enum as (string | number)[]).map((v) => `"${v}"`),
                    } as UnionType,
                  });
                }
              } else {
                acc.push({
                  name: propKey,
                  format: propSchema.format,
                  require: required?.includes(propKey),
                  type: this.expandSchemaObject(propSchema, propKey),
                });
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
      parameter = isV3ReferenceObject(parameter) ? this.parameters[parameter.$ref] : parameter;
      const { name, deprecated, schema, required, in: in_ } = parameter;
      if (schema) {
        items.push({
          name,
          in: in_,
          require: !!required,
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
              members: prop.enum.map((value: string) => ({ name: value, type: value })),
            };
          }
        }
      }
    }
    return Object.entries(paths).reduce<ClientInfo[]>((acc, [path, schema]) => {
      const apiObjects: ClientInfo[] = [];

      if (schema) {
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
            } as ClientInfo;

            if (requestBody) {
              if (isV3ReferenceObject(requestBody)) {
                clientApiObject.parameters = reference2name(requestBody.$ref);
              } else {
                const type = Object.values(requestBody.content)[0].schema!;
                if (isV3ReferenceObject(type)) {
                  if (parameters.length > 0) {
                    clientApiObject.parameters = {
                      members: [
                        ...this.expandParameterSchema(parameters),
                        {
                          name: reference2name(type.$ref).toLowerCase(),
                          type: reference2name(type.$ref),
                          in: "body",
                        },
                      ],
                    };
                  } else {
                    clientApiObject.parameters = reference2name(type.$ref);
                  }
                } else {
                  if (type.properties) {
                    Object.assign(
                      type.properties,
                      parameters.reduce((acc, p) => {
                        if (isV3ReferenceObject(p)) return acc;
                        return {
                          ...acc,
                          [p.name]: p.schema ?? { description: p.description, type: "string" },
                        };
                      }, {}),
                    );
                  }
                  clientApiObject.parameters = this.expandSchemaObject(type, "");
                }
              }
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
                clientApiObject.response = reference2name(mediaType.$ref);
              } else {
                if (mediaType.content) {
                  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                  const type = (mediaType.content["*/*"] || mediaType.content["application/json"]).schema!;
                  if (isV3ReferenceObject(type)) {
                    clientApiObject.response = reference2name(type.$ref);
                  } else {
                    clientApiObject.response = this.expandSchemaObject(type, "");
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
            name: typeName,
            modifier: ["export"],
            type: this.expandSchemaObject(schema, typeName),
          };

          return this.client.typeDeclaration(typeAlias);
        })
        .join(";\n\n"),
      "\n\n",
      this.client.templates(apis),
    ].join("\n");

    writeToFile("output.ts", code)
      .then(() => {
        //
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    return await formatCode(code);
  }
}
