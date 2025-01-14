import { factory as ts, Statement } from "typescript";

import Client, { ClientParameterObject } from "@/providers/Client";

export default class FetchClient extends Client implements Client {
  private readonly clientName = "fetch";
  private readonly methodName = "method";
  private readonly bodyName = "body";
  private readonly headerName = "header";

  public httpClient(
    path: string,
    method: string,
    parameters: ClientParameterObject[],
    useFormData = false,
  ): Statement[] {
    const statements: Statement[] = [];

    const returnValue = ts.createReturnStatement(
      ts.createCallExpression(
        ts.createPropertyAccessExpression(
          ts.createCallExpression(ts.createIdentifier(this.clientName), undefined, [
            this.urlTemplate(path, parameters),
            ts.createObjectLiteralExpression(
              [
                ts.createPropertyAssignment(ts.createIdentifier(this.methodName), ts.createStringLiteral(method)),
                ts.createPropertyAssignment(ts.createIdentifier(this.bodyName), ts.createIdentifier("fd")),
                ts.createPropertyAssignment(ts.createIdentifier(this.headerName), ts.createIdentifier("header")),
              ],
              true,
            ),
          ]),
          ts.createIdentifier("then"),
        ),
        undefined,
        [
          // TODO: If response is application/json, using response.json() to decode response to json format.
        ],
      ),
    );

    statements.push(returnValue);

    return statements;
  }
}
