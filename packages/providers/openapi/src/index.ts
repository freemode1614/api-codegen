import { Adapter } from "@moccona/codegen-core";

export class OpenAPI implements Adapter {
  name = "openapi";
  methodField = "method";
  bodyField = "body";
  headersField = "header";
  queryField = "";
}
