import type { ProviderInitOptions, ProviderInitResult } from "@moccona/codegen";
import { Base, JSONValue, Provider } from "@moccona/codegen";
import { createScopedLogger } from "@moccona/logger";
import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

import { V3 } from "./V3";
import { V3_1 } from "./V3_1";

const logger = createScopedLogger("OpenAPI");

enum OpenAPIVersion {
  v2 = "v2",
  v3 = "v3",
  v3_1 = "v3_1",
}

export class OpenAPIProvider extends Provider {
  readonly name = "openapi";

  readonly docURL!: string;

  constructor(initOptions: ProviderInitOptions) {
    super();
    this.docURL = initOptions.docURL;
  }

  /**
   * Get document version
   */
  private getDocVersion = (doc: OpenAPI.Document) => {
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

  override async init(): Promise<ProviderInitResult> {
    const doc = await Base.fetchDoc<OpenAPIV3.Document>(this.docURL);

    const version = this.getDocVersion(doc);

    let returnValue: ProviderInitResult;

    switch (version) {
      case OpenAPIVersion.v3:
        returnValue = new V3(doc as unknown as OpenAPIV3.Document).init();
        break;
      case OpenAPIVersion.v3_1:
        returnValue = new V3_1(doc as unknown as OpenAPIV3_1.Document).init();
        break;

      default:
        logger.error(`Not a valid OpenAPI version ${version}`);
        process.exit(1);
    }

    const { schemas, responses, parameters, requestBodies, apis } =
      returnValue!;

    this.schemas = schemas;
    this.responses = responses;
    this.parameters = parameters;
    this.requestBodies = requestBodies;
    this.apis = apis;

    return returnValue!;
  }
}
