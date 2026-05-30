#!/bin/env node

import path from 'node:path';
import { createCommand } from 'commander';
import fs from 'fs-extra';
import type { Watchvest } from 'vite';
import { loadConfig, toProviderOptions } from '@/core/config';
import { isApicodegenError, wrapError } from '@/core/errors';
import { codeGen } from '@/openapi';

import { version } from '../package.json';
import { logger } from './cli/logger';

interface CLIOptions {
	spec?: string;
	output?: string;
	adaptor?: string;
	baseURL?: string;
	importClientSource?: string;
	watch?: boolean;
	verbose?: boolean;
}

async function watchAndGenerate(
	options: Parameters<typeof codeGen>[0]
): Promise<Watchvest> {
	const { createWatch } = await import('vite');
	let watcher: Awaited<ReturnType<typeof createWatch>> | null = null;

	const generate = async () => {
		try {
			const result = await codeGen(options);
			const { endpoints, schemas, duration } = result.stats;
			logger.success(
				`Regenerated ${options.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`
			);
		} catch (error) {
			logger.error(error, true);
		}
	};

	const patterns = [options.docURL].filter(Boolean) as string[];

	watcher = createWatch(patterns, {
		ignoreInitial: false,
		awaitWriteFinish: {
			stabilityThreshold: 500,
			pollInterval: 100,
		},
	});

	watcher.on('change', async (filePath) => {
		logger.fileChange(filePath);
		await generate();
	});

	watcher.on('add', async (filePath) => {
		logger.fileAdd(filePath);
		await generate();
	});

	return watcher;
}

function resolveDocURL(docURL: string, baseURL?: string): string {
	if (docURL.startsWith('http://') || docURL.startsWith('https://')) {
		return docURL;
	}

	if (docURL.startsWith('/') || docURL.match(/^[A-Za-z]:/)) {
		return `file://${docURL}`;
	}

	if (baseURL) {
		return new URL(docURL, baseURL).href;
	}

	return path.resolve(process.cwd(), docURL);
}

async function validateSpecPath(specPath: string): Promise<void> {
	if (specPath.startsWith('http://') || specPath.startsWith('https://')) {
		return;
	}

	const filePath = specPath.replace(/^file:\/\//, '');
	const absolutePath = path.isAbsolute(filePath)
		? filePath
		: path.resolve(process.cwd(), filePath);

	const exists = await fs.pathExists(absolutePath);
	if (!exists) {
		throw createErrors.specNotFound(absolutePath);
	}
}

function isRemoteURL(url: string): boolean {
	return url.startsWith('http://') || url.startsWith('https://');
}

const cli = createCommand('apicodegen');

cli
	.name('apicodegen')
	.version(version)
	.description('API code generation from OpenAPI specifications')
	.argument('[spec]', 'URL or path to OpenAPI documentation')
	.option('-s, --spec <path>', 'OpenAPI spec file path or URL')
	.option('-o, --output <path>', 'Output file path')
	.option('-a, --adaptor <type>', 'HTTP client adaptor (fetch|axios)', 'fetch')
	.option('-b, --baseURL <url>', 'Base URL for API endpoints')
	.option('-c, --config <path>', 'Path to config file')
	.option('-w, --watch', 'Watch for file changes and regenerate')
	.option('-v, --verbose', 'Enable verbose logging')
	.option('--importClientSource <path>', 'Custom client import source path')
	.action(async (specArg: string | undefined, options: CLIOptions) => {
		logger.banner(version);

		if (!specArg && !options.spec) {
			logger.info('Usage: apicodegen [options] [spec]');
			logger.info("Run 'apicodegen --help' for full options.");
			return;
		}

		const cliOptions: Record<string, unknown> = {};
		if (options.spec) cliOptions.spec = options.spec;
		if (options.output) cliOptions.output = options.output;
		if (options.adaptor) cliOptions.adaptor = options.adaptor;
		if (options.baseURL) cliOptions.baseURL = options.baseURL;
		if (options.verbose) cliOptions.verbose = options.verbose;
		if (options.watch) cliOptions.watch = options.watch;
		if (options.importClientSource)
			cliOptions.importClientSource = options.importClientSource;
		if (options.config) cliOptions.configFile = options.config;

		if (specArg) {
			cliOptions.spec = specArg;
		}

		try {
			const config = await loadConfig({
				cwd: process.cwd(),
				cliOptions,
			});

			await validateSpecPath(config.spec);

			const resolvedDocURL = resolveDocURL(config.spec, config.baseURL);

			const codeGenOptions = {
				...toProviderOptions(config),
				docURL: resolvedDocURL,
			};

			if (config.watch) {
				logger.watching('Watching for changes...');

				const watchPatterns: string[] = [];
				if (!resolvedDocURL.startsWith('http')) {
					const docPath = resolvedDocURL.replace(/^file:\/\//, '');
					const dir = path.dirname(docPath);
					watchPatterns.push(
						`${dir}/**/*.json`,
						`${dir}/**/*.yaml`,
						`${dir}/**/*.yml`
					);
				}

				const watcher = await watchAndGenerate(codeGenOptions);

				const shutdown = async () => {
					logger.shutdown();
					if (watcher) {
						await watcher.close();
					}
					process.exit(0);
				};

				process.on('SIGINT', shutdown);
				process.on('SIGTERM', shutdown);
			} else {
				if (isRemoteURL(resolvedDocURL)) {
					logger.loading(`Fetching spec from ${resolvedDocURL}...`);
				}
				const result = await codeGen(codeGenOptions);
				const { endpoints, schemas, duration } = result.stats;
				logger.success(
					`Generated ${config.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`
				);
			}
		} catch (error) {
			if (isApicodegenError(error)) {
				logger.error(error, options.verbose);
			} else {
				const wrapped = wrapError(error, {
					code: 'E_GENERATION_FAILED',
					message: 'An unexpected error occurred',
				});
				logger.error(wrapped, options.verbose);
			}
			process.exit(1);
		}
	});

cli.parse();
