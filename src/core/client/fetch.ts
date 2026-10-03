/* eslint-disable unicorn/prefer-spread */

import type { PropertyAssignment, Statement } from 'typescript';
import { SyntaxKind, factory as t } from 'typescript';
import { Adapter, type BodyKind } from '../base/Adaptor.js';
import { Base } from '../base/Base.js';
import { Generator } from '../generator/index.js';
import type { MediaTypeObject, ParameterObject } from '../interface.js';

/**
 * FetchAdapter is an adapter class that generates client-side fetch requests.
 * It handles parameters, headers, and request bodies to construct proper fetch calls.
 */
export class FetchAdapter extends Adapter {
	readonly methodFieldName = 'method';
	readonly bodyFieldName = 'body';
	readonly headersFieldName = 'headers';
	readonly queryFieldName = '';
	readonly name = 'fetch';

	/**
	 * Generates client code for making API requests using the Fetch API.
	 * @param uri - The API endpoint URI
	 * @param method - The HTTP method (GET, POST, etc.)
	 * @param parameters - Array of parameters to include in the request
	 * @param requestBody - The request body media type definition
	 * @param response - The response media type definition
	 * @param adapter - The adapter instance
	 * @param bodyKind - How the body should be encoded (json / form-data / urlencoded / binary / none)
	 * @param bodyContentType - Content-Type header to inject (undefined means "let runtime decide", e.g. multipart boundary)
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
		bodyKind: BodyKind,
		bodyContentType: string | undefined,
		shouldUseJSONResponse: boolean
	): Statement[] {
		const statements: Statement[] = [];

		// Split parameters into header and body parameters
		const inBody = parameters.filter((p) => !p.in || p.in === 'body');
		const inHeader = parameters.filter((p) => p.in === 'header');

		/**
		 * Creates the literal object expression for fetch options
		 * including method, headers, and body.
		 * @returns - The constructed fetch options object
		 */
		const toLiterlExpression = () => {
			const headerEntries: PropertyAssignment[] = [];
			for (const p of inHeader) {
				headerEntries.push(
					t.createPropertyAssignment(
						t.createStringLiteral(p.name),
						t.createCallExpression(
							t.createIdentifier('encodeURIComponent'),
							undefined,
							[
								t.createCallExpression(
									t.createIdentifier('String'),
									undefined,
									[t.createIdentifier(Base.camelCase(Base.normalize(p.name)))]
								),
							]
						)
					)
				);
			}
			if (bodyContentType !== undefined) {
				headerEntries.push(
					t.createPropertyAssignment(
						t.createStringLiteral('Content-Type'),
						t.createStringLiteral(bodyContentType)
					)
				);
			}

			const properties: PropertyAssignment[] = [
				t.createPropertyAssignment(
					t.createIdentifier(adapter.methodFieldName),
					t.createStringLiteral(method.toUpperCase())
				),
			];

			if (headerEntries.length > 0) {
				properties.push(
					t.createPropertyAssignment(
						t.createIdentifier(adapter.headersFieldName),
						t.createObjectLiteralExpression(headerEntries)
					)
				);
			}

			let bodyExpr: import('typescript').Expression | undefined;
			switch (bodyKind) {
				case 'form-data':
					bodyExpr = t.createIdentifier('fd');
					break;
				case 'urlencoded':
					bodyExpr = t.createIdentifier('sp');
					break;
				case 'json': {
					const arg = requestBody
						? t.createIdentifier('req')
						: t.createObjectLiteralExpression(
								inBody.map((b) =>
									t.createShorthandPropertyAssignment(
										t.createIdentifier(b.name)
									)
								),
								true
							);
					bodyExpr = t.createCallExpression(
						t.createPropertyAccessExpression(
							t.createIdentifier('JSON'),
							t.createIdentifier('stringify')
						),
						[],
						[arg]
					);
					break;
				}
				case 'binary':
					bodyExpr = t.createIdentifier('req');
					break;
				case 'none':
					break;
			}

			if (bodyExpr) {
				properties.push(
					t.createPropertyAssignment(
						t.createIdentifier(adapter.bodyFieldName),
						bodyExpr
					)
				);
			}

			return t.createObjectLiteralExpression(properties, true);
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
									]
								),
								t.createIdentifier('then')
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
											t.createIdentifier('response')
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
																t.createIdentifier('response'),
																t.createIdentifier('json')
															),
															undefined,
															[]
														)
													)
												),
												Generator.toTypeNode(response.schema)
											)
										: t.createParenthesizedExpression(
												t.createAwaitExpression(
													t.createCallExpression(
														t.createPropertyAccessExpression(
															t.createIdentifier('response'),
															t.createIdentifier('json')
														),
														undefined,
														[]
													)
												)
											)
								),
							]
						)
					: // Simple fetch call without JSON parsing
						t.createCallExpression(
							t.createIdentifier(adapter.name),
							undefined,
							[Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]
						)
			)
		);

		return statements;
	}
}
