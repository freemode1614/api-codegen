import { factory as ts, Statement, SyntaxKind } from "typescript";

import Client, { ClientParameterObject, ClientSchemaObject } from "@/providers/Client";

export default class FetchClient extends Client implements Client {
  private readonly clientName = "fetch";
  private readonly methodName = "method";
  private readonly bodyName = "body";
  private readonly headerName = "header";

  public httpClient(
    path: string,
    method: string,
    parameters: ClientParameterObject[],
    requestBody?: ClientSchemaObject,
    response?: ClientSchemaObject,
    useFormData = false,
    useJSONResponse = false,
  ): Statement[] {
    const statements: Statement[] = [];
    const inBody = parameters.filter((p) => p.in === "body");

    const returnValue = ts.createReturnStatement(
      ts.createCallExpression(
        useJSONResponse
          ? ts.createPropertyAccessExpression(
              ts.createCallExpression(ts.createIdentifier(this.clientName), undefined, [
                this.urlTemplate(path, parameters),
                ts.createObjectLiteralExpression(
                  [
                    ts.createPropertyAssignment(ts.createIdentifier(this.methodName), ts.createStringLiteral(method)),
                    // ts.createPropertyAssignment(ts.createIdentifier(this.headerName), ts.createIdentifier("header")),
                  ].concat(
                    useFormData || inBody.length > 0 || requestBody
                      ? ts.createPropertyAssignment(
                          ts.createIdentifier(this.bodyName),
                          useFormData
                            ? ts.createIdentifier("fd")
                            : ts.createCallExpression(
                                ts.createPropertyAccessExpression(
                                  ts.createIdentifier("JSON"),
                                  ts.createIdentifier("stringify"),
                                ),
                                [],
                                inBody.length > 0
                                  ? [
                                      ts.createObjectLiteralExpression(
                                        inBody.map((b) =>
                                          ts.createShorthandPropertyAssignment(ts.createIdentifier(b.name)),
                                        ),
                                        true,
                                      ),
                                    ]
                                  : [ts.createIdentifier("req")],
                              ),
                        )
                      : [],
                  ),
                  true,
                ),
              ]),
              ts.createIdentifier("then"),
            )
          : ts.createCallExpression(ts.createIdentifier(this.clientName), undefined, [
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
        undefined,
        [
          // TODO: If response is application/json, using response.json() to decode response to json format.
          ts.createArrowFunction(
            [ts.createModifier(SyntaxKind.AsyncKeyword)],
            [],
            [ts.createParameterDeclaration(undefined, undefined, ts.createIdentifier("response"))],
            undefined,
            ts.createToken(SyntaxKind.EqualsGreaterThanToken),
            ts.createAsExpression(
              ts.createParenthesizedExpression(
                ts.createAwaitExpression(
                  ts.createCallExpression(
                    ts.createPropertyAccessExpression(ts.createIdentifier("response"), ts.createIdentifier("json")),
                    undefined,
                    [],
                  ),
                ),
              ),
              response ? this.schemaToTypeNode(response) : ts.createToken(SyntaxKind.UnknownKeyword),
            ),
          ),
        ],
      ),
    );

    statements.push(returnValue);

    return statements;
  }
}
