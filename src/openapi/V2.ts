/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OpenAPIV2 } from 'openapi-types';
import {
	Base,
	type EnumSchemaObject,
	HttpMethods,
	type MediaTypeObject,
	MediaTypes,
	type OperationObject,
	type ParameterIn,
	type ParameterObject,
	type SchemaObject,
} from '../core/index.js';
import { OpenAPIVersion, VersionedProvider } from './VersionedProvider.js';

export class V2 extends VersionedProvider {
	protected readonly doc: OpenAPIV2.Document;
	readonly version = OpenAPIVersion.v2;

	constructor(doc: OpenAPIV2.Document) {
		super();
		this.doc = doc;
	}

	protected override getSchemaContainer():
		| Record<string, OpenAPIV2.SchemaObject>
		| undefined {
		return this.doc.definitions as any;
	}

	protected override getParameterContainer():
		| Record<string, OpenAPIV2.ParameterObject>
		| undefined {
		return this.doc.parameters as any;
	}

	protected override getResponseContainer():
		| Record<string, OpenAPIV2.ResponseObject>
		| undefined {
		return this.doc.responses as any;
	}

	protected override getRequestBodyContainer(): undefined {
		return undefined;
	}

	/**
	 * V2 parameter shape differs from V3: top-level `items`/`properties`/`enum`
	 * rather than nested under `schema`. Override accordingly.
	 */
	protected override getParameterByRef(
		parameter: unknown,
		enums: EnumSchemaObject[] = [],
		upLevelSchemaKey = ''
	): ParameterObject {
		if (Base.isRef(parameter)) {
			const refName = Base.ref2name(
				(parameter as { $ref: string }).$ref,
				this.doc
			);
			const resolved = (
				this.doc as { parameters?: Record<string, OpenAPIV2.ParameterObject> }
			).parameters?.[refName];
			if (!resolved) {
				throw new Error(
					`Parameter reference not found: ${(parameter as { $ref: string }).$ref}`
				);
			}
			parameter = resolved;
		}

		const p = parameter as OpenAPIV2.ParameterObject;
		const {
			name,
			required,
			description,
			type,
			items,
			enum: enum_,
			properties,
			schema,
		} = p;

		if (enum_) {
			const enumType =
				Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) +
				Base.upperCamelCase(Base.normalize(name));

			const enumSchema = {
				name: enumType,
				enum: [...new Set(enum_ as (string | number)[])],
			};

			const sameEnum = Base.findSameSchema(enumSchema, enums);

			if (
				!sameEnum &&
				Base.isValidEnumType({ type: enumType, enum: enum_ } as SchemaObject)
			) {
				enums.push(enumSchema);
			}

			return {
				name,
				required,
				description,
				in: p.in as ParameterIn,
				schema: { type: sameEnum?.name ?? enumType },
			};
		}

		if (items) {
			return {
				name,
				required,
				description,
				in: p.in as ParameterIn,
				schema: {
					type: type as string,
					items: items as unknown as SchemaObject,
				} as unknown as SchemaObject,
			};
		}

		if (schema && Base.isRef(schema)) {
			return {
				name,
				required,
				description,
				in: p.in as ParameterIn,
				schema: {
					type: Base.capitalize(
						Base.ref2name((schema as { $ref: string }).$ref)
					),
				},
			};
		}

