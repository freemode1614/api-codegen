import { Statement } from "typescript";
import { Adapter } from "~/base/Adaptor";
import { ParameterObject, MediaTypeObject } from "~/interface";

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
