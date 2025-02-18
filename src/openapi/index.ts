import type { ProviderInitOptions, ProviderInitResult } from "@apicodegen/core";
import { Base, FetchAdapter, Generator, Provider } from "@apicodegen/core";
import { createScopedLogger } from "@moccona/logger";
import { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

import { V2 } from "./V2";
import { V3 } from "./V3";
import { V3_1 } from "./V3_1";

const logger = createScopedLogger("OpenAPI");

export enum OpenAPIVersion {
  v2 = "v2",
  v3 = "v3",
  v3_1 = "v3_1",
  unknown = "unknown",
}

function getDocVersion(doc: OpenAPI.Document) {
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
      return OpenAPIVersion.unknown;
  }
}

export class OpenAPIProvider extends Provider {
  public parse(doc: OpenAPIV3.Document): ProviderInitResult {
    const version = getDocVersion(doc);

    logger.debug(`openapi version ${version}`);

    let returnValue: ProviderInitResult;

    switch (version) {
      case OpenAPIVersion.v2:
        returnValue = new V2(doc as unknown as OpenAPIV2.Document).init();
        break;
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

    return returnValue!;
  }
}

export async function codeGen(initOptions: ProviderInitOptions) {
  const { verbose } = initOptions;

  if (verbose) {
    logger.setLevel("debug");
  } else {
    logger.setLevel("info");
  }

  logger.info(`Fech document from ${initOptions.docURL}`);

  const doc = await Base.fetchDoc(
    initOptions.docURL,
    initOptions.requestOptions,
  );

  const provider = new OpenAPIProvider(initOptions, doc);
  const { enums, schemas, parameters, responses, requestBodies, apis } =
    provider;

  const adaptor = new FetchAdapter();
  const code = Generator.genCode(
    {
      enums,
      schemas,
      parameters,
      responses,
      requestBodies,
      apis,
    },
    initOptions,
    adaptor,
  );

  if (process.env.NODE_ENV === "test") {
    await Generator.write(code, initOptions.output);
  }

  return code;
}

export { type ProviderInitOptions } from "@apicodegen/core";
