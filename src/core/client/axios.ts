import { Adapter } from "@apicodegen/core/base/Adaptor";
import { Statement } from "typescript";

export class AxiosAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "data";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "params";
  readonly name = "axios";

  client(): Statement[] {
    throw new Error("Method not implemented.");
  }
}
