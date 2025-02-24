/* eslint-disable unicorn/prefer-spread */
/**
 * File containing the implementation of the AxiosAdapter class.
 * This adapter is responsible for generating code that uses the Axios HTTP client library.
 */

import { Adapter } from "@apicodegen/core/base/Adaptor";
import { Base } from "@apicodegen/core/base/Base";
import { Generator } from "@apicodegen/core/generator";
import { MediaTypeObject, ParameterObject } from "@apicodegen/core/interface";
import type { Statement, TypeReferenceNode } from "typescript";
import { factory as t } from "typescript";

/**
 * Adapter class implementing support for generating code that makes use of the Axios HTTP client library.
 * This class defines custom behavior and field mappings specific to the Axios client.
 */
export class AxiosAdapter extends Adapter {
  /**
   * Name of the field used to specify the HTTP method in the request configuration.
   */
  readonly methodFieldName = "method";

  /**
   * Name of the field used to specify the request body (data) in the request configuration.
   */
  readonly bodyFieldName = "data";

  /**
   * Name of the field used to specify the request headers in the request configuration.
   */
  readonly headersFieldName = "headers";

  /**
   * Name of the field used to specify the query parameters in the request configuration.
   */
  readonly queryFieldName = "params";

  /**
   * The name of the client this adapter is configured for, which is 'axios' in this case.
   */
  readonly name = "axios";

  /**
   * Method that should generate and return the client-specific configuration statements.
   *
   * @returns {Statement[]} An array of TypeScript statements that define the client configuration.
   *
   * @throws {Error} Indicates that the method is not yet implemented and needs to be filled in.
   */
  public client(
    uri: string,
    method: string,
    parameters: ParameterObject[],
    requestBody: MediaTypeObject | undefined,
    response: MediaTypeObject | undefined,
    adapter: Adapter,
    shouldUseFormData: boolean,
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
                      ? t.createIdentifier("req")
                      : t.createIdentifier("req"),
                )
              : [],
          ),
        true,
      );
    };

    // Construct the fetch call and return statement
    statements.push(
      t.createReturnStatement(
        t.createCallExpression(
          t.createIdentifier(adapter.name),
          response?.schema
            ? [
                Generator.toTypeNode(
                  response.schema,
                ) as unknown as TypeReferenceNode,
              ]
            : undefined,
          [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()],
        ),
      ),
    );

    return statements;
  }
}
