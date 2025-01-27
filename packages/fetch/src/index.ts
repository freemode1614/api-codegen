import { Adapter } from "@moccona/codegen";

export class FetchAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "body";
  readonly headersFieldName = "header";
  readonly queryFieldName = "";
  readonly name = "fetch";
}
