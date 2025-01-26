import type { InitOptions, ResponseObject } from "@moccona/codegen";
import {
  Base,
  JSONValue,
  ParameterObject,
  Provider,
  RequestBodiesObject,
  ResponsesObject,
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

type Return = {
  schemas: Record<string, SchemaObject>;
  parameters: Record<string, ParameterObject>;
  responses: Record<string, ResponsesObject>;
  requestBodies: Record<string, RequestBodiesObject>;
};

export class OpenAPIProvider extends Provider {
  name = "openapi";
  schema: JSONValue = {};

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

  private v2(doc: OpenAPIV2.Document) {
    //
  }

  private v3(doc: OpenAPIV3.Document): Return {
    const { components = {}, paths = {} } = doc;
    const {
      requestBodies = {},
      responses = {},
      parameters = {},
      schemas = {},
    } = components;

    this.parameters = Object.keys(parameters).reduce((acc, key) => {
      let param = parameters[key];

      if (this.isRef(param)) {
        param = this.getSchemaByType(
          SchemaType.parameters,
          Base.ref2name(param.$ref),
        ) as OpenAPIV3.ParameterObject;
      }

      return {
        ...acc,
        [key]: {
          name: param.name,
          in: param.in,
          schema: param.schema,
          required: param.required,
          description: param.description,
          // It's OK to be undefined
          ref: (param as unknown as OpenAPIV3.ReferenceObject).$ref,
        } as ParameterObject,
      };
    }, {});

    this.responses = Object.keys(responses).reduce((acc, key) => {
      let response = responses[key];

      if (this.isRef(response)) {
        response = this.getSchemaByType(
          SchemaType.responses,
          Base.ref2name(response.$ref),
        ) as OpenAPIV3.ResponseObject;
      }

      return {
        ...acc,
        [key]: response.content ?? {},
      };
    }, {});

    this.requestBodies = Object.keys(requestBodies).reduce((acc, key) => {
      let requestBody = requestBodies[key];

      if (this.isRef(requestBody)) {
        requestBody = this.getSchemaByType(
          SchemaType.requestBodies,
          Base.ref2name(requestBody.$ref),
        ) as unknown as OpenAPIV3.RequestBodyObject;
      }

      return {
        ...acc,
        [key]: requestBody.content ?? {},
      };
    }, {});
  }

  private v3_1(doc: OpenAPIV3_1.Document): Return {
    const { components = {} } = doc;
    const { requestBodies, responses, parameters, schemas } = components;
  }

  override async init(options: InitOptions): Promise<Return> {
    if (!options.docURL) {
      logger.error(`No docURL find`);
      process.exit(1);
    }

    const doc = (await Base.fetchDoc(options.docURL)) as OpenAPI.Document;
  }
}
