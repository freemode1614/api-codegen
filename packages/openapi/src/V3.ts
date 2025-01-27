/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Base,
  HttpMethods,
  MediaTypeObject,
  MediaTypes,
  NonArraySchemaType,
  OperationObject,
  ParameterIn,
  ParameterObject,
  SchemaFormatType,
  SchemaObject,
} from "@moccona/codegen";
import { OpenAPIV3 } from "openapi-types";

export class V3 {
  doc!: OpenAPIV3.Document;

  constructor(doc: OpenAPIV3.Document) {
    this.doc = doc;
  }

  private isRef(schema: any): schema is OpenAPIV3.ReferenceObject {
    return "$ref" in schema && typeof schema.$ref === "string";
  }

  /**
   * Is array schema.
   */
  private isOpenAPIArraySchema(
    schema: OpenAPIV3.SchemaObject
  ): schema is OpenAPIV3.ArraySchemaObject {
    return schema.type === "array";
  }

  /**
   * OpenAPI schema to base schema.
   */
  private getSchemaByRef(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  ): SchemaObject {
    if (this.isRef(schema)) {
      schema = this.doc.components?.schemas?.[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV3.SchemaObject;
    }
    return this.toBaseSchema(schema);
  }

  /**
   * OpenAPI parameter to base parameter.
   */
  private getParameterByRef(
    schema: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject
  ): ParameterObject {
    if (this.isRef(schema)) {
      schema = this.doc.components?.parameters?.[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV3.ParameterObject;
    }

    const { name, required, deprecated, description } = schema;

    return {
      name,
      required,
      description,
      deprecated,
      in: schema.in as ParameterIn,
      schema: schema.schema && this.getSchemaByRef(schema.schema),
    };
  }

  /**
   * OpenAPI schema to base response
   */
  private getResponseByRef(
    schema: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject
  ): MediaTypeObject[] {
    if (this.isRef(schema)) {
      schema = this.doc.components?.responses?.[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV3.ResponseObject;
    }

    const { content = {} } = schema;

    return Object.keys(content).map((c) => ({
      type: c as MediaTypes,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema),
    }));
  }

  /**
   * OpenAPI schema to requestBody.
   */
  private getRequestBodyByRef(
    schema: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject
  ): MediaTypeObject[] {
    if (this.isRef(schema)) {
      schema = this.doc.components?.requestBodies?.[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV3.RequestBodyObject;
    }

    const { content = {} } = schema;

    return Object.keys(content).map((c) => ({
      type: c as MediaTypes,
      schema: content[c].schema && this.getSchemaByRef(content[c].schema),
    }));
  }

  /**
   * Transform all OpenAPI schema to Base Schema
   */
  private toBaseSchema(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject
  ): SchemaObject {
    if (this.isRef(schema)) {
      return this.getSchemaByRef(schema);
    }

    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;

      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items),
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

      if (type === undefined && Object.keys(properties).length > 0) {
        type = "object";
      }

      return {
        type: type as unknown as NonArraySchemaType,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format as unknown as SchemaFormatType,
        allOf: allOf?.map((s) =>
          this.isRef(s)
            ? { type: Base.capitalize(Base.ref2name(s.$ref)) }
            : this.toBaseSchema(s)
        ),
        anyOf: anyOf?.map((s) =>
          this.isRef(s)
            ? { type: Base.capitalize(Base.ref2name(s.$ref)) }
            : this.toBaseSchema(s)
        ),
        oneOf: oneOf?.map((s) =>
          this.isRef(s)
            ? { type: Base.capitalize(Base.ref2name(s.$ref)) }
            : this.toBaseSchema(s)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: this.isRef(propSchema)
              ? {
                  type: Base.capitalize(Base.ref2name(propSchema.$ref)),
                }
              : this.toBaseSchema(propSchema),
          };
        }, {}),
      };
    }
  }

  public init() {
    const { components = {}, paths = {} } = this.doc;
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
        [key]: this.getSchemaByRef(schema),
      };
    }, {});

    const parameters_ = Object.keys(parameters).reduce((acc, key) => {
      const parameter = parameters[key];

      return {
        ...acc,
        [key]: this.getParameterByRef(parameter),
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
        [key]: this.getRequestBodyByRef(requestBody),
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
              responses,
              requestBody = {
                content: {},
              },
              description: description_,
              summary: summary_,
              operationId,
              deprecated,
            } = methodObject;
            const { parameters: parameters_ = [] } = methodObject;
            const baseParameters = [...parameters, ...parameters_].map(
              this.getParameterByRef.bind(this)
            );
            const baseRequestBody = this.getRequestBodyByRef(requestBody);
            const uniqueParameterName = [
              ...new Set(baseParameters.map((p) => p.name)),
            ];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (responses) {
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
                      (name) => baseParameters.find((p) => p.name === name)!
                    ),
                    responses: responseSchema,
                    requestBody: baseRequestBody,
                  });
                  break;
                }
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
      schemas: schemas_,
      responses: responses_,
      parameters: parameters_,
      requestBodies: requestBodies_,
      apis,
    };
  }
}
