import type {
  EnumSchemaObject,
  MediaTypeObject,
  MediaTypes,
  OperationObject,
  ParameterIn,
  ParameterObject,
  SchemaFormatType,
  SchemaObject,
} from "@apicodegen/core";
import { Base, HttpMethods, NonArraySchemaType } from "@apicodegen/core";
import { OpenAPIV3 } from "openapi-types";

export class V3 {
  doc!: OpenAPIV3.Document;

  constructor(doc: OpenAPIV3.Document) {
    this.doc = doc;
  }

  /**
   * Is array schema.
   */
  private isOpenAPIArraySchema(
    schema: OpenAPIV3.SchemaObject,
  ): schema is OpenAPIV3.ArraySchemaObject {
    return typeof schema === "object" && schema.type === "array";
  }

  /**
   * OpenAPI schema to base schema.
   */
  private getSchemaByRef(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
    reserveRef = false,
    enums: EnumSchemaObject[] = [],
    upLevelSchemaKey = "",
  ): SchemaObject {
    let refName = "";
    if (Base.isRef(schema)) {
      refName = Base.capitalize(Base.ref2name(schema.$ref));
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName,
        };
      }
      schema = this.doc.components?.schemas?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV3.SchemaObject;
    }

    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }

  /**
   * OpenAPI parameter to base parameter.
   */
  private getParameterByRef(
    schema: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
    enums: EnumSchemaObject[] = [],
    upLevelSchemaKey = "",
  ): ParameterObject {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.parameters?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV3.ParameterObject;
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
        Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
        Base.upperCamelCase(Base.normalize(name));

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
    schema: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject,
  ): MediaTypeObject[] {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.responses?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV3.ResponseObject;
    }

    const { content = {} } = schema;

    return Object.keys(content).map((c) => ({
      type: c as MediaTypes,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema, true),
    }));
  }

  /**
   * OpenAPI schema to requestBody.
   */
  private getRequestBodyByRef(
    schema: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject,
    enums: EnumSchemaObject[] = [],
  ): MediaTypeObject[] {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.requestBodies?.[
        Base.ref2name(schema.$ref, this.doc)
      ] as OpenAPIV3.RequestBodyObject;
    }

    const { content = {} } = schema;

    return Object.keys(content).map((c) => ({
      type: c as MediaTypes,
      schema:
        content[c].schema &&
        this.getSchemaByRef(content[c].schema, false, enums),
    }));
  }

  /**
   * Transform all OpenAPI schema to Base Schema
   */
  private toBaseSchema(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined,
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
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey),
      };
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
          Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
          Base.upperCamelCase(Base.normalize(schemaKey));

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
            ? {
                ...s,
                ref: s.$ref,
                type: Base.capitalize(Base.ref2name(s.$ref, this.doc)),
              }
            : this.toBaseSchema(s, enums),
        ),
        anyOf: anyOf?.map((s) =>
          Base.isRef(s)
            ? {
                ...s,
                ref: s.$ref,
                type: Base.capitalize(Base.ref2name(s.$ref, this.doc)),
              }
            : this.toBaseSchema(s, enums),
        ),
        oneOf: oneOf?.map((s) =>
          Base.isRef(s)
            ? {
                ...s,
                ref: s.$ref,
                type: Base.capitalize(Base.ref2name(s.$ref, this.doc)),
              }
            : this.toBaseSchema(s, enums),
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema)
              ? {
                  type: Base.capitalize(
                    Base.ref2name(propSchema.$ref, this.doc),
                  ),
                }
              : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey),
          };
        }, {}),
      };
    }
  }

  public init() {
    const { components = {}, paths = {} } = this.doc;
    const enums: EnumSchemaObject[] = [];
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {},
    } = components;

    const schemas_ = Object.keys(schemas).reduce((acc, key) => {
      const schema = schemas[key];

      return {
        ...acc,
        [key]: this.getSchemaByRef(schema, false, enums, key),
      };
    }, {});

    const parameters_ = Object.keys(parameters).reduce((acc, key) => {
      const parameter = parameters[key];

      return {
        ...acc,
        [key]: this.getParameterByRef(parameter, enums, key),
      };
    }, {});

    const responses_ = Object.keys(responses).reduce((acc, key) => {
      const response = responses[key];

      return {
        ...acc,
        [key]: this.getResponseByRef(response),
      };
    }, {});

    const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
      const requestBody = requestBodies[key];

      return {
        ...acc,
        [key]: this.getRequestBodyByRef(requestBody, enums),
      };
    }, {});

    const apis = Object.keys(paths).reduce((acc, path) => {
      const pathObject = paths[path] ?? {};
      const { $ref } = pathObject;

      const methodApis: OperationObject[] = [];
      if ($ref) {
        // TODO: Need to handle ref senario
      } else {
        const { parameters = [], description, summary } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method as OpenAPIV3.HttpMethods];

          if (methodObject) {
            const {
              deprecated,
              operationId,
              responses = {},
              summary: summary_,
              description: description_,
              requestBody = { content: {} },
            } = methodObject;
            const { parameters: parameters_ = [] } = methodObject;
            const baseParameters = [...parameters, ...parameters_].map(
              (parameter) => this.getParameterByRef(parameter, enums),
            );
            const baseRequestBody = this.getRequestBodyByRef(
              requestBody,
              enums,
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
                const response = responses[code];
                const responseSchema = this.getResponseByRef(response);
                methodApis.push({
                  method,
                  operationId,
                  summary: summary_ ?? summary,
                  description: description_ ?? description,
                  deprecated: deprecated,
                  parameters: uniqueParameterName.map(
                    (name) => baseParameters.find((p) => p.name === name)!,
                  ),
                  responses: responseSchema,
                  requestBody: baseRequestBody,
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
      schemas: schemas_,
      responses: responses_,
      parameters: parameters_,
      requestBodies: requestBodies_,
      apis,
    };
  }
}
