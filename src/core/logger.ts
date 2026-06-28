const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const magenta = (s: string) => `\x1b[35m${s}\x1b[0m`;
const gray = (s: string) => `\x1b[90m${s}\x1b[0m`;
const bold = (s: string) => `\x1b[1m${s}\x1b[0m`;

export const logger = {
	success(msg: string): void {
		console.log(`${green('✓')} ${msg}`);
	},

	error(err: unknown, verbose = false): void {
		if (isApicodegenError(err)) {
			console.error(`${red('✗')} ${err.toString(verbose)}`);
		} else if (err instanceof Error) {
			const msg = `Error: ${err.message}`;
			console.error(
				`${red('✗')} ${msg}${verbose && err.stack ? `\n${gray(err.stack)}` : ''}`
			);
		} else {
			console.error(`${red('✗')} ${String(err)}`);
		}
	},

	info(msg: string): void {
		console.log(`${blue('ℹ')} ${msg}`);
	},

	warn(msg: string): void {
		console.log(`${yellow('⚠')} ${msg}`);
	},

	loading(msg: string): void {
		console.log(`${yellow('🔄')} ${msg}`);
	},

	watching(msg: string): void {
		console.log(`${magenta('⟳')} ${msg}`);
	},

	fileChange(filePath: string): void {
		console.log(`${yellow('↓')} ${filePath}`);
	},

	fileAdd(filePath: string): void {
		console.log(`${green('+')} ${filePath}`);
	},

	shutdown(): void {
		console.log(`\n${gray('👋 Shutting down...')}`);
	},

	divider(width = 50): void {
		console.log(`${bold(cyan('─'.repeat(width)))}`);
	},

	heading(text: string, mode: string, width = 50): void {
		console.log(`${bold(cyan('─'.repeat(width)))}`);
		console.log(`${bold(cyan(text))}`);
		console.log(`${gray('Mode:')} ${mode || 'unknown'}`);
		console.log(`${bold(cyan('─'.repeat(width)))}`);
	},

	item(label: string, color: 'green' | 'red' | 'yellow' = 'green'): void {
		const icon = color === 'green' ? '✓' : color === 'red' ? '✗' : '⚠';
		console.log(
			`${color === 'green' ? green(icon) : color === 'red' ? red(icon) : yellow(icon)} ${label}`
		);
	},

	summary(stats: {
		succeeded: number;
		failed: number;
		endpoints: number;
		schemas: number;
		duration: number;
	}): void {
		const { succeeded, failed, endpoints, schemas, duration } = stats;
		const label = `API Code Gen - Complete (${succeeded} succeeded${
			failed > 0 ? `, ${failed} failed` : ''
		}, ${endpoints} endpoints, ${schemas} schemas, ${duration}ms)`;
		if (failed === 0) {
			console.log(`${green('✓')} ${label}`);
		} else {
			console.log(`${yellow('⚠')} ${label}`);
		}
	},
};

import { isApicodegenError } from './errors.js';
