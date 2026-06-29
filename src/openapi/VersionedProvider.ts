/**
 * @file VersionedProvider abstract base class
 * @description Shared OpenAPI doc parsing logic used by V2 / V3 / V3_1 providers.
 * Subclasses supply version-specific container accessors; the base class
 * owns the conversion methods (getSchemaByRef, toBaseSchema, etc.).
 */

import type { OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import {
	Base,
	type EnumSchemaObject,
	HttpMethods,
	type MediaTypeObject,
	type MediaTypes,
	NonArraySchemaType,
	type OperationObject,
	type ParameterIn,
	type ParameterObject,
	type ProviderInitResult,
	type SchemaFormatType,
	type SchemaObject,
} from '../core/index.js';

/**
 * Any of the three supported OpenAPI document shapes.
 * Subclasses narrow this to a specific version in their constructor.
 */
export type VersionedDoc =
	| OpenAPIV2.Document
	| OpenAPIV3.Document
	| OpenAPIV3_1.Document;

/**
 * Minimal interfaces for the three version-specific container shapes we read.
 * Kept loose on purpose so v2/v3/v3.1 can be plugged in interchangeably.
 */
type SchemaMap = Record<string, unknown>;
type ParameterMap = Record<string, unknown>;
type ResponseMap = Record<string, unknown>;
type RequestBodyMap = Record<string, unknown>;

/**
 * Returns the operations container for a path item regardless of version.
 */
type PathItemObject = Record<string, unknown>;

/**
 * OpenAPI version tag for subclasses.
 */
export enum OpenAPIVersion {
	v2 = 'v2',
	v3 = 'v3',
	v3_1 = 'v3_1',
}

/**
 * Abstract base class. Subclasses implement the four container accessors
 * and a version tag. The shared logic lives here.
 */
export abstract class VersionedProvider {
	protected abstract readonly doc: VersionedDoc;

	/**
	 * The OpenAPI version this provider handles.
	 */
	abstract readonly version: OpenAPIVersion;

	/**
	 * Returns the version-specific schema container (`definitions` for v2,
	 * `components.schemas` for v3 / v3.1).
	 */
	protected abstract getSchemaContainer(): SchemaMap | undefined;

	/**
	 * Returns the version-specific parameter container (root-level `parameters`
	 * for v2; `components.parameters` for v3 / v3.1).
	 */
	protected abstract getParameterContainer(): ParameterMap | undefined;

	/**
	 * Returns the version-specific response container (root-level `responses`
	 * for v2; `components.responses` for v3 / v3.1).
	 */
	protected abstract getResponseContainer(): ResponseMap | undefined;

	/**
	 * Returns the version-specific requestBody container
	 * (`components.requestBodies` for v3 / v3.1; undefined for v2).
	 */
	protected abstract getRequestBodyContainer(): RequestBodyMap | undefined;

	/**
	 * Resolves a path $ref to the actual path object.
	 */
	protected resolvePathRef($ref: string): PathItemObject | undefined {
		const refName = Base.ref2name(
			$ref,
			this.doc as unknown as Record<string, unknown>
		);
		const paths = (this.doc as { paths?: Record<string, PathItemObject> })
			.paths;
		return paths?.[refName];
	}

	/**
	 * Is array schema.
	 */
	private isOpenAPIArraySchema(schema: unknown): boolean {
		return (
			typeof schema === 'object' &&
			schema !== null &&
			(schema as { type?: unknown }).type === 'array'
		);
	}

	/**
	 * OpenAPI schema to base schema. Override for version-specific quirks
	 * (V3_1 throws on missing ref; V3 returns `{ type: 'unknown' }`).
	 */
	protected getSchemaByRef(
		schema: unknown,
		reserveRef = false,
		enums: EnumSchemaObject[] = [],
		upLevelSchemaKey = ''
	): SchemaObject {
		let refName = '';
		if (Base.isRef(schema)) {
			refName = this.formatRefName(Base.ref2name(schema.$ref));
			if (reserveRef) {
				return {
					type: upLevelSchemaKey + refName,
				};
			}
			const resolvedSchema =
				this.getSchemaContainer()?.[
					Base.ref2name(
						schema.$ref,
						this.doc as unknown as Record<string, unknown>
					)
				];
			if (!resolvedSchema) {
				return { type: 'unknown' };
			}
			schema = resolvedSchema;
		}

		return this.toBaseSchema(
			schema as Record<string, unknown>,
			enums,
			'',
			upLevelSchemaKey + refName
		);
	}

	/**
	 * Format a ref name for the schema's `type` field.
	 * V3 uses `capitalize`; V3_1 uses `upperCamelCase` (preserved for compat).
	 */
	protected formatRefName(name: string): string {
		return Base.capitalize(name);
	}

	/**
	 * OpenAPI parameter to base parameter. Override in V2 — its parameter
	 * shape is structurally different (top-level `items`/`properties`/`enum`).
	 */
	protected getParameterByRef(
		schema: unknown,
		enums: EnumSchemaObject[] = [],
		upLevelSchemaKey = ''
	): ParameterObject {
		if (Base.isRef(schema)) {
			const resolvedSchema =
				this.getParameterContainer()?.[
					Base.ref2name(
						schema.$ref,
						this.doc as unknown as Record<string, unknown>
					)
				];
			if (!resolvedSchema) {
				return {
					name: 'unknown',
					in: 'query' as ParameterIn,
				};
			}
			schema = resolvedSchema;
		}

		const {
			name,
			required,
			deprecated,
			description,
			schema: parameterSchema,
		} = schema as {
			name: string;
			required?: boolean;
			deprecated?: boolean;
			description?: string;
			schema?: unknown;
			in: string;
		};

		if (
			parameterSchema &&
			!Base.isRef(parameterSchema) &&
			(parameterSchema as { enum?: unknown }).enum
		) {
			const type =
				Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
				Base.upperCamelCase(Base.normalize(name));

			const enumSchema = {
				name: type,
				enum: [
					...new Set((parameterSchema as { enum: (string | number)[] }).enum),
				],
			};

			const sameEnum = Base.findSameSchema(enumSchema, enums);

			if (
				!sameEnum &&
				Base.isValidEnumType(parameterSchema as unknown as SchemaObject)
			) {
				enums.push(enumSchema);
			}

			return {
				name,
				required,
				description,
				deprecated,
				in: (schema as { in: ParameterIn }).in,
				schema: {
					type: sameEnum?.name ?? type,
				},
			};
		}

		return {
			name,
			required,
			description,
			deprecated,
			in: (schema as { in: ParameterIn }).in,
			schema: (schema as { schema?: unknown }).schema
				? this.getSchemaByRef(
						(schema as { schema?: unknown }).schema,
						false,
						enums,
						upLevelSchemaKey + Base.capitalize(name)
					)
				: undefined,
		};
	}

	/**
	 * OpenAPI schema to base response. Override in V2 (its response shape
	 * lacks the `content` wrapper).
	 */
	protected getResponseByRef(schema: unknown): MediaTypeObject[] {
		if (Base.isRef(schema)) {
			const resolvedSchema =
				this.getResponseContainer()?.[
					Base.ref2name(
						schema.$ref,
						this.doc as unknown as Record<string, unknown>
					)
				];
			if (!resolvedSchema) {
				return [];
			}
			schema = resolvedSchema;
		}

		const { content = {} } = schema as {
			content?: Record<string, { schema?: unknown }>;
		};

		return Object.keys(content).map((c) => ({
			type: c as MediaTypes,
			schema: content[c].schema
				? this.getSchemaByRef(content[c].schema, true)
				: undefined,
		}));
	}

	/**
	 * OpenAPI schema to requestBody. V2 has no requestBody concept.
	 */
	protected getRequestBodyByRef(
		schema: unknown,
		enums: EnumSchemaObject[] = []
	): MediaTypeObject[] {
		if (Base.isRef(schema)) {
			const resolvedSchema =
				this.getRequestBodyContainer()?.[
					Base.ref2name(
						schema.$ref,
						this.doc as unknown as Record<string, unknown>
					)
				];
			if (!resolvedSchema) {
				return [];
			}
			schema = resolvedSchema;
		}

		const { content = {} } = schema as {
			content?: Record<string, { schema?: unknown }>;
		};

		return Object.keys(content).map((c) => ({
			type: c as MediaTypes,
			schema: content[c].schema
				? this.getSchemaByRef(content[c].schema, false, enums)
				: undefined,
		}));
	}

	/**
	 * Transform all OpenAPI schema to Base Schema
	 */
	private toBaseSchema(
		schema: unknown,
		enums: EnumSchemaObject[] = [],
		schemaKey = '',
		upLevelSchemaKey = ''
	): SchemaObject {
		if (!schema) {
			return {
				type: 'unknown',
			};
		}

		if (Base.isRef(schema)) {
			return this.getSchemaByRef(schema, true);
		}

		if (this.isOpenAPIArraySchema(schema)) {
			const { type, description, items, required } = schema as {
				type: string;
				description?: string;
				items?: unknown;
				required?: unknown;
			};

			const itemsSchema = items
				? this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
				: ({ type: 'unknown' } as SchemaObject);

			return {
				type: type as 'array',
				required: !!required,
				description,
				items: itemsSchema,
			};
		}
		const {
			required = [],
			allOf,
			anyOf,
			description,
			deprecated,
			enum: enum_,
			format,
			oneOf,
			properties = {},
		} = schema as {
			required?: string[];
			allOf?: unknown[];
			anyOf?: unknown[];
			description?: string;
			deprecated?: boolean;
			enum?: (string | number)[];
			format?: string;
			oneOf?: unknown[];
			properties?: Record<string, unknown>;
			type?: string;
		};
		let { type } = schema as { type?: string };

		if (enum_ && type !== 'boolean') {
			const name =
				Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
				Base.upperCamelCase(Base.normalize(schemaKey));

			const enumObject = {
				name,
				enum: [...new Set(enum_)],
			};

			const sameObject = Base.findSameSchema(enumObject, enums);

			if (
				!sameObject &&
				Base.isValidEnumType(schema as unknown as SchemaObject)
			) {
				enums.push(enumObject);
			}

			return {
				type: sameObject
					? sameObject.name
					: Base.isBooleanEnum(schema as unknown as SchemaObject)
						? 'boolean'
						: enumObject.name,
				required: required as string[] | undefined,
				description,
				deprecated,
			};
		}

		if (type === undefined && Object.keys(properties).length > 0) {
			type = NonArraySchemaType.object;
		}

		return {
			type: type as unknown as NonArraySchemaType,
			required: required as string[] | undefined,
			description,
			deprecated,
			enum: enum_,
			format: format as unknown as SchemaFormatType,
			allOf: allOf?.map((s) =>
				Base.isRef(s)
					? ({
							...s,
							ref: (s as { $ref: string }).$ref,
							type: Base.capitalize(
								Base.ref2name(
									(s as { $ref: string }).$ref,
									this.doc as unknown as Record<string, unknown>
								)
							),
						} as unknown as SchemaObject)
					: this.toBaseSchema(s, enums)
			),
			anyOf: anyOf?.map((s) =>
				Base.isRef(s)
					? ({
							...s,
							ref: (s as { $ref: string }).$ref,
							type: Base.capitalize(
								Base.ref2name(
									(s as { $ref: string }).$ref,
									this.doc as unknown as Record<string, unknown>
								)
							),
						} as unknown as SchemaObject)
					: this.toBaseSchema(s, enums)
			),
			oneOf: oneOf?.map((s) =>
				Base.isRef(s)
					? ({
							...s,
							ref: (s as { $ref: string }).$ref,
							type: Base.capitalize(
								Base.ref2name(
									(s as { $ref: string }).$ref,
									this.doc as unknown as Record<string, unknown>
								)
							),
						} as unknown as SchemaObject)
					: this.toBaseSchema(s, enums)
			),
			properties: Object.keys(properties).reduce(
				(acc, p) => {
					const propSchema = properties[p];
					return {
						...acc,
						[p]: Base.isRef(propSchema)
							? {
									type: Base.capitalize(
										Base.ref2name(
											(propSchema as { $ref: string }).$ref,
											this.doc as unknown as Record<string, unknown>
										)
									),
									isRef: true,
								}
							: this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey),
					};
				},
				{} as Record<string, SchemaObject>
			),
		};
	}

	/**
	 * Run the parsing pipeline and return a ProviderInitResult.
	 */
	public init(): ProviderInitResult {
		const { paths = {} } = this.doc as {
			paths?: Record<string, PathItemObject>;
		};
		const enums: EnumSchemaObject[] = [];
		const schemaContainer = this.getSchemaContainer() ?? {};
		const parameterContainer = this.getParameterContainer() ?? {};
		const responseContainer = this.getResponseContainer() ?? {};
		const requestBodyContainer = this.getRequestBodyContainer() ?? {};

		const schemas_ = Object.keys(schemaContainer).reduce((acc, key) => {
			const schema = schemaContainer[key];
			return {
				...acc,
				[key]: this.getSchemaByRef(schema, false, enums, key),
			};
		}, {});

		const parameters_ = Object.keys(parameterContainer).reduce((acc, key) => {
			const parameter = parameterContainer[key];
			return {
				...acc,
				[key]: this.getParameterByRef(parameter, enums, key),
			};
		}, {});

		const responses_ = Object.keys(responseContainer).reduce((acc, key) => {
			const response = responseContainer[key];
			return {
				...acc,
				[key]: this.getResponseByRef(response),
			};
		}, {});

		const requestBodies_ = Object.keys(requestBodyContainer).reduce(
			(acc, key) => {
				const requestBody = requestBodyContainer[key];
				return {
					...acc,
					[key]: this.getRequestBodyByRef(requestBody, enums),
				};
			},
			{}
		);

		const apis = Object.keys(paths).reduce((acc, path) => {
			let pathObject: PathItemObject = paths[path] ?? {};

			if ((pathObject as { $ref?: string }).$ref) {
				const resolved = this.resolvePathRef(
					(pathObject as { $ref: string }).$ref
				);
				if (resolved) {
					pathObject = resolved;
				}
			}

			const {
				parameters = [],
				description,
				summary,
			} = pathObject as {
				parameters?: unknown[];
				description?: string;
				summary?: string;
			};
			const methodApis: OperationObject[] = [];

			Object.values(HttpMethods).forEach((method) => {
				const methodObject = (pathObject as Record<string, unknown>)[method];

				if (methodObject) {
					const {
						deprecated,
						operationId,
						responses,
						summary: summary_,
						description: description_,
						requestBody = { content: {} },
					} = methodObject as {
						deprecated?: boolean;
						operationId?: string;
						responses?: Record<string, unknown>;
						summary?: string;
						description?: string;
						requestBody?: { content?: Record<string, unknown> };
					};
					// Clone to avoid mutating the input spec when we inject a
					// default 200 response below.
					const responsesClone: Record<string, unknown> = responses
						? { ...responses }
						: {};
					const { parameters: parameters_ = [] } = methodObject as {
						parameters?: unknown[];
					};
					const baseParameters = [...parameters, ...parameters_].map(
						(parameter) => this.getParameterByRef(parameter, enums)
					);
					const baseRequestBody = this.getRequestBodyByRef(requestBody, enums);
					const uniqueParameterName = [
						...new Set(baseParameters.map((p) => p.name)),
					];

					if (Object.keys(responsesClone).length === 0) {
						responsesClone[200] = {
							description: 'Successful response',
						};
					}
					const httpCodes = Object.keys(responsesClone);
					for (const code of httpCodes) {
						if (code in responsesClone) {
							const response = responsesClone[code];
							const responseSchema = this.getResponseByRef(response);
							methodApis.push({
								method,
								operationId,
								summary: summary_ ?? summary,
								description: description_ ?? description,
								deprecated: deprecated,
								parameters: uniqueParameterName
									.map((name) => baseParameters.find((p) => p.name === name))
									.filter((p): p is ParameterObject => p !== undefined),
								responses: responseSchema,
								requestBody: baseRequestBody,
							});
							break;
						}
					}
				}
			});

			return {
				...acc,
				[path]: methodApis,
			};
		}, {});

		return {
			enums: Base.uniqueEnums(enums),
			schemas: schemas_ as Record<string, SchemaObject>,
			responses: responses_ as Record<
				string,
				import('../core/index.js').ResponsesObject
			>,
			parameters: parameters_ as Record<string, ParameterObject>,
			requestBodies: requestBodies_ as Record<
				string,
				import('../core/index.js').RequestBodyObject
			>,
			apis: apis as Record<string, OperationObject[]>,
		};
	}
}
