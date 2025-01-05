import { OpenAPI, OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

import OpenApiV2 from "@/adapters/openapi/OpenAPIV2";
import OpenApiV3 from "@/adapters/openapi/OpenAPIV3";
import OpenApiV3_1 from "@/adapters/openapi/OpenAPIV3_1";
import AxiosClient from "@/client/AxiosClient";
import FetchClient from "@/client/FetchClient";
import { ClientTypes } from "@/types/client";
import { OpenApiVersion } from "@/types/openapi";
import getApiDoc, { getOpenApiDocVersion } from "@/utils/getApiDoc";

export interface ClientGenOptions {
  doc: string;
  ouput: string;
  baseURL?: string;
  client?: ClientTypes;
}

export const codeGenByConfig = async (doc: OpenAPI.Document, output: string) => {
  const version = getOpenApiDocVersion(doc);
  const client = new FetchClient();
  switch (version) {
    case OpenApiVersion.v2:
      await new OpenApiV2().parse();
      break;
    case OpenApiVersion.v3:
      await new OpenApiV3(doc as OpenAPIV3.Document, client, output).parse();
      break;
    case OpenApiVersion.v3_1:
      await new OpenApiV3_1(doc as OpenAPIV3_1.Document, client, output).parse();
      break;
    default:
      break;
  }
};

export default async function codeGen(options: ClientGenOptions) {
  if (!options.doc) {
    console.error(`Missing openapi doc url`);
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
      await new OpenApiV2().parse();
      break;
    case OpenApiVersion.v3:
      await new OpenApiV3(doc as OpenAPIV3.Document, client, options.ouput).parse();
      break;
    case OpenApiVersion.v3_1:
      await new OpenApiV3_1(doc as OpenAPIV3_1.Document, client, options.ouput).parse();
      break;
    default:
      break;
  }
}
