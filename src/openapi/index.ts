import { readFile } from 'node:fs/promises';
import { createScopedLogger } from '@moccona/logger';
import type { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { resolveWriteFileHook } from '../core/hook-runner.js';
import type { ProviderInitOptions, ProviderInitResult } from '../core/index.js';
import {
	type Adapter,
	Adaptors,
	Base,
	createErrors,
	Generator,
	listAdapters,
	listProviders,
	Provider,
	resolveAdapter,
	resolveProvider,
} from '../core/index.js';
import { applyPlugins } from '../core/plugin-loader.js';

import { V2 } from './V2.js';
import { V3 } from './V3.js';
import { V3_1 } from './V3_1.js';

const logger = createScopedLogger('OpenAPI');

export enum OpenAPIVersion {
	v2 = 'v2',
	v3 = 'v3',
	v3_1 = 'v3_1',
	unknown = 'unknown',
}

function getDocVersion(doc: OpenAPI.Document) {
	const raw =
		(doc as OpenAPIV3.Document).openapi || (doc as OpenAPIV2.Document).swagger;

	if (typeof raw !== 'string' || raw.length === 0) {
		return OpenAPIVersion.unknown;
	}

	const version = raw.slice(0, 3);

	switch (version) {
		case '3.1':
			return OpenAPIVersion.v3_1;
		case '3.0':
			return OpenAPIVersion.v3;
		case '2.0':
			return OpenAPIVersion.v2;
		default:
			return OpenAPIVersion.unknown;
	}
}

export class OpenAPIProvider extends Provider {
	public parse(doc: OpenAPIV3.Document): ProviderInitResult {
		const version = getDocVersion(doc);

		logger.debug(`openapi version ${version}`);

		switch (version) {
			case OpenAPIVersion.v2:
				return new V2(doc as unknown as OpenAPIV2.Document).init();
			case OpenAPIVersion.v3:
				return new V3(doc as unknown as OpenAPIV3.Document).init();
			case OpenAPIVersion.v3_1:
				return new V3_1(doc as unknown as OpenAPIV3_1.Document).init();
			default:
				throw new Error(`Not a valid OpenAPI version: ${version}`);
		}
	}
}

function getAdaptor(type: keyof typeof Adaptors): Adapter {
	const spec = resolveAdapter(type);
	if (!spec) {
		throw new Error(
			`[apicodegen] Unknown adaptor "${type}". Registered adapters: ${listAdapters().join(', ')}`
		);
	}
	return spec.factory();
}

export interface CodeGenResult {
	code: string;
	stats: {
		endpoints: number;
		schemas: number;
		duration: number;
	};
}

export async function codeGen(
	initOptions: ProviderInitOptions
): Promise<CodeGenResult> {
	const startTime = Date.now();
	const { verbose } = initOptions;

	if (verbose) {
		logger.setLevel('debug');
	} else {
		logger.setLevel('info');
	}

	// Apply user plugins (PR1+PR2: adapter + provider registries; PR3:
	// hooks are also resolved from the same list below). Must run before
	// any adapter/provider lookup so a user plugin can register them in
	// time.
	const resolvedPlugins = await applyPlugins(initOptions.plugins);

	logger.info(`Fetch document from ${initOptions.docURL}`);

	const { transport, source } = Base.resolveSpecURL(initOptions.docURL);
	const doc =
		transport === 'file'
			? await (async () => {
					let raw: string;
					try {
						raw = await readFile(source, 'utf8');
					} catch (error) {
						if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') {
							throw createErrors.specNotFound(source, error as Error);
						}
						throw new Error(
							`Failed to read OpenAPI spec from ${source}: ${
								error instanceof Error ? error.message : String(error)
							}`
						);
					}
					try {
						return JSON.parse(raw) as unknown;
					} catch (error) {
						throw createErrors.specParseFailed(
							source,
							undefined,
							undefined,
							error as Error
						);
					}
				})()
			: await Base.fetchDoc(source, initOptions.requestOptions);

	const specFormat = initOptions.specFormat ?? 'openapi';
	const providerSpec = resolveProvider(specFormat);
	if (!providerSpec) {
		throw new Error(
			`[apicodegen] Unknown spec format "${specFormat}". Registered providers: ${listProviders().join(', ')}`
		);
	}
	const { enums, schemas, parameters, responses, requestBodies, apis } =
		await providerSpec.factory(
			{
				docURL: initOptions.docURL,
				baseURL: initOptions.baseURL ?? '',
				output: initOptions.output,
			},
			doc
		);

	const adaptor = getAdaptor(initOptions.adaptor ?? Adaptors.fetch);
	const code = await Generator.genCode(
		{
			enums,
			schemas,
			parameters,
			responses,
			requestBodies,
			apis,
		},
		initOptions,
		adaptor,
		resolvedPlugins
	);

	if (initOptions.output) {
		const writeHook = resolveWriteFileHook(resolvedPlugins);
		if (writeHook) {
			// Use the same freezing discipline as the other hook runners so
			// a plugin's writeFile hook cannot mutate upstream state.
			// `deepFreeze` deep-clones plain data and shallow-freezes class
			// instances (like `Adapter`); see `src/core/ctx-freeze.ts`.
			const { deepFreeze, freezeStatements } = await import(
				'../core/hook-runner.js'
			);
			await writeHook({
				initOptions: deepFreeze(initOptions) as ProviderInitOptions,
				schema: deepFreeze({
					enums,
					schemas,
					parameters,
					responses,
					requestBodies,
					apis,
				}) as ProviderInitResult,
				adapter: deepFreeze(adaptor) as Adapter,
				output: initOptions.output,
				statements: freezeStatements([]),
				code,
				kind: 'writeFile',
			});
		} else {
			await Generator.write(code, initOptions.output);
		}
	}

	const duration = Date.now() - startTime;
	const endpoints = Object.keys(apis).length;
	const schemasCount = Object.keys(schemas).length;

	return {
		code,
		stats: {
			endpoints,
			schemas: schemasCount,
			duration,
		},
	};
}

export type { ProviderInitOptions } from '../core/index.js';
