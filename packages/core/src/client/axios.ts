import { Adapter } from "~/base/Adaptor";

export class AxiosAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "data";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "params";
  readonly name = "axios";
}
