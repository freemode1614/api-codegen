import { isApicodegenError } from '../core/errors.js';

const cyan = (s: string) => `\x1b[36m${s}\x1b[0m`;
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;
const blue = (s: string) => `\x1b[34m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const magenta = (s: string) => `\x1b[35m${s}\x1b[0m`;
const gray = (s: string) => `\x1b[90m${s}\x1b[0m`;

export const logger = {
	banner(version: string): void {
		console.log(
			cyan(`

▄▄▄       ██▓███   ██▓ ▄████▄   ▒█████  ▓█████▄ ▓█████   ▄████ ▓█████  ███▄    █
▒████▄    ▓██░  ██▒▓██▒▒██▀ ▀█  ▒██▒  ██▒▒██▀ ██▌▓█   ▀  ██▒ ▀█▒▓█   ▀  ██ ▀█   █
▒██  ▀█▄  ▓██░ ██▓▒▒██▒▒▓█    ▄ ▒██░  ██▒░██   █▌▒███   ▒██░▄▄▄░▒███   ▓██  ▀█ ██▒
░██▄▄▄▄██ ▒██▄█▓▒ ▒░██░▒▓▓▄ ▄██▒▒██   ██░░▓█▄   ▌▒▓█  ▄ ░▓█  ██▓▒▓█  ▄ ▓██▒  ▐▌██▒
 ▓█   ▓██▒▒██▒ ░  ░░██░▒ ▓███▀ ░░ ████▓▒░░▒████▓ ░▒████▒░▒▓███▀▒░▒████▒▒██░   ▓██░
 ▒▒   ▓▒█░▒▓▒░ ░  ░░▓  ░ ░▒ ▒  ░░ ▒░▒░▒░  ▒▒▓  ▒ ░░ ▒░ ░ ░▒   ▒ ░░ ▒░ ░░ ▒░   ▒ ▒
  ▒   ▒▒ ░░▒ ░      ▒ ░  ░  ▒     ░ ▒ ▒░  ░ ▒  ▒  ░ ░  ░  ░   ░  ░ ░  ░░ ░░   ░ ▒░
  ░   ▒   ░░        ▒ ░░        ░ ░ ░ ▒   ░ ░  ░    ░   ░ ░   ░    ░      ░   ░ ░
      ░  ░          ░  ░ ░          ░ ░     ░       ░  ░      ░    ░  ░         ░
                       ░                  ░

API Code Generator v${version}
    `)
		);
	},

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
};
