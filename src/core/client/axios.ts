/* eslint-disable unicorn/prefer-spread */
/**
 * File containing the implementation of the AxiosAdapter class.
 * This adapter is responsible for generating code that uses the Axios HTTP client library.
 */

import type {
	PropertyAssignment,
	Statement,
	TypeReferenceNode,
} from 'typescript';
import { factory as t } from 'typescript';
import { Adapter, type BodyKind } from '../base/Adaptor.js';
import { Base } from '../base/Base.js';
import { Generator } from '../generator/index.js';
import type { MediaTypeObject, ParameterObject } from '../interface.js';

/**
 * Adapter class implementing support for generating code that makes use of the Axios HTTP client library.
 * This adapter defines custom behavior and field mappings specific to the Axios client.
 */
export class AxiosAdapter extends Adapter {
	/**
	 * Name of the field used to specify the HTTP method in the request configuration.
	 */
	readonly methodFieldName = 'method';

	/**
	 * Name of the field used to specify the request body (data) in the request configuration.
	 */
	readonly bodyFieldName = 'data';

	/**
	 * Name of the field used to specify the request headers in the request configuration.
	 */
	readonly headersFieldName = 'headers';

	/**
	 * Name of the field used to specify the query parameters in the request configuration.
	 */
	readonly queryFieldName = 'params';

	/**
	 * The name of the client this adapter is configured for, which is 'axios' in this case.
	 */
	readonly name = 'axios';

	/**
	 * Method that should generate and return the client-specific configuration statements.
	 *
	 * @returns {Statement[]} An array of TypeScript statements that define the client configuration.
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
		_shouldUseJSONResponse: boolean
	): Statement[] {
		const statements: Statement[] = [];

		// Split parameters into header and body parameters
		const inBody = parameters.filter((p) => !p.in || p.in === 'body');
		const inHeader = parameters.filter((p) => p.in === 'header');

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
				case 'json':
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
				t.createCallExpression(
					t.createIdentifier(adapter.name),
					response?.schema
						? [
								Generator.toTypeNode(
									response.schema
								) as unknown as TypeReferenceNode,
							]
						: undefined,
					[Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]
				)
			)
		);

		return statements;
	}
}
