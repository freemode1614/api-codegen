import { Adapter } from "~/base/Adaptor";

export class FetchAdapter implements Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "body";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "";
  readonly name = "fetch";
}
