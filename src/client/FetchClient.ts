/* eslint-disable unicorn/prefer-spread */
import { factory as ts, Statement, SyntaxKind } from "typescript";

import Client, { ClientParameterObject, ClientSchemaObject } from "@/providers/Client";
import normalizeName from "@/utils/normalizeName";
import { camelCase } from "@/utils/pathToName";

export default class FetchClient extends Client implements Client {
  private readonly clientName = "fetch";
  private readonly methodName = "method";
  private readonly bodyName = "body";
  private readonly headerName = "headers";

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
    const inBody = parameters.filter((p) => !p.in || p.in === "body");
    const inHeader = parameters.filter((p) => p.in === "header");

    const toLiterlExpression = () => {
      return ts.createObjectLiteralExpression(
        [
          ts.createPropertyAssignment(
            ts.createIdentifier(this.methodName),
            ts.createStringLiteral(method.toUpperCase()),
          ),
        ]
          .concat(
            inHeader.length > 0
              ? ts.createPropertyAssignment(
                  ts.createIdentifier(this.headerName),
                  ts.createObjectLiteralExpression(
                    inHeader.map((p) =>
                      ts.createPropertyAssignment(
                        ts.createStringLiteral(p.name),
                        ts.createCallExpression(ts.createIdentifier("encodeURIComponent"), undefined, [
                          // TODO: No need to wrap with JSON.stringify if field value is already a string
                          ts.createCallExpression(
                            ts.createPropertyAccessExpression(
                              ts.createIdentifier("JSON"),
                              ts.createIdentifier("stringify"),
                            ),
                            undefined,
                            [ts.createIdentifier(camelCase(normalizeName(p.name)))],
                          ),
                        ]),
                      ),
                    ),
                  ),
                )
              : [],
          )
          .concat(
            useFormData || inBody.length > 0 || requestBody
              ? ts.createPropertyAssignment(
                  ts.createIdentifier(this.bodyName),
                  useFormData
                    ? ts.createIdentifier("fd")
                    : inBody.length > 0 || (requestBody && !this.isBinary(requestBody))
                      ? ts.createCallExpression(
                          ts.createPropertyAccessExpression(
                            ts.createIdentifier("JSON"),
                            ts.createIdentifier("stringify"),
                          ),
                          [],
                          [
                            requestBody
                              ? ts.createIdentifier("req")
                              : ts.createObjectLiteralExpression(
                                  inBody.map((b) => ts.createShorthandPropertyAssignment(ts.createIdentifier(b.name))),
                                  true,
                                ),
                          ],
                        )
                      : // One File parameter
                        ts.createIdentifier("req"),
                )
              : [],
          ),
        true,
      );
    };

    const returnValue = ts.createReturnStatement(
      useJSONResponse
        ? ts.createCallExpression(
            ts.createPropertyAccessExpression(
              ts.createCallExpression(ts.createIdentifier(this.clientName), undefined, [
                this.urlTemplate(path, parameters),
                toLiterlExpression(),
              ]),
              ts.createIdentifier("then"),
            ),
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
          )
        : ts.createCallExpression(ts.createIdentifier(this.clientName), undefined, [
            this.urlTemplate(path, parameters),
            toLiterlExpression(),
          ]),
    );

    statements.push(returnValue);

    return statements;
  }
}
