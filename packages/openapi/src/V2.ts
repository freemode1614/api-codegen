/* eslint-disable unicorn/filename-case */

import {
  ArrayTypeSchemaObject,
  EnumSchemaObject,
  MediaTypeObject,
  MediaTypes,
  OperationObject,
  ParameterIn,
  ParameterObject,
  SchemaFormatType,
  SchemaObject,
} from "@moccona/api-codegen";
import { Base, HttpMethods, NonArraySchemaType } from "@moccona/api-codegen";
import { IJsonSchema, OpenAPIV2 } from "openapi-types";

export class V2 {
  doc!: OpenAPIV2.Document;

  constructor(doc: OpenAPIV2.Document) {
    this.doc = doc;
  }

  /**
   * Is array schema.
   */
  private isOpenAPIArraySchema(schema: OpenAPIV2.SchemaObject): boolean {
    return typeof schema === "object" && schema.type === "array";
  }

  /**
   * OpenAPI schema to base schema.
   */
  private getSchemaByRef(
    schema: OpenAPIV2.SchemaObject | OpenAPIV2.ReferenceObject,
    reserveRef = false,
    enums: EnumSchemaObject[] = [],
    upLevelSchemaKey = "",
  ): SchemaObject {
    let refName = "";
    if (Base.isRef(schema)) {
      refName = Base.upperCamelCase(Base.ref2name(schema.$ref));
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName,
        };
      }

      if (!this.doc.definitions) {
        this.doc.definitions = {};
      }

