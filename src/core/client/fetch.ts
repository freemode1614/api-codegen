/* eslint-disable unicorn/prefer-spread */
import { Adapter } from "@apicodegen/core/base/Adaptor";
import { Base } from "@apicodegen/core/base/Base";
import { Generator } from "@apicodegen/core/generator";
import { MediaTypeObject, ParameterObject } from "@apicodegen/core/interface";
import type { Statement } from "typescript";
import { factory as t, SyntaxKind } from "typescript";

/**
 * FetchAdapter is an adapter class that generates client-side fetch requests.
 * It handles parameters, headers, and request bodies to construct proper fetch calls.
 */
export class FetchAdapter extends Adapter {
  readonly methodFieldName = "method";
  readonly bodyFieldName = "body";
  readonly headersFieldName = "headers";
  readonly queryFieldName = "";
  readonly name = "fetch";

  /**
   * Generates client code for making API requests using the Fetch API.
   * @param uri - The API endpoint URI
   * @param method - The HTTP method (GET, POST, etc.)
   * @param parameters - Array of parameters to include in the request
   * @param requestBody - The request body media type definition
   * @param response - The response media type definition
   * @param adapter - The adapter instance
   * @param shouldUseFormData - Flag to use FormData for the request body
   * @param shouldUseJSONResponse - Flag to use JSON parsing for the response
   * @return - An array of generated TypeScript statements
   */
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

    // Split parameters into header and body parameters
    const inBody = parameters.filter((p) => !p.in || p.in === "body");
    const inHeader = parameters.filter((p) => p.in === "header");

    /**
     * Creates the literal object expression for fetch options
     * including method, headers, and body.
     * @returns - The constructed fetch options object
     */
    const toLiterlExpression = () => {
      return t.createObjectLiteralExpression(
        [
          // Set the HTTP method
          t.createPropertyAssignment(
            t.createIdentifier(adapter.methodFieldName),
            t.createStringLiteral(method.toUpperCase()),
          ),
        ]
          .concat(
            // Add headers if there are any
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
            // Add body if needed
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

    // Construct the fetch call and return statement
    statements.push(
      t.createReturnStatement(
        shouldUseJSONResponse
          ? // Handle JSON response with proper type checking
            t.createCallExpression(
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
                  response?.schema
                    ? t.createAsExpression(
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
                      )
                    : t.createParenthesizedExpression(
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
                ),
              ],
            )
          : // Simple fetch call without JSON parsing
            t.createCallExpression(
              t.createIdentifier(adapter.name),
              undefined,
              [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()],
            ),
      ),
    );

    return statements;
  }
}
