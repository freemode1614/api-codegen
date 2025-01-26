import type { InitOptions } from "@moccona/codegen";
import {
  Base,
  JSONValue,
  ParameterObject,
  Provider,
  RequestBodiesObject,
  ResponsesObject,
  SchemaObject,
} from "@moccona/codegen";
import { createScopedLogger } from "@moccona/logger";
import { OpenAPI } from "openapi-types";

const logger = createScopedLogger("OpenAPI");

export class OpenAPI extends Provider {
  name = "openapi";
  schema: JSONValue = {};

  override async init(options: InitOptions): {
    schemas: Record<string, SchemaObject>;
    parameters: Record<string, ParameterObject>;
    responses: Record<string, ResponsesObject>;
    requestBodies: Record<string, RequestBodiesObject>;
  } {
    if (!options.docURL) {
      logger.error(`No docURL find`);
      process.exit(1);
    }

    const doc = await Base.fetchDoc(options.docURL);
  }
}