      schema = this.doc.definitions[Base.ref2name(schema.$ref, this.doc)];
    }

    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }

  /**
   * Transform all OpenAPI schema to Base Schema
   */
  private toBaseSchema(
    schema: OpenAPIV2.SchemaObject | OpenAPIV2.ReferenceObject | undefined,
    enums: EnumSchemaObject[] = [],
    schemaKey = "",
    upLevelSchemaKey = "",
  ): SchemaObject {
    if (!schema) {
      return {
        type: "unknown",
      };
    }

    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }

    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;

      return {
        type: type as string,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey),
      } as ArrayTypeSchemaObject;
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        deprecated,
        enum: enum_,
        format,
        oneOf,
        properties = {},
      } = schema;
      let { type } = schema;

      if (enum_ && type !== "boolean") {
        const name =
          Base.upperCamelCase(upLevelSchemaKey) +
          Base.upperCamelCase(schemaKey);

        const enumObject = {
          name,
          enum: [...new Set(enum_ as (string | number)[])],
        };

        const sameObject = Base.findSameSchema(enumObject, enums);

        if (
          !sameObject &&
          Base.isValidEnumType(schema as unknown as SchemaObject)
        ) {
          enums.push(enumObject);
        }

        return {
          type: sameObject
            ? sameObject.name
            : Base.isBooleanEnum(schema as unknown as SchemaObject)
              ? "boolean"
              : enumObject.name,
          required,
          description,
          deprecated,
        };
      }

      if (type === undefined && Object.keys(properties).length > 0) {
        type = NonArraySchemaType.object;
      }

      return {
        type: type as unknown as NonArraySchemaType,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format as unknown as SchemaFormatType,
        allOf: allOf?.map((s) =>
          Base.isRef(s)
            ? { type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc)) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject, enums),
        ),
        anyOf: anyOf?.map((s) =>
          Base.isRef(s)
            ? { type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc)) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject, enums),
        ),
        oneOf: oneOf?.map((s) =>
          Base.isRef(s)
            ? { type: Base.upperCamelCase(Base.ref2name(s.$ref, this.doc)) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject, enums),
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema)
              ? {
                  type: Base.upperCamelCase(
                    Base.ref2name(propSchema.$ref, this.doc),
                  ),
                }
              : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey),
          };
        }, {}),
      };
    }
  }

  /**
   * OpenAPI parameter to base parameter.
   */
  private getParameterByRef(
    schema: OpenAPIV2.ParameterObject | OpenAPIV2.ReferenceObject,
    enums: EnumSchemaObject[] = [],
    upLevelSchemaKey = "",
  ): ParameterObject {
    if (Base.isRef(schema)) {
      schema = this.doc.definitions?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV2.ParameterObject;
    }

    const {
      name,
      required,
      deprecated,
      description,
      schema: parameterSchema,
    } = schema;

    if (
      parameterSchema &&
      !Base.isRef(parameterSchema) &&
      parameterSchema.enum
    ) {
      const type =
        Base.upperCamelCase(upLevelSchemaKey) + Base.upperCamelCase(name);

      const enumSchema = {
        name: type,
        enum: [...new Set(parameterSchema.enum as (string | number)[])],
      };

      const sameEnum = Base.findSameSchema(enumSchema, enums);

      if (
        !sameEnum &&
        Base.isValidEnumType(parameterSchema as unknown as SchemaObject)
      ) {
        enums.push(enumSchema);
      }

      return {
        name,
        required,
        description,
        deprecated,
        in: schema.in as ParameterIn,
        schema: {
          type: sameEnum?.name ?? type,
        },
      };
    }

    return {
      name,
      required,
      description,
      deprecated,
      in: schema.in as ParameterIn,
      schema:
        schema.schema &&
        this.getSchemaByRef(
          schema.schema,
          false,
          enums,
          upLevelSchemaKey + Base.capitalize(name),
        ),
    };
  }

  /**
   * OpenAPI schema to base response
   */
  private getResponseByRef(
    schema: OpenAPIV2.ResponseObject | OpenAPIV2.ReferenceObject,
  ): MediaTypeObject[] {
    if (Base.isRef(schema)) {
      schema = this.doc.responses?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV2.ResponseObject;
    }

    const { schema: responseSchema } = schema;

    return [
      {
        type: MediaTypes.JSON,
        schema: responseSchema && this.getSchemaByRef(responseSchema, true),
      },
    ];
  }

  public init() {
    const { definitions = {}, responses = {}, paths = {} } = this.doc;
    const enums: EnumSchemaObject[] = [];

    const definitions_ = Object.keys(definitions).reduce((acc, key) => {
      const schema = definitions[key];

      return {
        ...acc,
        [key]: this.getSchemaByRef(schema, false, enums, key),
      };
    }, {});

    const responses_ = Object.keys(responses).reduce((acc, key) => {
      const response = responses[key];

      return {
        ...acc,
        [key]: this.getResponseByRef(response),
      };
    }, {});

    const apis = Object.keys(paths).reduce((acc, path) => {
      const pathObject = paths[path] ?? {};
      const { $ref } = pathObject;

      const methodApis: OperationObject[] = [];
      if ($ref) {
        // TODO: Need to handle ref senario
      } else {
        const { parameters = [] } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method as OpenAPIV2.HttpMethods];

          if (methodObject) {
            const {
              deprecated,
              operationId,
              summary: summary_,
              description: description_,
              responses = {},
            } = methodObject;
            const { parameters: parameters_ = [] } = methodObject;
            const baseParameters = [...parameters, ...parameters_].map(
              (parameter) => this.getParameterByRef(parameter, enums),
            );
            const uniqueParameterName = [
              ...new Set(baseParameters.map((p) => p.name)),
            ];
            if (Object.keys(responses).length === 0) {
              Object.assign(responses, {
                200: {
                  description: "Successful response",
                },
              });
            }
            const httpCodes = Object.keys(responses);
            for (const code of httpCodes) {
              if (code in responses) {
                const response = responses[code]!;
                const responseSchema = this.getResponseByRef(response);
                methodApis.push({
                  method,
                  operationId,
                  summary: summary_,
                  description: description_,
                  deprecated: deprecated,
                  parameters: uniqueParameterName.map(
                    (name) => baseParameters.find((p) => p.name === name)!,
                  ),
                  responses: responseSchema,
                  requestBody: undefined,
                });
                break;
              }
            }
          }
        });
      }

      return {
        ...acc,
        [path]: methodApis,
      };
    }, {});

    return {
      enums: Base.uniqueEnums(enums),
      schemas: definitions_,
      responses: responses_,
      parameters: {},
      requestBodies: {},
      apis,
    };
  }
}
