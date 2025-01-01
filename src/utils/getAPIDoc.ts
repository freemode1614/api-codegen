import { OpenApiVersion } from "@/types/openapi";
import { OpenAPI, OpenAPIV2, OpenAPIV3 } from "openapi-types";
import { Agent, setGlobalDispatcher } from "undici";

const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);

export function getOpenApiDocVersion(doc: OpenAPI.Document): OpenApiVersion {
  const version = ((doc as OpenAPIV3.Document).openapi || (doc as OpenAPIV2.Document).swagger).slice(0, 3);

  switch (version) {
    case "2.0":
      return OpenApiVersion.v2;
    case "3.0":
      return OpenApiVersion.v3;
    case "3.1":
      return OpenApiVersion.v3_1;
    default:
      console.error(`Unknown openai version ${version}`);
      process.exit(1);
  }
}

export default async function getApiDoc(docURL: string): Promise<OpenAPI.Document> {
  console.info(`Get API Document from ${docURL}`);
  return fetch(docURL, { method: "GET" }).then(async (resp) => {
    return (await resp.json()) as OpenAPI.Document;
  });
}
