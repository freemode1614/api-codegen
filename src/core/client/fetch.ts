/* eslint-disable unicorn/prefer-spread */
import { Adapter } from "@apicodegen/core/base/Adaptor";
import { Base } from "@apicodegen/core/base/Base";
import { Generator } from "@apicodegen/core/generator";
import { MediaTypeObject, ParameterObject } from "@apicodegen/core/interface";
import type { Statement } from "typescript";
import { factory as t, SyntaxKind } from "typescript";

export class FetchAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "body";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "";
  readonly name = "fetch";

  public client(
    uri: string,
    method: string,
    parameters: ParameterObject[],
    requestBody: MediaTypeObject | undefined,
    response: MediaTypeObject | undefined,
    adapter: Adapter,
    shouldUseFormData: boolean,
    shouldUseJSONResponse: boolean,
  ): Statement[] {
    const statements: Statement[] = [];
    const inBody = parameters.filter((p) => !p.in || p.in === "body");
    const inHeader = parameters.filter((p) => p.in === "header");

    const toLiterlExpression = () => {
      return t.createObjectLiteralExpression(
        [
          t.createPropertyAssignment(
            t.createIdentifier(adapter.methodFieldName),
            t.createStringLiteral(method.toUpperCase()),
          ),
        ]
          .concat(
            inHeader.length > 0
              ? t.createPropertyAssignment(
                  t.createIdentifier(adapter.headersFieldName),
                  t.createObjectLiteralExpression(
                    inHeader.map((p) =>
                      t.createPropertyAssignment(
                        t.createStringLiteral(p.name),
                        t.createCallExpression(
                          t.createIdentifier("encodeURIComponent"),
                          undefined,
                          [
                            t.createCallExpression(
                              t.createIdentifier("String"),
                              undefined,
                              [
                                t.createIdentifier(
                                  Base.camelCase(Base.normalize(p.name)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
              : [],
          )
          .concat(
            shouldUseFormData || inBody.length > 0 || requestBody?.schema
              ? t.createPropertyAssignment(
                  t.createIdentifier(adapter.bodyFieldName),
                  shouldUseFormData
                    ? t.createIdentifier("fd")
                    : inBody.length > 0 ||
                        (requestBody?.schema &&
                          !Generator.isBinarySchema(requestBody.schema))
                      ? t.createCallExpression(
                          t.createPropertyAccessExpression(
                            t.createIdentifier("JSON"),
                            t.createIdentifier("stringify"),
                          ),
                          [],
                          [
                            requestBody
                              ? t.createIdentifier("req")
                              : t.createObjectLiteralExpression(
                                  inBody.map((b) =>
                                    t.createShorthandPropertyAssignment(
                                      t.createIdentifier(b.name),
                                    ),
                                  ),
                                  true,
                                ),
                          ],
                        )
                      : // One File parameter
                        t.createIdentifier("req"),
                )
              : [],
          ),
        true,
      );
    };

    statements.push(
      t.createReturnStatement(
        shouldUseJSONResponse
          ? t.createCallExpression(
              t.createPropertyAccessExpression(
                t.createCallExpression(
                  t.createIdentifier(adapter.name),
                  undefined,
                  [
                    Generator.toUrlTemplate(uri, parameters),
                    toLiterlExpression(),
                  ],
                ),
                t.createIdentifier("then"),
              ),
              undefined,
              [
                t.createArrowFunction(
                  [t.createModifier(SyntaxKind.AsyncKeyword)],
                  [],
                  [
                    t.createParameterDeclaration(
                      undefined,
                      undefined,
                      t.createIdentifier("response"),
                    ),
                  ],
                  undefined,
                  t.createToken(SyntaxKind.EqualsGreaterThanToken),
                  t.createAsExpression(
                    t.createParenthesizedExpression(
                      t.createAwaitExpression(
                        t.createCallExpression(
                          t.createPropertyAccessExpression(
                            t.createIdentifier("response"),
                            t.createIdentifier("json"),
                          ),
                          undefined,
                          [],
                        ),
                      ),
                    ),
                    response?.schema
                      ? Generator.toTypeNode(response.schema)
                      : t.createToken(SyntaxKind.UnknownKeyword),
                  ),
                ),
              ],
            )
          : t.createCallExpression(
              t.createIdentifier(adapter.name),
              undefined,
              [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()],
            ),
      ),
    );

    return statements;
  }
}
