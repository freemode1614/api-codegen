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
import { Adapter } from '../base/Adaptor.js';
import { Base } from '../base/Base.js';
import { Generator } from '../generator/index.js';
import type { MediaTypeObject, ParameterObject } from '../interface.js';

/**
 * Adapter class implementing support for generating code that makes use of the Axios HTTP client library.
 * This class defines custom behavior and field mappings specific to the Axios client.
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
	 * Generates client code for making API requests using Axios.
	 * @param uri - The API endpoint URI
	 * @param method - The HTTP method (GET, POST, etc.)
	 * @param parameters - Array of parameters to include in the request
	 * @param requestBody - The request body media type definition
	 * @param response - The response media type definition
	 * @param adapter - The adapter instance
	 * @param shouldUseFormData - Flag to use FormData for the request body
	 * @param shouldUseJSONResponse - Unused by AxiosAdapter; present to align with the abstract signature so positional args bind correctly
	 * @param isEventStream - Flag indicating a text/event-stream response; when true the raw AxiosResponse is returned without JSON parsing
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
		_shouldUseJSONResponse: boolean,
		isEventStream: boolean
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
		const toLiterlExpression = (extraProperties: PropertyAssignment[] = []) => {
			return t.createObjectLiteralExpression(
				[
					// Set the HTTP method
					t.createPropertyAssignment(
						t.createIdentifier(adapter.methodFieldName),
						t.createStringLiteral(method.toUpperCase())
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
													t.createIdentifier('encodeURIComponent'),
													undefined,
													[
														t.createCallExpression(
															t.createIdentifier('String'),
															undefined,
															[t.createIdentifier(Base.normalize(p.name))]
														),
													]
												)
											)
										)
									)
								)
							: []
					)
					.concat(
						shouldUseFormData || inBody.length > 0 || requestBody?.schema
							? t.createPropertyAssignment(
									t.createIdentifier(adapter.bodyFieldName),
									shouldUseFormData
										? t.createIdentifier('fd')
										: inBody.length > 0 ||
												(requestBody?.schema &&
													!Generator.isBinarySchema(requestBody.schema))
											? t.createIdentifier('req')
											: t.createIdentifier('req')
								)
							: []
					)
					.concat(extraProperties),
				true
			);
		};

		// SSE responses need axios to use the fetch adapter and stream the
		// response body so callers can iterate over the event stream.
		if (isEventStream) {
			statements.push(
				t.createReturnStatement(
					t.createCallExpression(t.createIdentifier(adapter.name), undefined, [
						Generator.toUrlTemplate(uri, parameters),
						toLiterlExpression([
							t.createPropertyAssignment(
								t.createIdentifier('adapter'),
								t.createStringLiteral('fetch')
							),
							t.createPropertyAssignment(
								t.createIdentifier('responseType'),
								t.createStringLiteral('stream')
							),
						]),
					])
				)
			);
			return statements;
		}

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