		return {
			name,
			required,
			description,
			in: p.in as ParameterIn,
			schema: { type: type as string, properties } as SchemaObject,
		};
	}

	/**
	 * V2 response shape: a `schema` field directly, not `content`. V2 always
	 * emits JSON.
	 */
	protected override getResponseByRef(schema: unknown): MediaTypeObject[] {
		if (Base.isRef(schema)) {
			schema = (
				this.doc as { responses: Record<string, OpenAPIV2.ResponseObject> }
			).responses[Base.ref2name((schema as { $ref: string }).$ref, this.doc)];
		}

		const { schema: responseSchema } = schema as { schema?: unknown };

		return [
			{
				type: MediaTypes.JSON,
				schema: responseSchema
					? this.getSchemaByRef(responseSchema, true)
					: undefined,
			},
		];
	}

	/**
	 * V2 has no `requestBody` concept; parameters with `in: body` or
	 * `in: formData` are split out and turned into a synthetic requestBody
	 * here. A single body param named `body` is used directly; otherwise
	 * the body / formData params are wrapped in a synthetic object.
	 */
	public override init() {
		const { paths = {} } = this.doc as {
			paths?: Record<string, Record<string, unknown>>;
		};
		const enums: EnumSchemaObject[] = [];

		const schemaContainer = this.getSchemaContainer() ?? {};
		const parameterContainer = this.getParameterContainer() ?? {};
		const responseContainer = this.getResponseContainer() ?? {};

		const schemas_ = Object.keys(schemaContainer).reduce((acc, key) => {
			const schema = schemaContainer[key];
			return { ...acc, [key]: this.getSchemaByRef(schema, false, enums, key) };
		}, {});

		const parameters_ = Object.keys(parameterContainer).reduce((acc, key) => {
			const parameter = parameterContainer[key];
			return { ...acc, [key]: this.getParameterByRef(parameter, enums, key) };
		}, {});

		const responses_ = Object.keys(responseContainer).reduce((acc, key) => {
			const response = responseContainer[key];
			return { ...acc, [key]: this.getResponseByRef(response) };
		}, {});

		const apis: Record<string, OperationObject[]> = {};
		for (const path of Object.keys(paths)) {
			let pathObject = paths[path] ?? {};

			if ((pathObject as { $ref?: string }).$ref) {
				const resolved = this.resolvePathRef(
					(pathObject as { $ref: string }).$ref
				);
				if (resolved) pathObject = resolved;
			}

			const { parameters = [] } = pathObject as { parameters?: unknown[] };
			const methodApis: OperationObject[] = [];

			Object.values(HttpMethods).forEach((method) => {
				const methodObject = (pathObject as Record<string, unknown>)[method];
				if (!methodObject) return;

				const {
					deprecated,
					operationId,
					summary: summary_,
					description: description_,
					responses,
				} = methodObject as {
					deprecated?: boolean;
					operationId?: string;
					summary?: string;
					description?: string;
					responses?: Record<string, unknown>;
				};
				const { parameters: parameters_ = [] } = methodObject as {
					parameters?: unknown[];
				};

				const baseParameters = [...parameters, ...parameters_].map((p) =>
					this.getParameterByRef(p, enums)
				);
				const uniqueParameterName = [
					...new Set(baseParameters.map((p) => p.name)),
				];

				// Clone to avoid mutating the input spec.
				const responsesClone: Record<string, unknown> = responses
					? { ...responses }
					: {};

				if (Object.keys(responsesClone).length === 0) {
					responsesClone[200] = { description: 'Successful response' };
				}

				const inBody = baseParameters.filter(
					(p) => p.in === 'body' || p.in === 'formData'
				);
				const notInBody = baseParameters.filter(
					(p) => p.in !== 'body' && p.in !== 'formData'
				);

				const httpCodes = Object.keys(responsesClone);
				for (const code of httpCodes) {
					if (code in responsesClone) {
						const response = responsesClone[code];
						const responseSchema = this.getResponseByRef(response);

						const inBodyOnlyHasBody =
							inBody.length === 1 &&
							inBody[0].in === 'body' &&
							inBody[0].name === 'body';

						methodApis.push({
							method,
							operationId,
							summary: summary_,
							deprecated: deprecated,
							description: description_,
							parameters: uniqueParameterName
								.map((name) => notInBody.find((p) => p.name === name))
								.filter((p): p is ParameterObject => p !== undefined),
							responses: responseSchema,
							requestBody:
								inBody.length > 0
									? inBodyOnlyHasBody
										? [
												{
													type: MediaTypes.JSON,
													schema: inBody[0].schema,
												},
											]
										: [
												{
													type: MediaTypes.JSON,
													schema: {
														type: 'object' as const,
														properties: inBody.reduce<
															Record<string, SchemaObject>
														>((a, p) => {
															return {
																...a,
																[p.name]: {
																	type: (p.schema?.type ??
																		'unknown') as 'object',
																	required: p.schema?.required,
																	items: (
																		p.schema as unknown as {
																			items?: SchemaObject;
																		}
																	)?.items,
																	description: p.schema?.description,
																} as SchemaObject,
															};
														}, {}),
													},
												},
											]
									: undefined,
						});
						break;
					}
				}
			});

			apis[path] = methodApis;
		}

		return {
			enums: Base.uniqueEnums(enums),
			schemas: schemas_ as Record<string, SchemaObject>,
			responses: responses_ as unknown as Record<
				string,
				import('../core/index.js').ResponsesObject
			>,
			parameters: parameters_ as Record<string, ParameterObject>,
			requestBodies: {} as unknown as Record<
				string,
				import('../core/index.js').RequestBodyObject
			>,
			apis: apis as Record<string, OperationObject[]>,
		};
	}
}
