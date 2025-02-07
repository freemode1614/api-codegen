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
} from "@moccona/api-codegen";
import { OpenAPIV2, OpenAPIV3 } from "openapi-types";

export class V3 {
  doc!: OpenAPIV2.Document;

  constructor(doc: OpenAPIV2.Document) {
    this.doc = doc;
  }

  /**
   * OpenAPI schema to base schema.
   */
  private getSchemaByRef(
    schema: OpenAPIV2.SchemaObject | OpenAPIV2.ReferenceObject,
  ): SchemaObject {
    if (Base.isRef(schema)) {
      schema = this.doc.definitions?.schemas[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV2.SchemaObject;
    }
    return this.toBaseSchema(schema);
  }

  /**
   * OpenAPI parameter to base parameter.
   */
  private getParameterByRef(
    schema: OpenAPIV2.ParameterObject | OpenAPIV2.ReferenceObject,
  ): ParameterObject {
    if (Base.isRef(schema)) {
      schema = this.doc.definitions?.parameters[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV2.ParameterObject;
    }

    const { name, required, description } = schema;

    return {
      name,
      required,
      description,
      in: schema.in as ParameterIn,
      schema: undefined, // schema.schema && this.getSchemaByRef(schema.schema),
    };
  }

  /**
   * OpenAPI schema to base response
   */
  private getResponseByRef(
    schema: OpenAPIV2.ResponseObject | OpenAPIV2.ReferenceObject,
  ): MediaTypeObject[] {
    if (Base.isRef(schema)) {
      schema = this.doc.definitions?.responses[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV2.ResponseObject;
    }

    const { schema: schema_ } = schema;

    return [
      {
        type: MediaTypes.JSON,
        schema: schema_ && this.getSchemaByRef(schema_),
      },
    ];
  }

  /**
   * OpenAPI schema to requestBody.
   */
  private getRequestBodyByRef(
    schema: OpenAPIV3.RequestBodyObject | OpenAPIV2.ReferenceObject,
  ): MediaTypeObject[] {
    if (Base.isRef(schema)) {
      schema = this.doc.definitions?.requestBodies[
        Base.ref2name(schema.$ref)
      ] as OpenAPIV3.RequestBodyObject;
    }

    const { content = {} } = schema;

    return Object.keys(content).map((c) => ({
      type: c as MediaTypes,
      schema:
        content[c].schema &&
        this.getSchemaByRef(content[c].schema as OpenAPIV2.SchemaObject),
    }));
  }

  /**
   * Transform all OpenAPI schema to Base Schema
   */
  private toBaseSchema(
    schema: OpenAPIV2.SchemaObject | OpenAPIV2.ReferenceObject,
  ): SchemaObject {
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema);
    }

    if (schema.type === "array") {
      const { type, description, items, required } = schema;

      return {
        type,
        required: !!required,
        description,
        items: items && this.toBaseSchema(items),
      };
    } else {
      const {
        type,
        required = [],
        allOf = [],
        anyOf = [],
        description,
        enum: enum_,
        format,
        oneOf = [],
        properties = {},
      } = schema;

      return {
        type: type as unknown as NonArraySchemaType,
        required,
        description,
        enum: enum_,
        format: format as unknown as SchemaFormatType,
        allOf: allOf.map((s) =>
          Base.isRef(s)
            ? { type: Base.ref2name(s.$ref) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject),
        ),
        anyOf: anyOf.map((s) =>
          Base.isRef(s)
            ? { type: Base.ref2name(s.$ref) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject),
        ),
        oneOf: oneOf.map((s) =>
          Base.isRef(s)
            ? { type: Base.ref2name(s.$ref) }
            : this.toBaseSchema(s as OpenAPIV2.SchemaObject),
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema)
              ? { type: Base.ref2name(propSchema.$ref) }
              : this.toBaseSchema(propSchema),
          };
        }, {}),
      };
    }
  }

  public init() {
    const { definitions = {}, paths = {} } = this.doc;
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {},
    } = definitions;

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
        // TODO: Need to handle
      } else {
        const { parameters = [], description, summary } = pathObject;
        Object.values(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method as OpenAPIV2.HttpMethods];

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
              this.getParameterByRef.bind(this),
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
                      (name) => baseParameters.find((p) => p.name === name)!,
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
