/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable no-case-declarations */

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { format } from 'prettier';
import type {
	BindingElement,
	Block,
	Node,
	ParameterDeclaration,
	PropertySignature,
	Statement,
	TypeNode,
} from 'typescript';
import {
	addSyntheticLeadingComment,
	createPrinter,
	EmitHint,
	NodeFlags,
	ScriptTarget,
	SyntaxKind,
	factory as t,
} from 'typescript';
import type { Adapter, BodyKind } from '../base/Adaptor.js';
import { Base } from '../base/Base.js';
import type {
	ArrayTypeSchemaObject,
	MediaTypeObject,
	ParameterObject,
	ProviderInitOptions,
	ProviderInitResult,
	SchemaObject,
	SingleTypeSchemaObject,
} from '../interface.js';
import {
	ArraySchemaType,
	MediaTypes,
	NonArraySchemaType,
	ParameterIn,
	SchemaFormatType,
} from '../interface.js';
import { createUniqueNameResolver } from './naming.js';

/**
 * Represents a comment object with optional tag and message.
 */
export type CommentObject = {
	tag?: 'deprecated' | 'param' | 'returns';
	comment: string;
	paramName?: string;
	type?: string;
};

/**
 * Array of comment objects to be added to the code.
 */
export type Comments = CommentObject[];

export class Generator {
	/**
	 * Converts an array of TypeScript statements into a formatted string of code.
	 *
	 * @param statements - The array of TypeScript statement nodes.
	 * @returns Formatted code as a string.
	 * @throws {Error} If no valid statements are provided.
	 */
	static toCode(statements: ReadonlyArray<Statement>): string {
		if (statements.length === 0) {
			return '// No api declaration found.';
		}

		// PR3: hooks may return a frozen array. `createSourceFile` accepts a
		// readonly array; the second argument is the end-of-file token and
		// the third is the source-file node flags.
		const sourceFile = t.createSourceFile(
			[...statements],
			t.createToken(SyntaxKind.EndOfFileToken),
			NodeFlags.None
		);

		return createPrinter().printFile(sourceFile);
	}

