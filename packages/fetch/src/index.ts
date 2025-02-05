import { Adapter } from "@moccona/api-codegen";

export class FetchAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "body";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "";
  readonly name = "fetch";
}
