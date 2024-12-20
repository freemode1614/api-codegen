import { createScopedLogger } from "@moccona/logger";
import { OpenAPIV3 } from "openapi-types";

import Adaptor from "@/providers/Adaptor";
import Client from "@/providers/Client";
import type { ApiObject } from "@/types/api";
import { isV3ArrySchemaObject, isV3ReferenceObject } from "@/types/openapi";
import type { MaybeTagItem } from "@/types/tag";
import {
  ArrayType,
  IntersectionType,
  intersectionType,
  PropertySignature,
  TypeAlias,
  TypeReference,
  UnionType,
  unionType,
} from "@/types/type";
import format2type from "@/utils/format2type";
import { capitalize } from "@/utils/pathToName";
import reference2name from "@/utils/reference2name";

const logger = createScopedLogger("OpenAPIV3");

export default class OpenApiV3 implements Adaptor {
  protected enums: Record<string, OpenAPIV3.SchemaObject["enum"]> = {};
  private client: Client;

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
        ...this.analysisMediaSchemas(schemas_, requestBodies),
        ...this.analysisMediaSchemas(schemas_, responses),
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

  protected analysisMediaSchemas(
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

  protected expandSchemaObject(schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject): ArrayType["elementType"] {
    const schema_ = isV3ReferenceObject(schema) ? this.schemas[reference2name(schema.$ref)] : schema;

    if (isV3ArrySchemaObject(schema_)) {
      const { items } = schema_;

      return {
        typeName: "Array",
        typeArguments: [isV3ReferenceObject(items) ? reference2name(items.$ref) : this.expandSchemaObject(items)],
      } as TypeReference;
    } else {
      const { type, format, properties, allOf, oneOf, anyOf } = schema_;

      if (oneOf || anyOf) {
        return {
          type: unionType,
          types: (oneOf ?? anyOf ?? allOf)!.map((s) => this.expandSchemaObject(s)),
        } as unknown as UnionType;
      }

      if (allOf) {
        return {
          type: intersectionType,
          types: allOf.map((schema) =>
            isV3ReferenceObject(schema) ? reference2name(schema.$ref) : this.expandSchemaObject(schema),
          ),
        } as unknown as IntersectionType;
      }

      if (type === "object" && !properties) {
        return {
          typeName: "Record",
          typeArguments: ["string", "unknown"],
        };
      }

      if (type === "object" && properties && Object.keys(properties).length > 0) {
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
                this.enums[capitalize(propKey)] = propSchema.enum;
                acc.push({
                  name: propKey,
                  type: capitalize(propKey),
                });
              } else {
                acc.push({
                  name: propKey,
                  type: this.expandSchemaObject(propSchema),
                });
              }
            }

            return acc;
          }, []),
        };
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
      const { name, deprecated, schema, required } = parameter;
      if (schema) {
        items.push({
          name,
          require: !!required,
          deprecated: !!deprecated,
          type: this.expandSchemaObject(schema),
        });
      }
    });

    return items;
  }

  protected analysisApis() {
    const { paths } = this.doc;

    if (Object.keys(paths).length === 0) {
      return [];
    }

    return Object.entries(paths).reduce<ApiObject[]>((acc, [path, schema]) => {
      const apiObjects: ApiObject[] = [];

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

            const apiObject = {
              comments,
              method,
              url: path,
            } as ApiObject;

            if (requestBody) {
              const type = isV3ReferenceObject(requestBody)
                ? reference2name(requestBody.$ref)
                : this.expandSchemaObject(Object.values(requestBody.content)[0].schema!);

              apiObject.parameters = [
                {
                  type,
                  name: "req",
                },
              ];
            } else {
              apiObject.parameters = this.expandParameterSchema(parameters);
            }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            const mediaType = responses["200"] || responses["201"];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (mediaType) {
              apiObject.response = isV3ReferenceObject(mediaType)
                ? reference2name(mediaType.$ref)
                : this.expandSchemaObject(
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    (mediaType.content!["*/*"] || mediaType.content!["application/json"]).schema!,
                  );
            } else {
              apiObject.response = "";
            }

            apiObjects.push(apiObject);
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

  public parse() {
    const apis = this.analysisApis();
    logger.debug(apis);

    const code = [
      this.banner,
      Object.keys(this.schemas).map((typeName) => {
        const schema = this.schemas[typeName];
        const typeAlias: TypeAlias = {
          name: typeName,
          modifier: ["export"],
          type: this.expandSchemaObject(schema),
        };

        return this.client.typeDeclaration(typeAlias);
      }),
    ].join("\n\n");

    return code;
  }
}