	static async write(code: string, filepath: string) {
		try {
			await writeFile(filepath, code);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Write multiple files in a single call. Used by `codeGen()` when a
	 * `writeFile` plugin hook returns a `Record<path, code>`.
	 *
	 * Each entry is written independently — a failure on one path does
	 * not abort the others (errors are logged to `console.error`, same
	 * as the single-file `write()`). Paths are resolved by Node's
	 * `fs.promises.writeFile`, which interprets them relative to
	 * `process.cwd()` when not absolute. Unlike the single-file
	 * `write()`, parent directories are auto-created (`mkdir -p`) — the
	 * common multi-file split layout (`api.ts`, `types.ts`, `schemas.ts`
	 * in `src/`) needs that to succeed.
	 *
	 * @param files - Map of output path → source code.
	 */
	static async writeMany(files: Readonly<Record<string, string>>) {
		await Promise.all(
			Object.entries(files).map(async ([filepath, code]) => {
				const dir = dirname(filepath);
				if (dir && dir !== '.') {
					try {
						await mkdir(dir, { recursive: true });
					} catch {
						// directory might already exist or be a file —
						// let writeFile() raise the real error if any.
					}
				}
				await Generator.write(code, filepath);
			})
		);
	}

	/**
	 * Converts a path string with parameters into a TypeScript template expression.
	 * Handles query parameters and path placeholders.
	 *
	 * @param path - The base path string containing placeholders.
	 * @param parameters - Array of parameter objects defining the parameters.
	 * @param basePath - Optional base path to prepend (default: "").
	 * @returns A TypeScript template expressi
	 */
	static toUrlTemplate(
		path: string,
		parameters: ParameterObject[],
		basePath = ''
	) {
		// Extract query parameters
		const queryParameters = parameters.filter(
			(p) => p.in === ParameterIn.query
		);

		if (queryParameters.length > 0) {
			const queryString = queryParameters
				.map(
					(qp, index) =>
						`${index === 0 ? '?' : '&'}${encodeURIComponent(qp.name)}={${Base.camelCase(Base.normalize(qp.name))}}`
				)
				.join('');
			path += queryString;
		}

		// Split the path into segments
		const pathSegments = path.replaceAll('{', '${').split('$').filter(Boolean);

		// If path segments only got one item, it means there are no parameters in path. So just return the path literal.
		if (pathSegments.length === 1) {
			return t.createNoSubstitutionTemplateLiteral(basePath + path);
		}

		return t.createTemplateExpression(
			t.createTemplateHead(basePath + pathSegments[0]),
			pathSegments.slice(1).map((segment, index) => {
				const match = /^{(.+)}(.+)?/gm.exec(segment);
				const isLastSegment = index === pathSegments.length - 2;

				if (!match) {
					throw new Error(`Invalid path segment: ${segment}`);
				}

				return t.createTemplateSpan(
					t.createIdentifier(match[1]),
					!isLastSegment
						? t.createTemplateMiddle(match[2])
						: t.createTemplateTail(match[2] || '')
				);
			})
		);
	}

	/**
	 * Adds synthetic comments to a TypeScript AST node.
	 *
	 * @param node - The target AST node.
	 * @param comments - Array of comment objects to add.
	 */
	static addComments(node: Node, comments: Comments) {
		if (!Array.isArray(comments) || comments.filter(Boolean).length === 0)
			return;

		const formatComment = (comment: CommentObject): string => {
			if (comment.tag === 'returns') {
				return `* @returns {${comment.type}} ${comment.comment ?? ''}`;
			}
			if (comment.tag === 'param') {
				const typePart = comment.type ? `{${comment.type}} ` : '';
				return comment.comment
					? `* @param ${typePart}${comment.paramName} - ${comment.comment}`
					: `* @param ${typePart}${comment.paramName}`;
			}
			if (comment.tag) {
				return `* @${comment.tag} ${comment.comment ?? ''}`;
			}
			return `* ${comment.comment}`;
		};

		const formattedComments =
			comments.map(formatComment).join('\n').trim() + '\n';

		addSyntheticLeadingComment(
			node,
			SyntaxKind.MultiLineCommentTrivia,
			formattedComments,
			true
		);
	}

	/**
	 * Checks if a schema represents a binary type.
	 *
	 * @param schema - The schema object to check.
	 * @returns true if the schema is a binary type, false otherwise.
	 */
	static isBinarySchema(schema: SchemaObject): boolean {
		if (schema.type === 'array') {
			const arraySchema = schema as ArrayTypeSchemaObject;
			return Generator.isBinarySchema(arraySchema.items!);
		}

		const nonArraySchema = schema as SingleTypeSchemaObject;
		return (
			nonArraySchema.format === SchemaFormatType.blob ||
			nonArraySchema.format === SchemaFormatType.binary ||
			nonArraySchema.type === SchemaFormatType.file
		);
	}

	static schemaToTypeString(schema: SchemaObject): string {
		if (schema.type === 'array') {
			const arraySchema = schema as ArrayTypeSchemaObject;
			return arraySchema.items
				? `${Generator.schemaToTypeString(arraySchema.items)}[]`
				: 'unknown';
		}
		const singleSchema = schema as SingleTypeSchemaObject;
		if (schema.type === 'string') return 'string';
		if (schema.type === 'number' || schema.type === 'integer') return 'number';
		if (schema.type === 'boolean') return 'boolean';
		if (
			schema.type === 'object' ||
			(schema as SingleTypeSchemaObject).properties
		)
			return 'object';
		if (singleSchema.format === 'binary' || singleSchema.type === 'file')
			return 'Blob';
		if (singleSchema.format === 'blob') return 'Blob';
		if (singleSchema.ref) return singleSchema.ref;
		return 'unknown';
	}

	static generateParamTags(
		parameters: ParameterObject[],
		requestBody?: MediaTypeObject
	): CommentObject[] {
		const tags: CommentObject[] = [];

		for (const p of parameters) {
			const paramName = Base.camelCase(Base.normalize(p.name));
			let paramType = 'unknown';

			if (p.schema) {
				paramType = Generator.schemaToTypeString(p.schema);
			}

			const isOptional = p.required === false;
			const inPrefix = p.in ? `[${p.in}] ` : '';
			tags.push({
				tag: 'param',
				paramName: paramName,
				type: `${paramType}${isOptional ? ' | undefined' : ''}`,
				comment: `${inPrefix}${p.description ?? ''}`,
			});
		}

		if (requestBody?.schema && 'properties' in requestBody.schema) {
			const properties = requestBody.schema.properties as Record<
				string,
				SchemaObject
			>;
			const required = requestBody.schema.required;
			const requiredArray = Array.isArray(required) ? required : [];
			for (const [key, schema] of Object.entries(properties ?? {})) {
				const paramName = `req.${key}`;
				const paramType = Generator.schemaToTypeString(schema);
				const isOptional = !requiredArray.includes(key);
				tags.push({
					tag: 'param',
					paramName: paramName,
					type: `${paramType}${isOptional ? ' | undefined' : ''}`,
					comment: schema.description ?? '',
				});
			}
		}

		return tags;
	}

	static toRequestBodyTypeNode(schema: SchemaObject) {
		return t.createParameterDeclaration(
			undefined,
			undefined,
			t.createIdentifier('req'),
			undefined,
			Generator.toTypeNode(schema)
		);
	}

	static toTypeNode(schema: SchemaObject): TypeNode {
		const { type, ref } = schema;

		if (ref) {
			const identify = Base.ref2name(ref);
			return t.createTypeReferenceNode(
				t.createIdentifier(
					identify === 'unknown' ? identify : Base.upperCamelCase(identify)
				)
			);
		}

		switch (type) {
			case ArraySchemaType.array: {
				const { items } = schema as ArrayTypeSchemaObject;
				return t.createArrayTypeNode(Generator.toTypeNode(items!));
			}
			case NonArraySchemaType.object: {
				const propsCount = Object.keys(schema.properties ?? {}).length;
				if (!schema.properties || propsCount === 0) {
					return t.createTypeReferenceNode(t.createIdentifier('Record'), [
						t.createToken(SyntaxKind.StringKeyword),
						t.createToken(SyntaxKind.UnknownKeyword),
					]);
				}

				const props = Object.keys(schema.properties);

				return t.createTypeLiteralNode(
					props.map((propKey) => {
						const propSchema = schema.properties![propKey];
						return t.createPropertySignature(
							undefined,
							t.createStringLiteral(propKey),
							schema.required || schema.ref || Generator.isBinarySchema(schema)
								? undefined
								: t.createToken(SyntaxKind.QuestionToken),
							Generator.toTypeNode(propSchema)
						);
					})
				);
			}
			case NonArraySchemaType.integer:
			case NonArraySchemaType.number:
				if (schema.enum) {
					return t.createUnionTypeNode(
						schema.enum.map((e) =>
							t.createLiteralTypeNode(t.createNumericLiteral(e))
						)
					);
				}
				return t.createToken(SyntaxKind.NumberKeyword);
			case NonArraySchemaType.boolean:
				return t.createToken(SyntaxKind.BooleanKeyword);
			case NonArraySchemaType.file:
				return t.createTypeReferenceNode(t.createIdentifier('Blob'));
			default: {
				const {
					format,
					oneOf,
					allOf,
					anyOf,
					type,
					enum: enum_,
				} = schema as SingleTypeSchemaObject;

				switch (format) {
					case SchemaFormatType.number:
						return t.createToken(SyntaxKind.NumberKeyword);
					case SchemaFormatType.string:
						return t.createToken(SyntaxKind.StringKeyword);
					case SchemaFormatType.boolean:
						return t.createToken(SyntaxKind.BooleanKeyword);
					case SchemaFormatType.blob:
					case SchemaFormatType.binary:
						return t.createTypeReferenceNode(t.createIdentifier('Blob'));
					default:
				}

				if (enum_) {
					return t.createUnionTypeNode(
						enum_.map((e) =>
							t.createLiteralTypeNode(t.createStringLiteral(e as string))
						)
					);
				}

				if (type === NonArraySchemaType.string) {
					return t.createToken(SyntaxKind.StringKeyword);
				}

				if (oneOf) {
					const uniqueTypes = Generator.deduplicateTypes(
						oneOf.map((s) => Generator.toTypeNode(s))
					);
					return t.createUnionTypeNode(uniqueTypes);
				}

				if (anyOf) {
					const uniqueTypes = Generator.deduplicateTypes(
						anyOf.map((s) => Generator.toTypeNode(s))
					);
					return t.createUnionTypeNode(uniqueTypes);
				}

				if (allOf) {
					return t.createIntersectionTypeNode(
						allOf.map((schema) => Generator.toTypeNode(schema))
					);
				}

				if (type && typeof type === 'string') {
					return t.createTypeReferenceNode(
						type !== 'unknown' && type !== 'null'
							? t.createIdentifier(Base.upperCamelCase(type))
							: type
					);
				}
			}
		}

		return t.createToken(SyntaxKind.UnknownKeyword);
	}

	static deduplicateTypes(types: TypeNode[]): TypeNode[] {
		const seen = new Set<string>();
		const unique: TypeNode[] = [];
		for (const type of types) {
			const key = Generator.getTypeNodeKey(type);
			if (!seen.has(key)) {
				seen.add(key);
				unique.push(type);
			}
		}
		return unique;
	}

	static getTypeNodeKey(type: TypeNode): string {
		return JSON.stringify(type);
	}

	static toDeclarationNodes(
		parameters: ParameterObject[]
	): ParameterDeclaration[] {
		const objectElements: BindingElement[] = [];
		const typeObjectElements: PropertySignature[] = [];
		const refParameters: ParameterDeclaration[] = [];

		for (const parameter of parameters) {
			if (parameter.ref) {
				// Handle reference parameters as standalone parameters
				const refName = Base.ref2name(parameter.ref);
				refParameters.push(
					t.createParameterDeclaration(
						undefined,
						undefined,
						t.createIdentifier(Base.camelCase(Base.normalize(refName))),
						undefined,
						t.createTypeReferenceNode(
							t.createIdentifier(Base.upperCamelCase(Base.normalize(refName)))
						),
						undefined
					)
				);
			} else {
				const { name, schema, required } = parameter;
				objectElements.push(
					t.createBindingElement(
						undefined,
						undefined,
						t.createIdentifier(Base.camelCase(Base.normalize(name)))
					)
				);

				typeObjectElements.push(
					t.createPropertySignature(
						[],
						t.createIdentifier(Base.camelCase(Base.normalize(name))),
						required ? undefined : t.createToken(SyntaxKind.QuestionToken),
						!schema
							? t.createToken(SyntaxKind.UnknownKeyword)
							: Generator.toTypeNode(schema)
					)
				);
			}
		}

		// Build object destructuring parameter for non-ref parameters
		if (objectElements.length > 0) {
			const objectParam = t.createParameterDeclaration(
				undefined,
				undefined,
				t.createObjectBindingPattern(objectElements),
				undefined,
				t.createTypeLiteralNode(typeObjectElements),
				undefined
			);
			return [objectParam, ...refParameters];
		}

		return refParameters;
	}

	static toFormDataStatement(
		parameters: ParameterObject[],
		requestBody?: SchemaObject
	): Statement[] {
		const statements: Statement[] = [];
		const fdDeclaration = t.createVariableStatement(
			undefined,
			t.createVariableDeclarationList(
				[
					t.createVariableDeclaration(
						t.createIdentifier('fd'),
						undefined,
						undefined,
						t.createNewExpression(t.createIdentifier('FormData'), undefined, [])
					),
				],
				NodeFlags.Const
			)
		);

		statements.push(fdDeclaration);

		parameters.forEach((parameter) => {
			statements.push(
				t.createExpressionStatement(
					t.createBinaryExpression(
						t.createIdentifier(parameter.name),
						t.createToken(SyntaxKind.AmpersandAmpersandToken),
						t.createCallExpression(
							t.createPropertyAccessExpression(
								t.createIdentifier('fd'),
								t.createIdentifier('append')
							),
							undefined,
							[
								t.createStringLiteral(parameter.name),
								t.createIdentifier(parameter.name),
							]
						)
					)
				)
			);
		});

		if (
			requestBody &&
			requestBody.type === 'object' &&
			requestBody.properties &&
			Object.keys(requestBody.properties).length !== 0
		) {
			Object.keys(requestBody.properties).forEach((key) => {
				const schemaByKey = requestBody.properties![key];
				if (
					schemaByKey.type === ArraySchemaType.array &&
					Generator.isBinarySchema(schemaByKey)
				) {
					statements.push(
						t.createForOfStatement(
							undefined,
							t.createVariableDeclarationList(
								[t.createVariableDeclaration('file')],
								NodeFlags.Const
							),
							t.createElementAccessExpression(
								t.createIdentifier('req'),
								t.createStringLiteral(key)
							),
							t.createBlock([
								t.createExpressionStatement(
									t.createCallExpression(
										t.createPropertyAccessExpression(
											t.createIdentifier('fd'),
											t.createIdentifier('append')
										),
										[],
										[
											t.createStringLiteral(key),
											t.createIdentifier('file'),
											t.createPropertyAccessExpression(
												t.createAsExpression(
													t.createIdentifier('file'),
													t.createTypeReferenceNode(
														t.createIdentifier('File'),
														undefined
													)
												),
												t.createIdentifier('name')
											),
										]
									)
								),
							])
						)
					);
				} else {
					if (schemaByKey.required) {
						statements.push(
							t.createExpressionStatement(
								t.createCallExpression(
									t.createPropertyAccessExpression(
										t.createIdentifier('fd'),
										t.createIdentifier('append')
									),
									undefined,
									[
										t.createStringLiteral(key),
										schemaByKey.type === 'string' ||
										Generator.isBinarySchema(schemaByKey as SchemaObject) ||
										(schemaByKey as SingleTypeSchemaObject).isRef
											? t.createElementAccessExpression(
													t.createIdentifier('req'),
													t.createStringLiteral(key)
												)
											: schemaByKey.type === 'array' ||
													schemaByKey.type === 'object'
												? t.createCallExpression(
														t.createPropertyAccessExpression(
															t.createIdentifier('JSON'),
															t.createIdentifier('stringify')
														),
														undefined,
														[
															t.createElementAccessExpression(
																t.createIdentifier('req'),
																t.createStringLiteral(key)
															),
														]
													)
												: t.createCallExpression(
														t.createIdentifier('String'),
														undefined,
														[
															t.createElementAccessExpression(
																t.createIdentifier('req'),
																t.createStringLiteral(key)
															),
														]
													),
									]
								)
							)
						);
					} else {
						statements.push(
							t.createExpressionStatement(
								t.createBinaryExpression(
									t.createElementAccessExpression(
										t.createIdentifier('req'),
										t.createStringLiteral(key)
									),
									t.createToken(SyntaxKind.AmpersandAmpersandToken),
									t.createCallExpression(
										t.createPropertyAccessExpression(
											t.createIdentifier('fd'),
											t.createIdentifier('append')
										),
										undefined,
										[
											t.createStringLiteral(key),
											schemaByKey.type === 'string' ||
											Generator.isBinarySchema(schemaByKey as SchemaObject) ||
											(schemaByKey as SingleTypeSchemaObject).isRef
												? t.createElementAccessExpression(
														t.createIdentifier('req'),
														t.createStringLiteral(key)
													)
												: schemaByKey.type === 'array' ||
														schemaByKey.type === 'object'
													? t.createCallExpression(
															t.createPropertyAccessExpression(
																t.createIdentifier('JSON'),
																t.createIdentifier('stringify')
															),
															undefined,
															[
																t.createElementAccessExpression(
																	t.createIdentifier('req'),
																	t.createStringLiteral(key)
																),
															]
														)
													: t.createCallExpression(
															t.createIdentifier('String'),
															undefined,
															[
																t.createElementAccessExpression(
																	t.createIdentifier('req'),
																	t.createStringLiteral(key)
																),
															]
														),
										]
									)
								)
							)
						);
					}
				}
			});
		}

		return statements;
	}

	/**
	 * Build statements that construct a `URLSearchParams` from request body
	 * fields for an `application/x-www-form-urlencoded` request.
	 *
	 * Skips `undefined` / `null` values so optional fields don't end up as
	 * the literal string `"undefined"` in the URL (fixes #8).
	 *
	 * The resulting `sp` variable is referenced by the adapter as the
	 * `body` payload.
	 */
	static toURLSearchParamsStatement(
		parameters: ParameterObject[],
		requestBody?: SchemaObject
	): Statement[] {
		const statements: Statement[] = [];
		const spDeclaration = t.createVariableStatement(
			undefined,
			t.createVariableDeclarationList(
				[
					t.createVariableDeclaration(
						t.createIdentifier('sp'),
						undefined,
						undefined,
						t.createNewExpression(
							t.createIdentifier('URLSearchParams'),
							undefined,
							[]
						)
					),
				],
				NodeFlags.Const
			)
		);
		statements.push(spDeclaration);

		const appendValue = (
			key: string,
			valueExpr: import('typescript').Expression
		): Statement =>
			t.createExpressionStatement(
				t.createCallExpression(
					t.createPropertyAccessExpression(
						t.createIdentifier('sp'),
						t.createIdentifier('append')
					),
					undefined,
					[t.createStringLiteral(key), valueExpr]
				)
			);

		// Body-level fields.
		if (
			requestBody &&
			requestBody.type === 'object' &&
			requestBody.properties &&
			Object.keys(requestBody.properties).length !== 0
		) {
			for (const key of Object.keys(requestBody.properties)) {
				const fieldSchema = requestBody.properties[key];
				const required = !!fieldSchema.required;
				const accessor = t.createElementAccessExpression(
					t.createIdentifier('req'),
					t.createStringLiteral(key)
				);
				const stringValue = Generator.toFormDataCompatibleString(
					accessor,
					fieldSchema
				);
				const append = appendValue(key, stringValue);
				if (required) {
					statements.push(append);
				} else {
					// Skip nullish values.
					statements.push(
						t.createIfStatement(
							t.createBinaryExpression(
								accessor,
								t.createToken(SyntaxKind.ExclamationEqualsToken),
								t.createToken(SyntaxKind.NullKeyword)
							),
							t.createBlock([append], true)
						)
					);
				}
			}
		}

		// Standalone query-style parameters (rare for form bodies, but kept
		// for symmetry with `toFormDataStatement`).
		for (const parameter of parameters) {
			if (
				parameter.in === ParameterIn.header ||
				parameter.in === ParameterIn.cookie ||
				parameter.in === ParameterIn.path
			) {
				continue;
			}
			const accessor = t.createIdentifier(
				Base.camelCase(Base.normalize(parameter.name))
			);
			statements.push(
				t.createIfStatement(
					t.createBinaryExpression(
						accessor,
						t.createToken(SyntaxKind.ExclamationEqualsToken),
						t.createToken(SyntaxKind.NullKeyword)
					),
					t.createBlock(
						[
							appendValue(
								parameter.name,
								Generator.toFormDataCompatibleString(accessor)
							),
						],
						true
					)
				)
			);
		}

		return statements;
	}

	/**
	 * Render `expr` as a string suitable for `FormData.append` /
	 * `URLSearchParams.append`. Object/array schemas are JSON-stringified,
	 * everything else is coerced via `String(...)`.
	 */
	private static toFormDataCompatibleString(
		expr: import('typescript').Expression,
		schema?: SchemaObject
	): import('typescript').Expression {
		if (schema && (schema.type === 'object' || schema.type === 'array')) {
			return t.createCallExpression(
				t.createPropertyAccessExpression(
					t.createIdentifier('JSON'),
					t.createIdentifier('stringify')
				),
				undefined,
				[expr]
			);
		}
		return t.createCallExpression(t.createIdentifier('String'), undefined, [
			expr,
		]);
	}

	static bodyBlock(
		uri: string,
		method: string,
		parameters: ParameterObject[],
		requestBody: MediaTypeObject | undefined,
		response: MediaTypeObject | undefined,
		adapter: Adapter
	): Block {
		const shouldParseResponseToJSON = 'application/json' === response?.type;

		// Parameters that look like form fields (Swagger 2.0 style) or are
		// binary (3.x style, often co-located with multipart/form-data).
		const parametersShouldPutInFormData = parameters.filter(
			(p) =>
				p.in === ParameterIn.formData ||
				(p.schema && Generator.isBinarySchema(p.schema))
		);

		const parametersShouldNotPutInFormData = parameters.filter(
			(p) => !parametersShouldPutInFormData.includes(p)
		);

		// Parameters that look like Swagger 2.0 body params (rare in 3.x, but
		// kept for backwards compatibility with V2 specs).
		const inBody = parametersShouldNotPutInFormData.filter(
			(p) => !p.in || p.in === 'body'
		);

		const isRequestBodyContainsBinary =
			requestBody?.schema &&
			'properties' in requestBody.schema &&
			Object.values(requestBody.schema?.properties ?? {}).some((p) =>
				Generator.isBinarySchema(p)
			);

		const hasBinaryInParameters = parameters.some(
			(p) => p?.schema && Generator.isBinarySchema(p.schema)
		);

		// --- Decide body kind -------------------------------------------------
		const mediaType = (requestBody?.type ?? '')
			.toLowerCase()
			.split(';')[0]
			?.trim();

		const requestSchemaIsBinary =
			requestBody?.schema && Generator.isBinarySchema(requestBody.schema);

		let bodyKind: BodyKind = 'none';
		let bodyContentType: string | undefined;

		if (mediaType === 'multipart/form-data') {
			// Multipart: any binary/file content in either parameters or
			// requestBody.schema (3.x style) triggers FormData construction.
			if (
				hasBinaryInParameters ||
				isRequestBodyContainsBinary ||
				parametersShouldPutInFormData.length > 0
			) {
				bodyKind = 'form-data';
				// Don't set Content-Type — runtime needs to add the boundary.
			}
		} else if (mediaType === 'application/x-www-form-urlencoded') {
			// URLSearchParams for any form-urlencoded request.
			bodyKind = 'urlencoded';
			bodyContentType = 'application/x-www-form-urlencoded';
		} else if (mediaType === 'application/json') {
			// Only emit a JSON body if the spec actually describes one
			// (schema or inBody parameters). The default `application/json`
			// placeholder injected by `schemaToStatemets` for body-less
			// operations has no schema and no params — leave those alone.
			if (requestBody?.schema || inBody.length > 0) {
				bodyKind = 'json';
				bodyContentType = 'application/json';
			}
		} else if (requestSchemaIsBinary) {
			// Single binary request body (Blob/File) — pass it through directly.
			bodyKind = 'binary';
			bodyContentType = requestBody?.type;
		} else if (requestBody?.schema) {
			// Unknown textual type with a schema (e.g. application/xml,
			// text/plain). We don't have a built-in serializer for these —
			// fall back to JSON.stringify. The Content-Type header is set
			// from the spec so the server still routes the request correctly.
			bodyKind = 'json';
			bodyContentType = requestBody?.type;
		}
		// No schema and unknown type → fall through to `none`.

		// Pre-statements: FormData / URLSearchParams construction.
		const preStatements: Statement[] = [];
		if (bodyKind === 'form-data') {
			preStatements.push(
				...Generator.toFormDataStatement(
					parametersShouldPutInFormData,
					requestBody?.schema
				)
			);
		} else if (bodyKind === 'urlencoded') {
			preStatements.push(
				...Generator.toURLSearchParamsStatement(
					parametersShouldNotPutInFormData,
					requestBody?.schema
				)
			);
		}

		return t.createBlock([
			...preStatements,
			...adapter.client(
				uri,
				method,
				parametersShouldNotPutInFormData,
				requestBody,
				response,
				adapter,
				bodyKind,
				bodyContentType,
				shouldParseResponseToJSON
			),
		]);
	}

	static schemaToStatemets(
		parsedDoc: ProviderInitResult,
		adaptor: Adapter,
		options: Omit<ProviderInitOptions, 'docURL' | 'output' | 'requestOptions'>
	): Statement[] {
		const statements = [] as Statement[];
		const { apis, schemas = {}, enums } = parsedDoc;

		const enumNames: string[] = [];

		for (const enumObject of enums) {
			enumNames.push(Base.upperCamelCase(enumObject.name));
			statements.push(
				t.createEnumDeclaration(
					[t.createToken(SyntaxKind.ExportKeyword)],
					t.createIdentifier(Base.upperCamelCase(enumObject.name)),
					enumObject.enum.map((member, index) => {
						const key = typeof member === 'string' ? member : `Value${member}`;
						return t.createEnumMember(
							t.createStringLiteral(key),
							typeof member === 'string'
								? t.createStringLiteral(member)
								: t.createNumericLiteral(member)
						);
					})
				)
			);
		}

		for (const schemaKey in schemas) {
			if (
				Object.hasOwn(schemas, schemaKey) &&
				!enumNames.includes(Base.upperCamelCase(schemaKey))
			) {
				const schema = schemas[schemaKey];
				statements.push(
					t.createTypeAliasDeclaration(
						[t.createModifier(SyntaxKind.ExportKeyword)],
						t.createIdentifier(Base.upperCamelCase(schemaKey)),
						undefined,
						Generator.toTypeNode(schema)
					)
				);
			}
		}

		// Per-generation unique-name resolver. Lives only for this pass so
		// repeated runs / dry-runs don't leak state across generations.
		const reserveUnique = createUniqueNameResolver();

		for (const uri in apis) {
			const operations = apis[uri];
			for (const operation of operations) {
				const {
					method,
					operationId,
					requestBody = [],
					responses = [],
					summary,
					deprecated,
					description,
				} = operation;

				let { parameters = [] } = operation;

				parameters = parameters.filter((p) => p.in !== 'cookie');

				// Add a default request, with no schema.
				if (requestBody.length === 0) {
					requestBody.push({ type: MediaTypes.JSON });
				}

				const shouldAddExtraMethodNameSuffix = requestBody.length > 1;

				for (const req of requestBody) {
					const statement = t.createFunctionDeclaration(
						[
							t.createModifier(SyntaxKind.ExportKeyword),
							t.createModifier(SyntaxKind.AsyncKeyword),
						],
						undefined,
						reserveUnique(
							Base.pathToFnName(uri, method, operationId) +
								(shouldAddExtraMethodNameSuffix
									? Base.mediaTypeToSuffix(req.type)
									: '')
						),
						undefined,
						[
							...(parameters.length > 0
								? Generator.toDeclarationNodes(parameters)
								: []),
							...(req?.schema
								? [Generator.toRequestBodyTypeNode(req.schema)]
								: []),
						].filter(Boolean) as ParameterDeclaration[],
						undefined,
						Generator.bodyBlock(
							options.baseURL + uri,
							method,
							parameters,
							req,
							responses[0],
							adaptor
						)
					);

					const mergedDescription = [description, summary]
						.filter(Boolean)
						.join('. ');
					Generator.addComments(
						statement,
						[
							mergedDescription && {
								comment: mergedDescription,
							},
							deprecated && {
								tag: 'deprecated',
							},
							...Generator.generateParamTags(parameters, req),
						].filter(Boolean) as CommentObject[]
					);
					statements.push(statement);
				}
			}
		}

		return statements;
	}

	static async prettier(code: string) {
		return await format(code, {
			parser: 'typescript',
		});
	}

	static async genCode(
		schema: ProviderInitResult,
		initOptions: ProviderInitOptions,
		adaptor: Adapter,
		plugins: ReadonlyArray<import('../plugin.js').Plugin> = []
	) {
		const { importClientSource } = initOptions;
		let statements = Generator.schemaToStatemets(schema, adaptor, {
			baseURL: initOptions.baseURL ?? '',
		});

		// PR3: chain `beforeEmit` hooks.
		if (plugins.some((p) => typeof p.beforeEmit === 'function')) {
			const { runBeforeEmitHooks } = await import('../hook-runner.js');
			statements = await runBeforeEmitHooks(
				plugins,
				{
					initOptions,
					schema,
					adapter: adaptor,
					output: initOptions.output,
				},
				statements
			);
		}

		let code = Generator.toCode(statements);

		if (importClientSource) {
			code = importClientSource + '\n\n' + code;
		}

		code = await Generator.prettier(code);

		// PR3: chain `afterFormat` hooks.
		if (plugins.some((p) => typeof p.afterFormat === 'function')) {
			const { runAfterFormatHooks } = await import('../hook-runner.js');
			code = await runAfterFormatHooks(
				plugins,
				{
					initOptions,
					schema,
					adapter: adaptor,
					output: initOptions.output,
					statements,
				},
				code
			);
		}

		return code;
	}
}
