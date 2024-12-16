import { OpenAPIV3 } from "openapi-types";

import OpenApiV2 from "@/adapters/openapi/OpenApiV2";
import OpenApiV3 from "@/adapters/openapi/OpenApiV3";
import OpenApiV3_1 from "@/adapters/openapi/OpenApiV3_1";
import AxiosClient from "@/client/AxiosClient";
import FetchClient from "@/client/FetchClient";
import logger from "@/logger";
import { ClientTypes } from "@/types/client";
import { OpenApiVersion } from "@/types/openapi";
import getApiDoc, { getOpenApiDocVersion } from "@/utils/getApiDoc";

export interface ClientGenOptions {
  doc: string;
  baseURL?: string;
  client?: ClientTypes;
}

export default async function codeGen(options: ClientGenOptions) {
  if (!options.doc) {
    logger.error(`Missing openapi doc url`);
    process.exit(1);
  }

  const doc = await getApiDoc(options.doc);
  const version = getOpenApiDocVersion(doc);

  const client = (() => {
    switch (options.client) {
      case ClientTypes.Axios:
        return new AxiosClient();
      default:
        return new FetchClient();
    }
  })();

  switch (version) {
    case OpenApiVersion.v2:
      new OpenApiV2().parse();
      break;
    case OpenApiVersion.v3:
      new OpenApiV3(doc as OpenAPIV3.Document).parse();
      break;
    case OpenApiVersion.v3_1:
      new OpenApiV3_1().parse();
      break;
    default:
      break;
  }
}
