import { Statement } from "typescript";
import { Adapter } from "~/base/Adaptor";
import { ParameterObject, MediaTypeObject } from "~/interface";

export class AxiosAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "data";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "params";
  readonly name = "axios";

  client(
    uri: string,
    method: string,
    parameters: ParameterObject[],
    requestBody: MediaTypeObject | undefined,
    response: MediaTypeObject | undefined,
    adapter: Adapter,
    shouldUseFormData: boolean,
    shouldUseJSONResponse: boolean,
  ): Statement[] {
    throw new Error("Method not implemented.");
  }
}
