import type { Statement } from "typescript";
import type { MediaTypeObject, ParameterObject } from "~/interface";

/**
 *
 * Base adapter for tool
 *
 */
export abstract class Adapter {
  abstract readonly name: string;
  abstract readonly methodFieldName: string;
  abstract readonly bodyFieldName: string;
  abstract readonly headersFieldName: string;
  abstract readonly queryFieldName: string;
  abstract client(
    uri: string,
    method: string,
    parameters: ParameterObject[],
    requestBody: MediaTypeObject | undefined,
    response: MediaTypeObject | undefined,
    adapter: Adapter,
    shouldUseFormData: boolean,
    shouldUseJSONResponse: boolean,
  ): Statement[];
}
