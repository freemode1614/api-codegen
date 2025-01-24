import { Adapter } from "@moccona/codegen-core";

export class OpenAPI extends Adapter {
  name = "openapi";
  methodField = "method";
  bodyField = "body";
  headersField = "header";
  queryField = "";

  init() {
    //
  }
}
