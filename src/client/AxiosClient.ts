import { Statement, TemplateExpression } from "typescript";

import Client, { ClientParameterObject, ClientReferenceObject, ClientSchemaObject } from "@/providers/Client";

export default class AxiosClient extends Client implements Client {
  httpClient(path: string, method: string, parameters: (ClientParameterObject | ClientReferenceObject)[]): Statement[] {
    throw new Error("Method not implemented.");
  }
  public formDataStatement(
    parameters: (ClientParameterObject | ClientReferenceObject)[],
    requestBodySchema: ClientSchemaObject,
  ): Statement[] {
    throw new Error("Method not implemented.");
  }
  public urlTemplate(path: string, parameters: ClientParameterObject[]): TemplateExpression {
    throw new Error("Method not implemented.");
  }
}
