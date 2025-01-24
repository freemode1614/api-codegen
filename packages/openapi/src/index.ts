import {
  JSONValue,
  ParameterObject,
  Provider,
  RequestBodiesObject,
  ResponsesObject,
  SchemaObject,
} from "@moccona/codegen";

export class OpenAPI extends Provider {
  name = "openapi";
  schema: JSONValue = {};

  schemas: Record<string, SchemaObject> = {};
  parameters: Record<string, ParameterObject> = {};
  responses: Record<string, ResponsesObject> = {};
  requestBodies: Record<string, RequestBodiesObject> = {};

  init(): void {
    throw new Error("Method not implemented.");
  }
}
