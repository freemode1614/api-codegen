import type {
  NonArraySchemaType,
  OperationObject,
  ParameterIn,
  ProviderInitOptions,
  ProviderInitResult,
  RequestBodyObject,
  ResponseObject,
  SchemaFormatType,
} from "@moccona/codegen";
import {
  Base,
  HttpMethods,
  JSONValue,
  ParameterObject,
  Provider,
  SchemaObject,
  SchemaType,
} from "@moccona/codegen";
import { createScopedLogger } from "@moccona/logger";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";

const logger = createScopedLogger("OpenAPI");

enum OpenAPIVersion {
  v2 = "v2",
  v3 = "v3",
  v3_1 = "v3_1",
}

export class OpenAPIProvider extends Provider {
  name = "openapi";
  schema: JSONValue = {};
  doc!: OpenAPIV3.Document;

  public getDocVersion = (doc: OpenAPI.Document) => {
    const version = (
      (doc as OpenAPIV3.Document).openapi || (doc as OpenAPIV2.Document).swagger
    ).slice(0, 3);

    switch (version) {
      case "2.0":
        return OpenAPIVersion.v2;
      case "3.0":
        return OpenAPIVersion.v3;
      case "3.1":
        return OpenAPIVersion.v3_1;
      default:
        logger.error(`Unknown openai version ${version}`);
    }
  };

  private isOpenAPIArraySchema(
    schema: OpenAPIV3.SchemaObject,
  ): schema is OpenAPIV3.ArraySchemaObject {
    return schema.type === "array";
  }

  private getSchemaByRef(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  ): SchemaObject {
    //
  }

  private getParameterByRef(
    schema: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
  ): ParameterObject {
    //
  }

  private getResponseByRef(
    schema: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject,
  ): ResponseObject {
    //
  }

  private getRequestBodyByRef(
    schema: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject,
  ): RequestBodyObject {
    //
  }

