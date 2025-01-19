import { OpenAPI, OpenAPIV3 } from "openapi-types";

import { V3 } from "@/adapters/openapi/V3";
import AxiosClient from "@/client/AxiosClient";
import FetchClient from "@/client/FetchClient";
import { ClientTypes } from "@/types/client";
import { OpenApiVersion } from "@/types/openapi";
import { fatal } from "@/utils/fatal";
import getApiDoc, { getOpenApiDocVersion } from "@/utils/getApiDoc";

export interface OpenapiOptions {
  doc: string;
  ouput: string;
  baseURL?: string;
  client?: ClientTypes | keyof typeof ClientTypes;
}

// for testing
export const codeGenByConfigForTesting = (doc: OpenAPI.Document) => {
  const version = getOpenApiDocVersion(doc);
  const client = new FetchClient();
  switch (version) {
    case OpenApiVersion.v2:
      break;
    case OpenApiVersion.v3:
      new V3(doc as OpenAPIV3.Document, client);
      break;
    case OpenApiVersion.v3_1:
      break;
    default:
      break;
  }
};

export default async function openapi(options: OpenapiOptions) {
  if (!options.doc) {
    fatal("Missing openapi doc url", "openapi doc url is missing");
  }

  const apidoc = await getApiDoc(options.doc);
  const version = getOpenApiDocVersion(apidoc);

  const client = (() => {
    switch (options.client) {
      case ClientTypes.Axios:
        return new AxiosClient();
      default:
        return new FetchClient();
    }
  })();

  const code = "";

  switch (version) {
    case OpenApiVersion.v2:
      break;
    case OpenApiVersion.v3:
      new V3(apidoc as OpenAPIV3.Document, client);
      break;
    case OpenApiVersion.v3_1:
      break;
    default:
      break;
  }

  return code;
}
