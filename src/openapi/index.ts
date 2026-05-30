import { createScopedLogger } from '@moccona/logger';
import type { OpenAPI, OpenAPIV2, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import type { Adaptors, ProviderInitOptions, ProviderInitResult } from '@/core';
import {
	type Adapter,
	AxiosAdapter,
	Adaptors as ads,
	Base,
	FetchAdapter,
	Generator,
	Provider,
} from '@/core';

import { V2 } from './V2';
import { V3 } from './V3';
import { V3_1 } from './V3_1';

const logger = createScopedLogger('OpenAPI');

export enum OpenAPIVersion {
	v2 = 'v2',
	v3 = 'v3',
	v3_1 = 'v3_1',
	unknown = 'unknown',
}

function getDocVersion(doc: OpenAPI.Document) {
	const version = (
		(doc as OpenAPIV3.Document).openapi || (doc as OpenAPIV2.Document).swagger
	).slice(0, 3);

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
	switch (type) {
		case ads.axios:
			return new AxiosAdapter();
		default:
			return new FetchAdapter();
	}
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

	logger.info(`Fetch document from ${initOptions.docURL}`);

	const doc = await Base.fetchDoc(
		initOptions.docURL,
		initOptions.requestOptions
	);

	const provider = new OpenAPIProvider(initOptions, doc);
	const { enums, schemas, parameters, responses, requestBodies, apis } =
		provider;

	const adaptor = getAdaptor(initOptions.adaptor ?? ads.fetch);
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
		adaptor
	);

	if (initOptions.output) {
		await Generator.write(code, initOptions.output);
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

export type { ProviderInitOptions } from '@/core';