  /**
   * Transform all OpenAPI schema to Base Schema
   */
  private toBaseSchema(
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  ): SchemaObject {
    if (this.isRef(schema)) {
      return this.toBaseSchema(
        this.getSchemaByType(
          SchemaType.schemas,
          Base.ref2name(schema.$ref),
        ) as OpenAPIV3.SchemaObject,
      );
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
        type,
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

      return {
        type: type as unknown as NonArraySchemaType,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format as unknown as SchemaFormatType,
        allOf: allOf?.map((s) => this.toBaseSchema(s)),
        anyOf: anyOf?.map((s) => this.toBaseSchema(s)),
        oneOf: oneOf?.map((s) => this.toBaseSchema(s)),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          const schema = this.toBaseSchema(propSchema);
          return {
            ...acc,
            [p]: {
              ...schema,
              required: required.includes(p),
            },
          };
        }, {}),
      };
    }
  }

  private toBaseParameter(
    schema: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
  ): ParameterObject {
    if (this.isRef(schema)) {
      schema = this.getSchemaByType(
        SchemaType.parameters,
        Base.ref2name(schema.$ref),
      ) as OpenAPIV3.ParameterObject;
    }

    const { name, in: in_, schema: schema_, required, description } = schema;

    return {
      name,
      required,
      description,
      in: in_ as ParameterIn,
      schema: schema_ && this.toBaseSchema(schema_),
    };
  }

  private toBaseResponse(
    schema: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject,
  ) {
    if (this.isRef(schema)) {
      schema = this.getSchemaByType(
        SchemaType.responses,
        Base.ref2name(schema.$ref),
      ) as OpenAPIV3.ResponseObject;
    }
  }

  private toBaseRequestBody(
    schema: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject,
  ) {
    if (this.isRef(schema)) {
      schema = this.getSchemaByType(
        SchemaType.requestBodies,
        Base.ref2name(schema.$ref),
      ) as OpenAPIV3.RequestBodyObject;
    }
  }

  private v2(doc: OpenAPIV2.Document) {
    //
  }

  public v3(doc: OpenAPIV3.Document): ProviderInitResult {
    const { components = {}, paths = {} } = doc;
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {},
    } = components;

    const schemas_ = Object.keys(schemas).reduce((acc, key) => {
      let schema = schemas[key];
      if (this.isRef(schema)) {
        schema = this.getSchemaByType(
          SchemaType.schemas,
          Base.ref2name(schema.$ref),
        ) as OpenAPIV3.SchemaObject;
      }

      return {
        ...acc,
        [key]: {
          ...schema,
          // It's OK to be undefined
          ref: (schema as unknown as OpenAPIV3.ReferenceObject).$ref,
        } as SchemaObject,
      };
    }, {});

    const parameters_ = Object.keys(parameters).reduce((acc, key) => {
      let parameter = parameters[key];

      if (this.isRef(parameter)) {
        parameter = this.getSchemaByType(
          SchemaType.parameters,
          Base.ref2name(parameter.$ref),
        ) as OpenAPIV3.ParameterObject;
      }

      return {
        ...acc,
        [key]: {
          name: parameter.name,
          in: parameter.in,
          schema: parameter.schema,
          required: parameter.required,
          description: parameter.description,
          // It's OK to be undefined
          ref: (parameter as unknown as OpenAPIV3.ReferenceObject).$ref,
        } as ParameterObject,
      };
    }, {});

    const responses_ = Object.keys(responses).reduce((acc, key) => {
      let response = responses[key];

      if (this.isRef(response)) {
        response = this.getSchemaByType(
          SchemaType.responses,
          Base.ref2name(response.$ref),
        ) as OpenAPIV3.ResponseObject;
      }

      return {
        ...acc,
        [key]: response.content,
      };
    }, {});

    const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
      let requestBody = requestBodies[key];

      if (this.isRef(requestBody)) {
        requestBody = this.getSchemaByType(
          SchemaType.requestBodies,
          Base.ref2name(requestBody.$ref),
        ) as unknown as OpenAPIV3.RequestBodyObject;
      }

      return {
        ...acc,
        [key]: requestBody.content,
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
        Object.keys(HttpMethods).forEach((method) => {
          const methodObject = pathObject[method as OpenAPIV3.HttpMethods];

          if (methodObject) {
            const {
              responses,
              requestBody,
              description: description_,
              summary: summary_,
              operationId,
              deprecated,
            } = methodObject;
            let { parameters: parameters_ = [] } = methodObject;

            parameters_ = [...parameters, ...parameters_].map((p) =>
              this.isRef(p)
                ? (this.getSchemaByType(
                    SchemaType.parameters,
                    Base.ref2name(p.$ref),
                  ) as OpenAPIV3.ParameterObject)
                : p,
            );

            const uniquePropName = [
              ...new Set(
                (parameters_ as OpenAPIV3.ParameterObject[]).map((p) => p.name),
              ),
            ];

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (responses) {
              const httpCodes = Object.keys(responses);
              for (const code of httpCodes) {
                if (code in responses) {
                  const response = responses[code];
                  const responseSchema = (this.isRef(response)
                    ? this.getSchemaByType(
                        SchemaType.responses,
                        Base.ref2name(response.$ref),
                      )
                    : response) as unknown as OpenAPIV3.ResponseObject;
                  methodApis.push({
                    summary: summary_ ?? summary,
                    description: description_ ?? description,
                    deprecated: deprecated,
                    operationId,
                    parameters: uniquePropName.map((name) => {
                      const targetParameter = (
                        parameters_ as OpenAPIV3.ParameterObject[]
                      ).find((p) => p.name === name)!;

                      return {
                        name: targetParameter.name,
                        in: targetParameter.in as ParameterIn,
                        schema:
                          targetParameter.schema &&
                          this.toBaseSchema(targetParameter.schema),
                        required: targetParameter.required,
                        description: targetParameter.description,
                      };
                    }),
                    responses: Object.keys(responseSchema.content!).reduce(
                      (acc, mediaType) => {
                        const mediaTypeObject =
                          responseSchema.content![mediaType];
                        const { schema } = mediaTypeObject;
                        return {
                          ...acc,
                          [mediaType]: {
                            type: Base.getMediaType(mediaType),
                            schema: schema && this.toBaseSchema(schema),
                          } as ResponseObject,
                        };
                      },
                      {},
                    ),
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
      apis: {},
    };
  }

  // private v3_1(doc: OpenAPIV3_1.Document): Return {
  //   const { components = {} } = doc;
  //   const { requestBodies, responses, parameters, schemas } = components;
  // }

  override async init(
    options: ProviderInitOptions,
  ): Promise<ProviderInitResult> {
    if (!options.docURL) {
      logger.error(`No docURL find`);
      process.exit(1);
    }

    this.doc = await Base.fetchDoc<OpenAPIV3.Document>(options.docURL);

    const version = this.getDocVersion(
      this.doc as unknown as OpenAPIV3.Document,
    );

    let returnValue: ProviderInitResult;

    switch (version) {
      case OpenAPIVersion.v3:
        returnValue = this.v3(this.doc as unknown as OpenAPIV3.Document);
        break;

      default:
        logger.error(`Not a valid OpenAPI version ${version}`);
        process.exit(1);
    }

    const { schemas, responses, parameters, requestBodies } = returnValue!;

    this.schemas = schemas;
    this.responses = responses;
    this.parameters = parameters;
    this.requestBodies = requestBodies;

    return returnValue!;
  }
}
