#!/bin/env node
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let node_path = require("node:path");
node_path = __toESM(node_path, 1);
let fs_extra = require("fs-extra");
fs_extra = __toESM(fs_extra, 1);
let undici = require("undici");
let fs_promises = require("fs/promises");
let prettier = require("prettier");
let typescript = require("typescript");
let _moccona_logger = require("@moccona/logger");
let commander = require("commander");
//#region src/core/errors.ts
/**
* Error handling utilities for api-codegen
*/
const ErrorCodes = {
	SPEC_NOT_FOUND: "E_SPEC_NOT_FOUND",
	SPEC_FETCH_FAILED: "E_SPEC_FETCH_FAILED",
	SPEC_PARSE_FAILED: "E_SPEC_PARSE_FAILED",
	OUTPUT_DIR_MISSING: "E_OUTPUT_DIR_MISSING",
	CONFIG_INVALID: "E_CONFIG_INVALID",
	VALIDATION_FAILED: "E_VALIDATION_FAILED",
	GENERATION_FAILED: "E_GENERATION_FAILED",
	TYPE_CHECK_FAILED: "E_TYPE_CHECK_FAILED"
};
/**
* Custom error class for api-codegen with rich context
*/
var ApicodegenError = class ApicodegenError extends Error {
	code;
	location;
	line;
	column;
	path;
	suggestions;
	cause;
	constructor(context) {
		super(context.message);
		this.name = "ApicodegenError";
		this.code = context.code;
		this.location = context.location;
		this.line = context.line;
		this.column = context.column;
		this.path = context.path;
		this.suggestions = context.suggestions || [];
		this.cause = context.cause;
		if (Error.captureStackTrace) Error.captureStackTrace(this, ApicodegenError);
	}
	/**
	* Convert error to formatted string for CLI output
	*/
	toString(verbose = false) {
		const lines = [];
		lines.push(`\x1b[1;31mError [${this.code}]\x1b[0m ${this.message}`);
		if (this.location) lines.push(`  \x1b[36m→ Location:\x1b[0m ${this.location}`);
		if (this.path) lines.push(`  \x1b[36m→ Path:\x1b[0m ${this.path}`);
		if (this.line !== void 0) {
			let lineInfo = `  \x1b[36m→ Line:\x1b[0m ${this.line}`;
			if (this.column !== void 0) lineInfo += `, Column: ${this.column}`;
			lines.push(lineInfo);
		}
		if (this.suggestions.length > 0) for (const suggestion of this.suggestions) lines.push(`  \x1b[32m→ Suggestion:\x1b[0m ${suggestion}`);
		if (verbose && this.cause) {
			lines.push(`\n  \x1b[90mOriginal Error:\x1b[0m ${this.cause.message}`);
			if (this.stack) {
				const stackLines = this.stack.split("\n").slice(1).join("\n");
				lines.push(`\x1b[90m${stackLines}\x1b[0m`);
			}
		}
		return lines.join("\n");
	}
	/**
	* Convert to JSON-serializable object
	*/
	toJSON() {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			location: this.location,
			line: this.line,
			column: this.column,
			path: this.path,
			suggestions: this.suggestions,
			cause: this.cause?.message
		};
	}
};
/**
* ANSI color codes for terminal output
*/
const Colors = {
	reset: "\x1B[0m",
	bold: "\x1B[1m",
	red: "\x1B[31m",
	green: "\x1B[32m",
	yellow: "\x1B[33m",
	blue: "\x1B[34m",
	cyan: "\x1B[36m",
	gray: "\x1B[90m",
	brightRed: "\x1B[91m",
	brightGreen: "\x1B[92m"
};
/**
* Format error for CLI output
*/
function formatError(error, verbose = false) {
	if (error instanceof ApicodegenError) return error.toString(verbose);
	if (error instanceof Error) return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${error.message}${verbose && error.stack ? `\n\n${Colors.gray}${error.stack}${Colors.reset}` : ""}`;
	return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${String(error)}`;
}
/**
* Create error with common patterns
*/
const createErrors = {
	specNotFound(path, cause) {
		return new ApicodegenError({
			code: ErrorCodes.SPEC_NOT_FOUND,
			message: "OpenAPI spec file not found",
			location: path,
			suggestions: [
				"Check if the file exists using 'ls -la'",
				"Use --spec to provide the correct path",
				"For remote specs, ensure the URL is accessible"
			],
			cause
		});
	},
	specFetchFailed(url, statusCode, cause) {
		const message = statusCode ? `Failed to fetch OpenAPI spec (HTTP ${statusCode})` : "Failed to fetch OpenAPI spec from URL";
		return new ApicodegenError({
			code: ErrorCodes.SPEC_FETCH_FAILED,
			message,
			location: url,
			suggestions: [
				"Check if the URL is accessible in a browser",
				"Download the spec file locally and use the local path",
				"Verify CORS settings if fetching from a different origin"
			],
			cause
		});
	},
	specParseFailed(path, line, column, cause) {
		return new ApicodegenError({
			code: ErrorCodes.SPEC_PARSE_FAILED,
			message: "Failed to parse OpenAPI spec (invalid JSON or YAML)",
			location: path,
			line,
			column,
			suggestions: [
				"Validate JSON syntax using jsonlint.com",
				"For YAML specs, ensure proper indentation",
				"Check for trailing commas or unquoted special characters"
			],
			cause
		});
	},
	outputDirMissing(path, cause) {
		return new ApicodegenError({
			code: ErrorCodes.OUTPUT_DIR_MISSING,
			message: "Output directory does not exist",
			location: path,
			suggestions: ["Create the directory: mkdir -p $(dirname <output>)", "Check if the path is correct"],
			cause
		});
	},
	configInvalid(path, cause) {
		return new ApicodegenError({
			code: ErrorCodes.CONFIG_INVALID,
			message: "Invalid configuration file",
			location: path,
			suggestions: ["Validate JSON syntax in the config file", "Check for required fields (spec, output)"],
			cause
		});
	},
	validationFailed(path, details, cause) {
		return new ApicodegenError({
			code: ErrorCodes.VALIDATION_FAILED,
			message: "OpenAPI spec validation failed",
			location: path,
			path: details,
			suggestions: [
				"Check OpenAPI spec structure at the specified path",
				"Ensure all required fields are present",
				"Validate using swagger.io editor"
			],
			cause
		});
	},
	generationFailed(cause) {
		return new ApicodegenError({
			code: ErrorCodes.GENERATION_FAILED,
			message: "Code generation failed",
			suggestions: [
				"Check for unsupported OpenAPI features",
				"Ensure spec follows OpenAPI 2.0, 3.0, or 3.1 specification",
				"Use --verbose for more details"
			],
			cause
		});
	},
	typeCheckFailed(path, errors, cause) {
		return new ApicodegenError({
			code: ErrorCodes.TYPE_CHECK_FAILED,
			message: "TypeScript type check failed",
			location: path,
			suggestions: [
				"Review type errors above",
				"Check for schema inconsistencies",
				"Update generated types or fix source schema"
			],
			cause
		});
	},
	missingRequiredField(field, context) {
		return new ApicodegenError({
			code: ErrorCodes.VALIDATION_FAILED,
			message: `Missing required field: ${field}`,
			path: context,
			suggestions: [`Add the '${field}' field to your configuration`]
		});
	}
};
/**
* Wrap unknown error in ApicodegenError if needed
*/
function wrapError(error, context) {
	if (error instanceof ApicodegenError) return error;
	if (error instanceof Error) return new ApicodegenError({
		code: context?.code || ErrorCodes.GENERATION_FAILED,
		message: context?.message || error.message,
		location: context?.location,
		suggestions: context?.suggestions,
		cause: error
	});
	return new ApicodegenError({
		code: context?.code || ErrorCodes.GENERATION_FAILED,
		message: String(error),
		suggestions: context?.suggestions
	});
}
/**
* Check if error is an ApicodegenError
*/
function isApicodegenError(error) {
	return error instanceof ApicodegenError;
}
//#endregion
//#region src/core/config.ts
/**
* Environment variable mappings
*/
const ENV_MAPPINGS = {
	APICODEGEN_SPEC: "spec",
	APICODEGEN_OUTPUT: "output",
	APICODEGEN_BASE_URL: "baseURL",
	APICODEGEN_ADAPTOR: "adaptor",
	APICODEGEN_VERBOSE: "verbose",
	APICODEGEN_WATCH: "watch",
	APICODEGEN_TYPE_CHECK: "typeCheck"
};
/**
* Load config from environment variables
*/
function loadFromEnv() {
	const config = {};
	for (const [envKey, configKey] of Object.entries(ENV_MAPPINGS)) {
		const value = process.env[envKey];
		if (value !== void 0) switch (configKey) {
			case "verbose":
			case "watch":
			case "typeCheck":
				config[configKey] = value === "true" || value === "1";
				break;
			case "adaptor":
				config[configKey] = value;
				break;
			default: config[configKey] = value;
		}
	}
	return config;
}
/**
* Load config from a file
*/
async function loadFromFile(filePath) {
	const ext = node_path.default.extname(filePath).toLowerCase();
	try {
		if (ext === ".json" || ext === ".jsonc") {
			const content = await fs_extra.default.readFile(filePath, "utf-8");
			return JSON.parse(content);
		}
		if (ext === ".js" || ext === ".cjs" || ext === ".mjs") {
			const mod = await import(filePath);
			return mod.default || mod;
		}
		if (ext === ".ts") {
			const content = await fs_extra.default.readFile(filePath, "utf-8");
			try {
				return JSON.parse(content);
			} catch {
				const jsonMatch = content.match(/export\s+default\s+(\{.+\})/s);
				if (jsonMatch) return JSON.parse(jsonMatch[1]);
			}
		}
		const content = await fs_extra.default.readFile(filePath, "utf-8");
		return JSON.parse(content);
	} catch (error) {
		throw new Error(`Failed to load config from ${filePath}: ${error}`);
	}
}
/**
* Find config file in project root
*/
async function findConfigFile(cwd) {
	for (const fileName of [
		"apicodegen.config.json",
		"apicodegen.config.js",
		"apicodegen.config.mjs",
		".apicodegenrc",
		".apicodegenrc.json",
		".apicodegenrc.js",
		".apicodegenrc.mjs"
	]) {
		const filePath = node_path.default.join(cwd, fileName);
		if (await fs_extra.default.pathExists(filePath)) return filePath;
	}
	const packageJsonPath = node_path.default.join(cwd, "package.json");
	if (await fs_extra.default.pathExists(packageJsonPath)) try {
		const pkg = JSON.parse(await fs_extra.default.readFile(packageJsonPath, "utf-8"));
		if (pkg.apicodegen && typeof pkg.apicodegen === "string") return node_path.default.resolve(cwd, pkg.apicodegen);
	} catch {}
	return null;
}
/**
* Merge multiple config sources with priority
* Priority: defaults < env vars < config file < CLI args
*/
function mergeConfigs(base, ...sources) {
	const result = { ...base };
	for (const source of sources) {
		if (!source) continue;
		for (const [key, value] of Object.entries(source)) if (value !== void 0) result[key] = value;
	}
	return result;
}
/**
* Validate config has required fields
*/
function validateConfig(config) {
	if (!config.spec) throw new Error("Missing required field: spec (OpenAPI spec file path or URL)");
	return true;
}
/**
* Load and resolve config from multiple sources
*/
async function loadConfig(options = {}) {
	const cwd = options.cwd || process.cwd();
	const cliOptions = options.cliOptions || {};
	const envConfig = loadFromEnv();
	let fileConfig = {};
	let configFilePath;
	if (options.configFile) {
		configFilePath = node_path.default.resolve(cwd, options.configFile);
		fileConfig = await loadFromFile(configFilePath);
	} else {
		const foundPath = await findConfigFile(cwd);
		if (foundPath) {
			configFilePath = foundPath;
			fileConfig = await loadFromFile(foundPath);
		}
	}
	const packageJsonPath = node_path.default.join(cwd, "package.json");
	let inlineConfig = {};
	if (await fs_extra.default.pathExists(packageJsonPath)) try {
		const pkg = JSON.parse(await fs_extra.default.readFile(packageJsonPath, "utf-8"));
		if (pkg.apicodegen && typeof pkg.apicodegen === "object") inlineConfig = pkg.apicodegen;
	} catch {}
	const merged = mergeConfigs({
		spec: "",
		output: "./output.ts"
	}, envConfig, inlineConfig, fileConfig, cliOptions);
	validateConfig(merged);
	const name = options.name || merged.baseURL || merged.spec;
	return {
		...merged,
		configFilePath,
		name
	};
}
/**
* Convert resolved config to provider options format
*/
function toProviderOptions(config) {
	return {
		docURL: config.spec,
		output: config.output,
		adaptor: config.adaptor,
		baseURL: config.baseURL,
		importClientSource: config.importClientSource,
		verbose: config.verbose,
		requestOptions: config.requestOptions
	};
}
//#endregion
//#region src/core/base/Adaptor.ts
/**
* Base adapter for tool
* This abstract class serves as the foundation for implementing adapters for different code generation tools
*/
var Adapter = class {};
//#endregion
//#region src/core/constants/keywords.ts
const typescriptKeywords = new Set([
	"break",
	"case",
	"catch",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"else",
	"enum",
	"export",
	"extends",
	"false",
	"finally",
	"for",
	"function",
	"if",
	"import",
	"in",
	"instanceof",
	"new",
	"null",
	"return",
	"super",
	"switch",
	"this",
	"throw",
	"true",
	"try",
	"typeof",
	"var",
	"void",
	"while",
	"with",
	"as",
	"implements",
	"interface",
	"let",
	"package",
	"private",
	"protected",
	"public",
	"static",
	"yield",
	"abstract",
	"any",
	"async",
	"await",
	"constructor",
	"declare",
	"from",
	"get",
	"is",
	"module",
	"namespace",
	"never",
	"require",
	"set",
	"type",
	"unknown",
	"readonly",
	"of",
	"asserts",
	"infer",
	"keyof",
	"boolean",
	"number",
	"string",
	"symbol",
	"object",
	"undefined",
	"bigint"
]);
//#endregion
//#region src/core/interface.ts
let MediaTypes = /* @__PURE__ */ function(MediaTypes) {
	MediaTypes["JSON"] = "application/json";
	MediaTypes["TEXT"] = "text";
	MediaTypes["IMAGE"] = "image";
	MediaTypes["AUDIO"] = "audio";
	MediaTypes["VIDEO"] = "video";
	return MediaTypes;
}({});
let HttpMethods = /* @__PURE__ */ function(HttpMethods) {
	HttpMethods["GET"] = "get";
	HttpMethods["PUT"] = "put";
	HttpMethods["POST"] = "post";
	HttpMethods["DELETE"] = "delete";
	HttpMethods["OPTIONS"] = "options";
	HttpMethods["HEAD"] = "head";
	HttpMethods["PATCH"] = "patch";
	HttpMethods["TRACE"] = "trace";
	return HttpMethods;
}({});
//#endregion
//#region src/core/base/Base.ts
/**
* @file Base class implementation
* @author wp.l
* @description Base utility class providing common methods for code generation and API handling
*/
/**
* Base abstract class providing common utility methods.
*/
var Base = class Base {
	constructor() {
		if (new.target === Base) throw new Error("Cannot instantiate abstract class");
	}
	/**
	* Converts a reference string to a meaningful name.
	* @param ref - The reference string to process.
	* @param [doc] - Optional document reference for context.
	* @returns - The processed name.
	*/
	static ref2name(ref, doc) {
		const paths = ref.replace(/^#/, "").split("/").filter(Boolean);
		if (!doc) return paths.slice(-1)[0];
		let temporary = doc;
		let lastPath = "";
		for (const path of paths) {
			const adjustedPath = path.replaceAll("~1", "/");
			temporary = temporary[adjustedPath];
			lastPath = adjustedPath;
		}
		if (!temporary) return "unknown";
		return temporary.$ref ? Base.ref2name(temporary.$ref, doc) : lastPath;
	}
	/**
	* Converts an API path to a function name.
	* @param path - The API endpoint path.
	* @param [method] - The HTTP method (e.g., GET, POST).
	* @param [operationId] - Unique identifier for the operation.
	* @returns - The generated function name.
	*/
	static pathToFnName(path, method, _operationId = "") {
		return Base.normalize(Base.camelCase(Base.normalize(path))) + (method ? Base.capitalize(Base.upperCamelCase(`using_${method}`)) : "");
	}
	/**
	* Normalizes a string by replacing special characters and avoiding TypeScript keywords.
	* @param text - Input text to normalize.
	* @returns - The normalized string.
	*/
	static normalize(text) {
		if (typescriptKeywords.has(text)) text += "_";
		return text.replace(/[/\-_{}():\s`,*<>$#.]/gm, "_").replace(/^\d./gm, "").replaceAll("...", "");
	}
	/**
	* Capitalizes the first character of a string.
	* @param text - Input string.
	* @returns - Capitalized string.
	*/
	static capitalize(text) {
		text = text.trim();
		return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
	}
	/**
	* Converts a string to camelCase.
	* @param text - Input string.
	* @returns - CamelCase string.
	*/
	static camelCase(text) {
		text = text.trim();
		return text.split("_").filter(Boolean).map((t, index) => index === 0 ? t : Base.capitalize(t)).join("");
	}
	/**
	* Converts a string to UpperCamelCase.
	* @param text - Input string.
	* @returns - UpperCamelCase string.
	*/
	static upperCamelCase(text) {
		return Base.normalize(text).replaceAll("...", "").split("_").filter(Boolean).map(Base.capitalize).join("");
	}
	/**
	* Fetches documentation from a given URL.
	* @param url - The URL to fetch the documentation from.
	* @param requestInit - Additional request parameters.
	* @returns - A promise resolving to the fetched documentation data.
	*/
	static async fetchDoc(url, requestInit = {}) {
		const { body, statusCode } = await (0, undici.request)(url, {
			method: "GET",
			dispatcher: new undici.Agent({ connect: { rejectUnauthorized: false } }),
			...requestInit
		});
		if (statusCode >= 400) throw new Error(`Failed to fetch OpenAPI documentation from ${url}: HTTP ${statusCode}`);
		try {
			return body.json();
		} catch (error) {
			throw new Error(`Failed to parse JSON response from ${url}: ${error instanceof Error ? error.message : String(error)}`);
		}
	}
	/**
	* Determines the media type from a given media type string.
	* @param mediaType - The media type string to evaluate.
	* @returns - The matched MediaTypes or null.
	*/
	static getMediaType(mediaType) {
		return Object.values(MediaTypes).find((type) => mediaType.includes(type));
	}
	/**
	* Checks if a schema is a valid enum type that isn't boolean.
	* @param a - The schema object to evaluate.
	* @returns - True if the schema is a valid non-boolean enum.
	*/
	static isValidEnumType(a) {
		return a.type !== "boolean" && !Base.isBooleanEnum(a);
	}
	/**
	* Checks if a schema represents a boolean enum.
	* @param a - The schema object to evaluate.
	* @returns - True if the schema is a boolean enum.
	*/
	static isBooleanEnum(a) {
		return a.type === "boolean" || !!a.enum?.some((member) => typeof member === "boolean");
	}
	/**
	* Checks if two enum schemas are identical.
	* @param a - First enum schema to compare.
	* @param b - Second enum schema to compare.
	* @returns - True if the enums are identical.
	*/
	static isSameEnum(a, b) {
		return a.enum.length === b.enum.length && a.enum.sort().every((v, index) => v === b.enum.sort()[index]);
	}
	/**
	* Filters out duplicate enum schemas from an array.
	* @param enums - Array of enum schemas to process.
	* @returns - Array of unique enum schemas.
	*/
	static uniqueEnums(enums) {
		const enumMap = /* @__PURE__ */ new Map();
		for (const e of enums) {
			const existing = enumMap.get(e.name);
			if (existing) for (const value of e.enum) existing.add(value);
			else enumMap.set(e.name, new Set(e.enum));
		}
		return Array.from(enumMap.entries()).map(([name, values]) => ({
			name,
			enum: Array.from(values)
		}));
	}
	/**
	* Finds the first occurrence of a matching enum schema in an array.
	* @param a - The enum schema to find.
	* @param enums - Array of enum schemas to search.
	* @returns - The found schema or undefined.
	*/
	static findSameSchema(a, enums) {
		return enums.find((b) => Base.isSameEnum(b, a));
	}
	/**
	* Checks if an object is a reference object.
	* @param schema - The object to check.
	* @returns - True if the object is a reference.
	*/
	static isRef(schema) {
		return typeof schema === "object" && schema !== null && "$ref" in schema && typeof schema.$ref === "string";
	}
};
//#endregion
//#region src/core/base/Provider.ts
/**
* Abstract Provider Class.
*
* The Provider class is designed to be extended by specific implementations (e.g., OpenAPI 2 provider, OpenAPI 3 provider).
* It handles the initialization of the provider and the parsing of documentation into structured data.
*
* @example
*
* ```ts
* /// Example of how this class might be used by a subclass:
* class OpenAPIProvider extends Provider {
*   /// Implement the parse method to handle OpenAPI-specific documentation parsing.
*   parse(doc: unknown): ProviderInitResult {
*     /// Implementation details...
*   }
* }
*
* /// Initializing a provider with configuration and documentation data:
* const initOptions: ProviderInitOptions = {
*   docURL: "https://example.com/api/swagger.json",
*   baseURL: "https://api.example.com",
*   output: "./generated",
*   requestOptions: {
*     headers: { "Content-Type": "application/json" },
*   },
*   importClientSource: "generated/client",
* };
*
* const docData = fetchSwaggerDoc();
* const provider = new OpenAPIProvider(initOptions, docData);
* ```
*/
var Provider = class {
	/** collection of enum schemas */
	enums = [];
	/** collection of schemas indexed by name */
	schemas = {};
	/** collection of parameters indexed by name */
	parameters = {};
	/** collection of API responses indexed by name */
	responses = {};
	/** collection of request bodies indexed by name */
	requestBodies = {};
	/** collection of API endpoints (operations) indexed by path */
	apis = {};
	/** URL for fetching API documentation */
	docURL;
	/** base URL for API endpoints */
	baseURL;
	/** output directory for generated code */
	output;
	/** request options for API documentation fetch */
	requestOptions;
	/** source path for imported client */
	importClientSource;
	/**
	* Provider Constructor.
	* @param {ProviderInitOptions} initOptions - Initial configuration for the provider.
	* @param {unknown} doc - Raw API documentation data to be parsed.
	*/
	constructor(initOptions, doc) {
		this.docURL = initOptions.docURL;
		this.baseURL = initOptions.baseURL ?? "";
		this.output = initOptions.output ?? ".";
		this.requestOptions = initOptions.requestOptions ?? {};
		this.importClientSource = initOptions.importClientSource ?? "";
		const { enums, schemas, requestBodies, responses, parameters, apis } = this.parse(doc);
		this.enums = enums;
		this.schemas = schemas;
		this.responses = responses;
		this.parameters = parameters;
		this.requestBodies = requestBodies;
		this.apis = apis;
	}
};
//#endregion
//#region src/core/generator/index.ts
var Generator = class Generator {
	/**
	* Converts an array of TypeScript statements into a formatted string of code.
	*
	* @param statements - The array of TypeScript statement nodes.
	* @returns Formatted code as a string.
	* @throws {Error} If no valid statements are provided.
	*/
	static toCode(statements) {
		if (statements.length === 0) return "// No api declaration found.";
		const sourceFile = typescript.factory.createSourceFile(statements, typescript.factory.createToken(typescript.SyntaxKind.EndOfFileToken), typescript.NodeFlags.None);
		return (0, typescript.createPrinter)().printFile(sourceFile);
	}
	static async write(code, filepath) {
		try {
			await (0, fs_promises.writeFile)(filepath, code);
		} catch (error) {
			console.error(error);
		}
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
	static toUrlTemplate(path, parameters, basePath = "") {
		const queryParameters = parameters.filter((p) => p.in === "query");
		if (queryParameters.length > 0) {
			const queryString = queryParameters.map((qp, index) => `${index === 0 ? "?" : "&"}${encodeURIComponent(qp.name)}={${Base.camelCase(Base.normalize(qp.name))}}`).join("");
			path += queryString;
		}
		const pathSegments = path.replaceAll("{", "${").split("$").filter(Boolean);
		if (pathSegments.length === 1) return typescript.factory.createNoSubstitutionTemplateLiteral(basePath + path);
		return typescript.factory.createTemplateExpression(typescript.factory.createTemplateHead(basePath + pathSegments[0]), pathSegments.slice(1).map((segment, index) => {
			const match = /^{(.+)}(.+)?/gm.exec(segment);
			const isLastSegment = index === pathSegments.length - 2;
			if (!match) throw new Error(`Invalid path segment: ${segment}`);
			return typescript.factory.createTemplateSpan(typescript.factory.createIdentifier(match[1]), !isLastSegment ? typescript.factory.createTemplateMiddle(match[2]) : typescript.factory.createTemplateTail(match[2] || ""));
		}));
	}
	/**
	* Adds synthetic comments to a TypeScript AST node.
	*
	* @param node - The target AST node.
	* @param comments - Array of comment objects to add.
	*/
	static addComments(node, comments) {
		if (!Array.isArray(comments) || comments.filter(Boolean).length === 0) return;
		const formatComment = (comment) => {
			return comment.tag ? ` @${comment.tag} ${comment.comment ?? ""}` : ` ${comment.comment}`;
		};
		const formattedComments = "*\n" + comments.map(formatComment).join("\n").trim() + "\n";
		(0, typescript.addSyntheticLeadingComment)(node, typescript.SyntaxKind.MultiLineCommentTrivia, formattedComments, true);
	}
	/**
	* Checks if a schema represents a binary type.
	*
	* @param schema - The schema object to check.
	* @returns true if the schema is a binary type, false otherwise.
	*/
	static isBinarySchema(schema) {
		if (schema.type === "array") {
			const arraySchema = schema;
			return Generator.isBinarySchema(arraySchema.items);
		}
		const nonArraySchema = schema;
		return nonArraySchema.format === "blob" || nonArraySchema.format === "binary" || nonArraySchema.type === "file";
	}
	static toRequestBodyTypeNode(schema) {
		return typescript.factory.createParameterDeclaration(void 0, void 0, typescript.factory.createIdentifier("req"), void 0, Generator.toTypeNode(schema));
	}
	static toTypeNode(schema) {
		const { type, ref } = schema;
		if (ref) {
			const identify = Base.ref2name(ref);
			return typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier(identify === "unknown" ? identify : Base.upperCamelCase(identify)));
		}
		switch (type) {
			case "array": {
				const { items } = schema;
				return typescript.factory.createArrayTypeNode(Generator.toTypeNode(items));
			}
			case "object": {
				const propsCount = Object.keys(schema.properties ?? {}).length;
				if (!schema.properties || propsCount === 0) return typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier("Record"), [typescript.factory.createToken(typescript.SyntaxKind.StringKeyword), typescript.factory.createToken(typescript.SyntaxKind.UnknownKeyword)]);
				const props = Object.keys(schema.properties);
				return typescript.factory.createTypeLiteralNode(props.map((propKey) => {
					const propSchema = schema.properties[propKey];
					return typescript.factory.createPropertySignature(void 0, typescript.factory.createStringLiteral(propKey), schema.required || schema.ref || Generator.isBinarySchema(schema) ? void 0 : typescript.factory.createToken(typescript.SyntaxKind.QuestionToken), Generator.toTypeNode(propSchema));
				}));
			}
			case "integer":
			case "number":
				if (schema.enum) return typescript.factory.createUnionTypeNode(schema.enum.map((e) => typescript.factory.createLiteralTypeNode(typescript.factory.createNumericLiteral(e))));
				return typescript.factory.createToken(typescript.SyntaxKind.NumberKeyword);
			case "boolean": return typescript.factory.createToken(typescript.SyntaxKind.BooleanKeyword);
			case "file": return typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier("Blob"));
			default: {
				const { format, oneOf, allOf, anyOf, type, enum: enum_ } = schema;
				switch (format) {
					case "number": return typescript.factory.createToken(typescript.SyntaxKind.NumberKeyword);
					case "string": return typescript.factory.createToken(typescript.SyntaxKind.StringKeyword);
					case "boolean": return typescript.factory.createToken(typescript.SyntaxKind.BooleanKeyword);
					case "blob":
					case "binary": return typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier("Blob"));
					default:
				}
				if (enum_) return typescript.factory.createUnionTypeNode(enum_.map((e) => typescript.factory.createLiteralTypeNode(typescript.factory.createStringLiteral(e))));
				if (type === "string") return typescript.factory.createToken(typescript.SyntaxKind.StringKeyword);
				if (oneOf) return typescript.factory.createUnionTypeNode(oneOf.map((schema) => Generator.toTypeNode(schema)));
				if (anyOf) return typescript.factory.createUnionTypeNode(anyOf.map((schema) => Generator.toTypeNode(schema)));
				if (allOf) return typescript.factory.createIntersectionTypeNode(allOf.map((schema) => Generator.toTypeNode(schema)));
				if (type && typeof type === "string") return typescript.factory.createTypeReferenceNode(type !== "unknown" && type !== "null" ? typescript.factory.createIdentifier(Base.upperCamelCase(type)) : type);
			}
		}
		return typescript.factory.createToken(typescript.SyntaxKind.UnknownKeyword);
	}
	static toDeclarationNodes(parameters) {
		const objectElements = [];
		const typeObjectElements = [];
		const refParameters = [];
		for (const parameter of parameters) if (parameter.ref) {
			const refName = Base.ref2name(parameter.ref);
			refParameters.push(typescript.factory.createParameterDeclaration(void 0, void 0, typescript.factory.createIdentifier(Base.camelCase(Base.normalize(refName))), void 0, typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier(Base.upperCamelCase(Base.normalize(refName)))), void 0));
		} else {
			const { name, schema, required } = parameter;
			objectElements.push(typescript.factory.createBindingElement(void 0, void 0, typescript.factory.createIdentifier(Base.camelCase(Base.normalize(name)))));
			typeObjectElements.push(typescript.factory.createPropertySignature([], typescript.factory.createIdentifier(Base.camelCase(Base.normalize(name))), required ? void 0 : typescript.factory.createToken(typescript.SyntaxKind.QuestionToken), !schema ? typescript.factory.createToken(typescript.SyntaxKind.UnknownKeyword) : Generator.toTypeNode(schema)));
		}
		if (objectElements.length > 0) return [typescript.factory.createParameterDeclaration(void 0, void 0, typescript.factory.createObjectBindingPattern(objectElements), void 0, typescript.factory.createTypeLiteralNode(typeObjectElements), void 0), ...refParameters];
		return refParameters;
	}
	static toFormDataStatement(parameters, requestBody) {
		const statements = [];
		const fdDeclaration = typescript.factory.createVariableStatement(void 0, typescript.factory.createVariableDeclarationList([typescript.factory.createVariableDeclaration(typescript.factory.createIdentifier("fd"), void 0, void 0, typescript.factory.createNewExpression(typescript.factory.createIdentifier("FormData"), void 0, []))], typescript.NodeFlags.Const));
		statements.push(fdDeclaration);
		parameters.forEach((parameter) => {
			statements.push(typescript.factory.createExpressionStatement(typescript.factory.createBinaryExpression(typescript.factory.createIdentifier(parameter.name), typescript.factory.createToken(typescript.SyntaxKind.AmpersandAmpersandToken), typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("fd"), typescript.factory.createIdentifier("append")), void 0, [typescript.factory.createStringLiteral(parameter.name), typescript.factory.createIdentifier(parameter.name)]))));
		});
		if (requestBody && requestBody.type === "object" && requestBody.properties && Object.keys(requestBody.properties).length !== 0) Object.keys(requestBody.properties).forEach((key) => {
			const schemaByKey = requestBody.properties[key];
			if (schemaByKey.type === "array" && Generator.isBinarySchema(schemaByKey)) statements.push(typescript.factory.createForOfStatement(void 0, typescript.factory.createVariableDeclarationList([typescript.factory.createVariableDeclaration("file")], typescript.NodeFlags.Const), typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key)), typescript.factory.createBlock([typescript.factory.createExpressionStatement(typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("fd"), typescript.factory.createIdentifier("append")), [], [
				typescript.factory.createStringLiteral(key),
				typescript.factory.createIdentifier("file"),
				typescript.factory.createPropertyAccessExpression(typescript.factory.createAsExpression(typescript.factory.createIdentifier("file"), typescript.factory.createTypeReferenceNode(typescript.factory.createIdentifier("File"), void 0)), typescript.factory.createIdentifier("name"))
			]))])));
			else if (schemaByKey.required) statements.push(typescript.factory.createExpressionStatement(typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("fd"), typescript.factory.createIdentifier("append")), void 0, [typescript.factory.createStringLiteral(key), schemaByKey.type === "string" ? typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key)) : typescript.factory.createCallExpression(typescript.factory.createIdentifier("String"), void 0, [typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key))])])));
			else statements.push(typescript.factory.createExpressionStatement(typescript.factory.createBinaryExpression(typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key)), typescript.factory.createToken(typescript.SyntaxKind.AmpersandAmpersandToken), typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("fd"), typescript.factory.createIdentifier("append")), void 0, [typescript.factory.createStringLiteral(key), schemaByKey.type === "string" ? typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key)) : typescript.factory.createCallExpression(typescript.factory.createIdentifier("String"), void 0, [typescript.factory.createElementAccessExpression(typescript.factory.createIdentifier("req"), typescript.factory.createStringLiteral(key))])]))));
		});
		return statements;
	}
	static bodyBlock(uri, method, parameters, requestBody, response, adapter) {
		const isFormDataRequest = requestBody && ["multipart/form-data", "application/x-www-form-urlencoded"].includes(requestBody.type);
		const shouldParseResponseToJSON = "application/json" === response?.type;
		const isRequestBodyBinary = requestBody?.schema && requestBody.schema.type === "array" && Generator.isBinarySchema(requestBody.schema);
		const parametersShouldPutInFormData = parameters.filter((p) => p.in === "formData" || p.schema && Generator.isBinarySchema(p.schema));
		const parametersShouldNotPutInFormData = parameters.filter((p) => !parametersShouldPutInFormData.includes(p));
		const isRequestBodyContainsBinary = requestBody?.schema && "properties" in requestBody.schema && Object.values(requestBody.schema?.properties ?? {}).some((p) => Generator.isBinarySchema(p));
		const hasBinaryInParameters = parameters.some((p) => p?.schema && Generator.isBinarySchema(p.schema));
		const shouldPutParametersOrBodyInFormData = isFormDataRequest || isRequestBodyBinary || hasBinaryInParameters || isRequestBodyContainsBinary || parametersShouldPutInFormData.length > 0;
		return typescript.factory.createBlock([...shouldPutParametersOrBodyInFormData ? Generator.toFormDataStatement(parametersShouldPutInFormData, requestBody?.schema) : [], ...adapter.client(uri, method, parametersShouldNotPutInFormData, requestBody, response, adapter, shouldPutParametersOrBodyInFormData, shouldParseResponseToJSON)]);
	}
	static schemaToStatemets(parsedDoc, adaptor, options) {
		const statements = [];
		const { apis, schemas = {}, enums } = parsedDoc;
		const enumNames = [];
		for (const enumObject of enums) {
			enumNames.push(Base.upperCamelCase(enumObject.name));
			statements.push(typescript.factory.createEnumDeclaration([typescript.factory.createToken(typescript.SyntaxKind.ExportKeyword)], typescript.factory.createIdentifier(Base.upperCamelCase(enumObject.name)), enumObject.enum.map((member) => {
				return typescript.factory.createEnumMember(typescript.factory.createStringLiteral(typeof member === "string" ? member : `${member}_`), typeof member === "string" ? typescript.factory.createStringLiteral(member) : typescript.factory.createNumericLiteral(member));
			})));
		}
		for (const schemaKey in schemas) if (Object.hasOwn(schemas, schemaKey) && !enumNames.includes(Base.upperCamelCase(schemaKey))) {
			const schema = schemas[schemaKey];
			statements.push(typescript.factory.createTypeAliasDeclaration([typescript.factory.createModifier(typescript.SyntaxKind.ExportKeyword)], typescript.factory.createIdentifier(Base.upperCamelCase(schemaKey)), void 0, Generator.toTypeNode(schema)));
		}
		for (const uri in apis) {
			const operations = apis[uri];
			for (const operation of operations) {
				const { method, operationId, requestBody = [], responses = [], summary, deprecated, description } = operation;
				let { parameters = [] } = operation;
				parameters = parameters.filter((p) => p.in !== "cookie");
				if (requestBody.length === 0) requestBody.push({ type: "application/json" });
				const shouldAddExtraMethodNameSuffix = requestBody.length > 1;
				for (const req of requestBody) {
					const statement = typescript.factory.createFunctionDeclaration([typescript.factory.createModifier(typescript.SyntaxKind.ExportKeyword), typescript.factory.createModifier(typescript.SyntaxKind.AsyncKeyword)], void 0, Base.pathToFnName(uri, method, operationId) + (shouldAddExtraMethodNameSuffix ? Base.capitalize(req.type.split("/")[1]) : ""), void 0, [...parameters.length > 0 ? Generator.toDeclarationNodes(parameters) : [], ...req?.schema ? [Generator.toRequestBodyTypeNode(req.schema)] : []].filter(Boolean), void 0, Generator.bodyBlock(options.baseURL + uri, method, parameters, req, responses[0], adaptor));
					Generator.addComments(statement, [
						description && { comment: description },
						summary && { comment: summary },
						deprecated && { tag: "deprecated" }
					].filter(Boolean));
					statements.push(statement);
				}
			}
		}
		return statements;
	}
	static async prettier(code) {
		return await (0, prettier.format)(code, { parser: "typescript" });
	}
	static async genCode(schema, initOptions, adaptor) {
		const { importClientSource } = initOptions;
		const statements = Generator.schemaToStatemets(schema, adaptor, { baseURL: initOptions.baseURL ?? "" });
		let code = Generator.toCode(statements);
		if (importClientSource) code = importClientSource + "\n\n" + code;
		return await Generator.prettier(code);
	}
};
//#endregion
//#region src/core/client/axios.ts
/**
* File containing the implementation of the AxiosAdapter class.
* This adapter is responsible for generating code that uses the Axios HTTP client library.
*/
/**
* Adapter class implementing support for generating code that makes use of the Axios HTTP client library.
* This class defines custom behavior and field mappings specific to the Axios client.
*/
var AxiosAdapter = class extends Adapter {
	/**
	* Name of the field used to specify the HTTP method in the request configuration.
	*/
	methodFieldName = "method";
	/**
	* Name of the field used to specify the request body (data) in the request configuration.
	*/
	bodyFieldName = "data";
	/**
	* Name of the field used to specify the request headers in the request configuration.
	*/
	headersFieldName = "headers";
	/**
	* Name of the field used to specify the query parameters in the request configuration.
	*/
	queryFieldName = "params";
	/**
	* The name of the client this adapter is configured for, which is 'axios' in this case.
	*/
	name = "axios";
	/**
	* Method that should generate and return the client-specific configuration statements.
	*
	* @returns {Statement[]} An array of TypeScript statements that define the client configuration.
	*
	* @throws {Error} Indicates that the method is not yet implemented and needs to be filled in.
	*/
	client(uri, method, parameters, requestBody, response, adapter, shouldUseFormData) {
		const statements = [];
		const inBody = parameters.filter((p) => !p.in || p.in === "body");
		const inHeader = parameters.filter((p) => p.in === "header");
		/**
		* Creates the literal object expression for fetch options
		* including method, headers, and body.
		* @returns - The constructed fetch options object
		*/
		const toLiterlExpression = () => {
			return typescript.factory.createObjectLiteralExpression([typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.methodFieldName), typescript.factory.createStringLiteral(method.toUpperCase()))].concat(inHeader.length > 0 ? typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.headersFieldName), typescript.factory.createObjectLiteralExpression(inHeader.map((p) => typescript.factory.createPropertyAssignment(typescript.factory.createStringLiteral(p.name), typescript.factory.createCallExpression(typescript.factory.createIdentifier("encodeURIComponent"), void 0, [typescript.factory.createCallExpression(typescript.factory.createIdentifier("String"), void 0, [typescript.factory.createIdentifier(Base.camelCase(Base.normalize(p.name)))])]))))) : []).concat(shouldUseFormData || inBody.length > 0 || requestBody?.schema ? typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.bodyFieldName), shouldUseFormData ? typescript.factory.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? typescript.factory.createIdentifier("req") : typescript.factory.createIdentifier("req")) : []), true);
		};
		statements.push(typescript.factory.createReturnStatement(typescript.factory.createCallExpression(typescript.factory.createIdentifier(adapter.name), response?.schema ? [Generator.toTypeNode(response.schema)] : void 0, [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()])));
		return statements;
	}
};
//#endregion
//#region src/core/client/fetch.ts
/**
* FetchAdapter is an adapter class that generates client-side fetch requests.
* It handles parameters, headers, and request bodies to construct proper fetch calls.
*/
var FetchAdapter = class extends Adapter {
	methodFieldName = "method";
	bodyFieldName = "body";
	headersFieldName = "headers";
	queryFieldName = "";
	name = "fetch";
	/**
	* Generates client code for making API requests using the Fetch API.
	* @param uri - The API endpoint URI
	* @param method - The HTTP method (GET, POST, etc.)
	* @param parameters - Array of parameters to include in the request
	* @param requestBody - The request body media type definition
	* @param response - The response media type definition
	* @param adapter - The adapter instance
	* @param shouldUseFormData - Flag to use FormData for the request body
	* @param shouldUseJSONResponse - Flag to use JSON parsing for the response
	* @return - An array of generated TypeScript statements
	*/
	client(uri, method, parameters, requestBody, response, adapter, shouldUseFormData, shouldUseJSONResponse) {
		const statements = [];
		const inBody = parameters.filter((p) => !p.in || p.in === "body");
		const inHeader = parameters.filter((p) => p.in === "header");
		/**
		* Creates the literal object expression for fetch options
		* including method, headers, and body.
		* @returns - The constructed fetch options object
		*/
		const toLiterlExpression = () => {
			return typescript.factory.createObjectLiteralExpression([typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.methodFieldName), typescript.factory.createStringLiteral(method.toUpperCase()))].concat(inHeader.length > 0 ? typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.headersFieldName), typescript.factory.createObjectLiteralExpression(inHeader.map((p) => typescript.factory.createPropertyAssignment(typescript.factory.createStringLiteral(p.name), typescript.factory.createCallExpression(typescript.factory.createIdentifier("encodeURIComponent"), void 0, [typescript.factory.createCallExpression(typescript.factory.createIdentifier("String"), void 0, [typescript.factory.createIdentifier(Base.camelCase(Base.normalize(p.name)))])]))))) : []).concat(shouldUseFormData || inBody.length > 0 || requestBody?.schema ? typescript.factory.createPropertyAssignment(typescript.factory.createIdentifier(adapter.bodyFieldName), shouldUseFormData ? typescript.factory.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("JSON"), typescript.factory.createIdentifier("stringify")), [], [requestBody ? typescript.factory.createIdentifier("req") : typescript.factory.createObjectLiteralExpression(inBody.map((b) => typescript.factory.createShorthandPropertyAssignment(typescript.factory.createIdentifier(b.name))), true)]) : typescript.factory.createIdentifier("req")) : []), true);
		};
		statements.push(typescript.factory.createReturnStatement(shouldUseJSONResponse ? typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createCallExpression(typescript.factory.createIdentifier(adapter.name), void 0, [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]), typescript.factory.createIdentifier("then")), void 0, [typescript.factory.createArrowFunction([typescript.factory.createModifier(typescript.SyntaxKind.AsyncKeyword)], [], [typescript.factory.createParameterDeclaration(void 0, void 0, typescript.factory.createIdentifier("response"))], void 0, typescript.factory.createToken(typescript.SyntaxKind.EqualsGreaterThanToken), response?.schema ? typescript.factory.createAsExpression(typescript.factory.createParenthesizedExpression(typescript.factory.createAwaitExpression(typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("response"), typescript.factory.createIdentifier("json")), void 0, []))), response?.schema ? Generator.toTypeNode(response.schema) : typescript.factory.createToken(typescript.SyntaxKind.UnknownKeyword)) : typescript.factory.createParenthesizedExpression(typescript.factory.createAwaitExpression(typescript.factory.createCallExpression(typescript.factory.createPropertyAccessExpression(typescript.factory.createIdentifier("response"), typescript.factory.createIdentifier("json")), void 0, []))))]) : typescript.factory.createCallExpression(typescript.factory.createIdentifier(adapter.name), void 0, [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()])));
		return statements;
	}
};
//#endregion
//#region src/openapi/V2.ts
var V2 = class {
	doc;
	constructor(doc) {
		this.doc = doc;
	}
	/**
	* Resolves a path $ref to the actual path object.
	*/
	resolvePathRef($ref) {
		const refName = Base.ref2name($ref, this.doc);
		return this.doc.paths?.[refName];
	}
	/**
	* Is array schema.
	*/
	isOpenAPIArraySchema(schema) {
		return typeof schema === "object" && schema.type === "array";
	}
	/**
	* OpenAPI schema to base schema.
	*/
	getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
		let refName = "";
		if (Base.isRef(schema)) {
			refName = Base.upperCamelCase(Base.ref2name(schema.$ref));
			if (reserveRef) return { type: upLevelSchemaKey + refName };
			if (!this.doc.definitions) this.doc.definitions = {};
			schema = this.doc.definitions[Base.ref2name(schema.$ref, this.doc)];
		}
		return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
	}
	/**
	* Transform all OpenAPI schema to Base Schema
	*/
	toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
		if (!schema) return { type: "unknown" };
		if (Base.isRef(schema)) return this.getSchemaByRef(schema, true);
		if (this.isOpenAPIArraySchema(schema)) {
			const { type, description, items, required } = schema;
			return {
				type,
				required: !!required,
				description,
				items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
			};
		} else {
			const { required = [], allOf, anyOf, description, enum: enum_, format, oneOf, properties = {} } = schema;
			let { type } = schema;
			if (enum_ && type !== "boolean") {
				const enumObject = {
					name: Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey)),
					enum: [...new Set(enum_)]
				};
				const sameObject = Base.findSameSchema(enumObject, enums);
				if (!sameObject && Base.isValidEnumType(schema)) enums.push(enumObject);
				return {
					type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
					required,
					description
				};
			}
			if (type === void 0 && Object.keys(properties).length > 0) type = "object";
			return {
				type,
				required,
				description,
				enum: enum_,
				format,
				allOf: allOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				anyOf: anyOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				oneOf: oneOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				properties: Object.keys(properties).reduce((acc, p) => {
					const propSchema = properties[p];
					return {
						...acc,
						[p]: Base.isRef(propSchema) ? { type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc)) } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
					};
				}, {})
			};
		}
	}
	/**
	* OpenAPI parameter to base parameter.
	*/
	getParameterByRef(parameter, enums = [], upLevelSchemaKey = "") {
		if (Base.isRef(parameter)) parameter = this.doc.parameters?.[Base.ref2name(parameter.$ref, this.doc)];
		const { name, required, description, type, items, enum: enum_, properties, schema } = parameter;
		if (enum_) {
			const type = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
			const enumSchema = {
				name: type,
				enum: [...new Set(enum_)]
			};
			const sameEnum = Base.findSameSchema(enumSchema, enums);
			if (!sameEnum && Base.isValidEnumType({
				type,
				enum: enum_
			})) enums.push(enumSchema);
			return {
				name,
				required,
				description,
				in: parameter.in,
				schema: { type: sameEnum?.name ?? type }
			};
		}
		if (items) return {
			name,
			required,
			description,
			in: parameter.in,
			schema: {
				type,
				items
			}
		};
		if (schema && Base.isRef(schema)) return {
			name,
			required,
			description,
			in: parameter.in,
			schema: { type: Base.capitalize(Base.ref2name(schema.$ref)) }
		};
		return {
			name,
			required,
			description,
			in: parameter.in,
			schema: {
				type,
				properties
			}
		};
	}
	/**
	* OpenAPI schema to base response
	*/
	getResponseByRef(schema) {
		if (Base.isRef(schema)) schema = this.doc.responses[Base.ref2name(schema.$ref, this.doc)];
		const { schema: responseSchema } = schema;
		return [{
			type: "application/json",
			schema: responseSchema && this.getSchemaByRef(responseSchema, true)
		}];
	}
	init() {
		const { definitions = {}, responses = {}, paths = {} } = this.doc;
		const enums = [];
		const definitions_ = Object.keys(definitions).reduce((acc, key) => {
			const schema = definitions[key];
			return {
				...acc,
				[key]: this.getSchemaByRef(schema, false, enums, key)
			};
		}, {});
		const responses_ = Object.keys(responses).reduce((acc, key) => {
			const response = responses[key];
			return {
				...acc,
				[key]: this.getResponseByRef(response)
			};
		}, {});
		const apis = Object.keys(paths).reduce((acc, path) => {
			let pathObject = paths[path] ?? {};
			if (pathObject.$ref) {
				const resolved = this.resolvePathRef(pathObject.$ref);
				if (resolved) pathObject = resolved;
			}
			const { parameters = [] } = pathObject;
			const methodApis = [];
			Object.values(HttpMethods).forEach((method) => {
				const methodObject = pathObject[method];
				if (methodObject) {
					const { deprecated, operationId, summary: summary_, description: description_, responses = {} } = methodObject;
					const { parameters: parameters_ = [] } = methodObject;
					const baseParameters = [...parameters, ...parameters_].map((parameter) => this.getParameterByRef(parameter, enums));
					const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
					if (Object.keys(responses).length === 0) Object.assign(responses, { 200: { description: "Successful response" } });
					const inBody = baseParameters.filter((p) => p.in === "body" || p.in === "formData");
					const notInBody = baseParameters.filter((p) => p.in !== "body" && p.in !== "formData");
					const httpCodes = Object.keys(responses);
					for (const code of httpCodes) if (code in responses) {
						const response = responses[code];
						const responseSchema = this.getResponseByRef(response);
						const inBodyOnlyHasBody = inBody && inBody.length === 1 && inBody[0].in === "body" && inBody[0].name === "body";
						methodApis.push({
							method,
							operationId,
							summary: summary_,
							deprecated,
							description: description_,
							parameters: uniqueParameterName.map((name) => notInBody.find((p) => p.name === name)).filter(Boolean),
							responses: responseSchema,
							requestBody: inBody.length > 0 ? inBodyOnlyHasBody ? [{
								type: "application/json",
								schema: inBody[0].schema
							}] : [{
								type: "application/json",
								schema: {
									type: "object",
									properties: inBody.reduce((a, p) => {
										return {
											...a,
											[p.name]: {
												type: p.schema?.type ?? "unknown",
												required: p.schema?.required,
												items: p.schema?.items,
												description: p.schema?.description
											}
										};
									}, {})
								}
							}] : void 0
						});
						break;
					}
				}
			});
			return {
				...acc,
				[path]: methodApis
			};
		}, {});
		return {
			enums: Base.uniqueEnums(enums),
			schemas: definitions_,
			responses: responses_,
			parameters: {},
			requestBodies: {},
			apis
		};
	}
};
//#endregion
//#region src/openapi/V3.ts
var V3 = class {
	doc;
	constructor(doc) {
		this.doc = doc;
	}
	/**
	* Resolves a path $ref to the actual path object.
	*/
	resolvePathRef($ref) {
		const refName = Base.ref2name($ref, this.doc);
		return this.doc.paths?.[refName];
	}
	/**
	* Is array schema.
	*/
	isOpenAPIArraySchema(schema) {
		return typeof schema === "object" && schema.type === "array";
	}
	/**
	* OpenAPI schema to base schema.
	*/
	getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
		let refName = "";
		if (Base.isRef(schema)) {
			refName = Base.capitalize(Base.ref2name(schema.$ref));
			if (reserveRef) return { type: upLevelSchemaKey + refName };
			const resolvedSchema = this.doc.components?.schemas?.[Base.ref2name(schema.$ref, this.doc)];
			if (!resolvedSchema) return { type: "unknown" };
			schema = resolvedSchema;
		}
		return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
	}
	/**
	* OpenAPI parameter to base parameter.
	*/
	getParameterByRef(schema, enums = [], upLevelSchemaKey = "") {
		if (Base.isRef(schema)) {
			const resolvedSchema = this.doc.components?.parameters?.[Base.ref2name(schema.$ref, this.doc)];
			if (!resolvedSchema) return {
				name: "unknown",
				in: "query"
			};
			schema = resolvedSchema;
		}
		const { name, required, deprecated, description, schema: parameterSchema } = schema;
		if (parameterSchema && !Base.isRef(parameterSchema) && parameterSchema.enum) {
			const type = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
			const enumSchema = {
				name: type,
				enum: [...new Set(parameterSchema.enum)]
			};
			const sameEnum = Base.findSameSchema(enumSchema, enums);
			if (!sameEnum && Base.isValidEnumType(parameterSchema)) enums.push(enumSchema);
			return {
				name,
				required,
				description,
				deprecated,
				in: schema.in,
				schema: { type: sameEnum?.name ?? type }
			};
		}
		return {
			name,
			required,
			description,
			deprecated,
			in: schema.in,
			schema: schema.schema && this.getSchemaByRef(schema.schema, false, enums, upLevelSchemaKey + Base.capitalize(name))
		};
	}
	/**
	* OpenAPI schema to base response
	*/
	getResponseByRef(schema) {
		if (Base.isRef(schema)) {
			const resolvedSchema = this.doc.components?.responses?.[Base.ref2name(schema.$ref, this.doc)];
			if (!resolvedSchema) return [];
			schema = resolvedSchema;
		}
		const { content = {} } = schema;
		return Object.keys(content).map((c) => ({
			type: c,
			schema: content[c].schema && this.getSchemaByRef(content[c].schema, true)
		}));
	}
	/**
	* OpenAPI schema to requestBody.
	*/
	getRequestBodyByRef(schema, enums = []) {
		if (Base.isRef(schema)) {
			const resolvedSchema = this.doc.components?.requestBodies?.[Base.ref2name(schema.$ref, this.doc)];
			if (!resolvedSchema) return [];
			schema = resolvedSchema;
		}
		const { content = {} } = schema;
		return Object.keys(content).map((c) => ({
			type: c,
			schema: content[c].schema && this.getSchemaByRef(content[c].schema, false, enums)
		}));
	}
	/**
	* Transform all OpenAPI schema to Base Schema
	*/
	toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
		if (!schema) return { type: "unknown" };
		if (Base.isRef(schema)) return this.getSchemaByRef(schema, true);
		if (this.isOpenAPIArraySchema(schema)) {
			const { type, description, items, required } = schema;
			return {
				type,
				required: !!required,
				description,
				items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
			};
		} else {
			const { required = [], allOf, anyOf, description, deprecated, enum: enum_, format, oneOf, properties = {} } = schema;
			let { type } = schema;
			if (enum_ && type !== "boolean") {
				const enumObject = {
					name: Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey)),
					enum: [...new Set(enum_)]
				};
				const sameObject = Base.findSameSchema(enumObject, enums);
				if (!sameObject && Base.isValidEnumType(schema)) enums.push(enumObject);
				return {
					type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
					required,
					description,
					deprecated
				};
			}
			if (type === void 0 && Object.keys(properties).length > 0) type = "object";
			return {
				type,
				required,
				description,
				deprecated,
				enum: enum_,
				format,
				allOf: allOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				anyOf: anyOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				oneOf: oneOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				properties: Object.keys(properties).reduce((acc, p) => {
					const propSchema = properties[p];
					return {
						...acc,
						[p]: Base.isRef(propSchema) ? { type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc)) } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
					};
				}, {})
			};
		}
	}
	init() {
		const { components = {}, paths = {} } = this.doc;
		const enums = [];
		const { requestBodies = {}, responses = {}, parameters = {}, schemas = {} } = components;
		const schemas_ = Object.keys(schemas).reduce((acc, key) => {
			const schema = schemas[key];
			return {
				...acc,
				[key]: this.getSchemaByRef(schema, false, enums, key)
			};
		}, {});
		const parameters_ = Object.keys(parameters).reduce((acc, key) => {
			const parameter = parameters[key];
			return {
				...acc,
				[key]: this.getParameterByRef(parameter, enums, key)
			};
		}, {});
		const responses_ = Object.keys(responses).reduce((acc, key) => {
			const response = responses[key];
			return {
				...acc,
				[key]: this.getResponseByRef(response)
			};
		}, {});
		const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
			const requestBody = requestBodies[key];
			return {
				...acc,
				[key]: this.getRequestBodyByRef(requestBody, enums)
			};
		}, {});
		const apis = Object.keys(paths).reduce((acc, path) => {
			let pathObject = paths[path] ?? {};
			if (pathObject.$ref) {
				const resolved = this.resolvePathRef(pathObject.$ref);
				if (resolved) pathObject = resolved;
			}
			const { parameters = [], description, summary } = pathObject;
			const methodApis = [];
			Object.values(HttpMethods).forEach((method) => {
				const methodObject = pathObject[method];
				if (methodObject) {
					const { deprecated, operationId, responses = {}, summary: summary_, description: description_, requestBody = { content: {} } } = methodObject;
					const { parameters: parameters_ = [] } = methodObject;
					const baseParameters = [...parameters, ...parameters_].map((parameter) => this.getParameterByRef(parameter, enums));
					const baseRequestBody = this.getRequestBodyByRef(requestBody, enums);
					const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
					if (Object.keys(responses).length === 0) Object.assign(responses, { 200: { description: "Successful response" } });
					const httpCodes = Object.keys(responses);
					for (const code of httpCodes) if (code in responses) {
						const response = responses[code];
						const responseSchema = this.getResponseByRef(response);
						methodApis.push({
							method,
							operationId,
							summary: summary_ ?? summary,
							description: description_ ?? description,
							deprecated,
							parameters: uniqueParameterName.map((name) => baseParameters.find((p) => p.name === name)),
							responses: responseSchema,
							requestBody: baseRequestBody
						});
						break;
					}
				}
			});
			return {
				...acc,
				[path]: methodApis
			};
		}, {});
		return {
			enums: Base.uniqueEnums(enums),
			schemas: schemas_,
			responses: responses_,
			parameters: parameters_,
			requestBodies: requestBodies_,
			apis
		};
	}
};
//#endregion
//#region src/openapi/V3_1.ts
var V3_1 = class {
	doc;
	constructor(doc) {
		this.doc = doc;
	}
	/**
	* Resolves a path $ref to the actual path object.
	*/
	resolvePathRef($ref) {
		const refName = Base.ref2name($ref, this.doc);
		return this.doc.paths?.[refName];
	}
	/**
	* Is array schema.
	*/
	isOpenAPIArraySchema(schema) {
		return typeof schema === "object" && schema.type === "array";
	}
	/**
	* OpenAPI schema to base schema.
	*/
	getSchemaByRef(schema, reserveRef = false, enums = [], upLevelSchemaKey = "") {
		let refName = "";
		if (Base.isRef(schema)) {
			refName = Base.upperCamelCase(Base.ref2name(schema.$ref));
			if (reserveRef) return { type: upLevelSchemaKey + refName };
			if (!this.doc.components) this.doc.components = { schemas: {} };
			schema = this.doc.components.schemas?.[Base.ref2name(schema.$ref, this.doc)];
		}
		return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
	}
	/**
	* OpenAPI parameter to base parameter.
	*/
	getParameterByRef(schema, enums = [], upLevelSchemaKey = "") {
		if (Base.isRef(schema)) schema = this.doc.components?.parameters?.[Base.ref2name(schema.$ref, this.doc)];
		const { name, required, deprecated, description, schema: parameterSchema } = schema;
		if (parameterSchema && !Base.isRef(parameterSchema) && parameterSchema.enum) {
			const type = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
			const enumSchema = {
				name: type,
				enum: [...new Set(parameterSchema.enum)]
			};
			const sameEnum = Base.findSameSchema(enumSchema, enums);
			if (!sameEnum && Base.isValidEnumType(parameterSchema)) enums.push(enumSchema);
			return {
				name,
				required,
				description,
				deprecated,
				in: schema.in,
				schema: { type: sameEnum?.name ?? type }
			};
		}
		return {
			name,
			required,
			description,
			deprecated,
			in: schema.in,
			schema: schema.schema && this.getSchemaByRef(schema.schema, false, enums, upLevelSchemaKey + Base.capitalize(name))
		};
	}
	/**
	* OpenAPI schema to base response
	*/
	getResponseByRef(schema) {
		if (Base.isRef(schema)) schema = this.doc.components?.responses?.[Base.ref2name(schema.$ref, this.doc)];
		const { content = {} } = schema;
		return Object.keys(content).map((c) => ({
			type: c,
			schema: content[c].schema && this.getSchemaByRef(content[c].schema, true)
		}));
	}
	/**
	* OpenAPI schema to requestBody.
	*/
	getRequestBodyByRef(schema, enums = []) {
		if (Base.isRef(schema)) schema = this.doc.components?.requestBodies?.[Base.ref2name(schema.$ref, this.doc)];
		const { content = {} } = schema;
		return Object.keys(content).map((c) => ({
			type: c,
			schema: content[c].schema && this.getSchemaByRef(content[c].schema, true, enums)
		}));
	}
	/**
	* Transform all OpenAPI schema to Base Schema
	*/
	toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
		if (!schema) return { type: "unknown" };
		if (Base.isRef(schema)) return this.getSchemaByRef(schema, true);
		if (this.isOpenAPIArraySchema(schema)) {
			const { type, description, items, required } = schema;
			return {
				type,
				required: !!required,
				description,
				items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
			};
		} else {
			const { required = [], allOf, anyOf, description, deprecated, enum: enum_, format, oneOf, properties = {} } = schema;
			let { type } = schema;
			if (enum_ && type !== "boolean") {
				const enumObject = {
					name: Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey)),
					enum: [...new Set(enum_)]
				};
				const sameObject = Base.findSameSchema(enumObject, enums);
				if (!sameObject && Base.isValidEnumType(schema)) enums.push(enumObject);
				return {
					type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
					required,
					description,
					deprecated
				};
			}
			if (type === void 0 && Object.keys(properties).length > 0) type = "object";
			return {
				type,
				required,
				description,
				deprecated,
				enum: enum_,
				format,
				allOf: allOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				anyOf: anyOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				oneOf: oneOf?.map((s) => Base.isRef(s) ? {
					...s,
					ref: s.$ref,
					type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
				} : this.toBaseSchema(s, enums)),
				properties: Object.keys(properties).reduce((acc, p) => {
					const propSchema = properties[p];
					return {
						...acc,
						[p]: Base.isRef(propSchema) ? { type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc)) } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
					};
				}, {})
			};
		}
	}
	init() {
		const { components = {}, paths = {} } = this.doc;
		const enums = [];
		const { requestBodies = {}, responses = {}, parameters = {}, schemas = {} } = components;
		const schemas_ = Object.keys(schemas).reduce((acc, key) => {
			const schema = schemas[key];
			return {
				...acc,
				[key]: this.getSchemaByRef(schema, false, enums, key)
			};
		}, {});
		const parameters_ = Object.keys(parameters).reduce((acc, key) => {
			const parameter = parameters[key];
			return {
				...acc,
				[key]: this.getParameterByRef(parameter, enums, key)
			};
		}, {});
		const responses_ = Object.keys(responses).reduce((acc, key) => {
			const response = responses[key];
			return {
				...acc,
				[key]: this.getResponseByRef(response)
			};
		}, {});
		const requestBodies_ = Object.keys(requestBodies).reduce((acc, key) => {
			const requestBody = requestBodies[key];
			return {
				...acc,
				[key]: this.getRequestBodyByRef(requestBody, enums)
			};
		}, {});
		const apis = Object.keys(paths).reduce((acc, path) => {
			let pathObject = paths[path] ?? {};
			if (pathObject.$ref) {
				const resolved = this.resolvePathRef(pathObject.$ref);
				if (resolved) pathObject = resolved;
			}
			const { parameters = [], description, summary } = pathObject;
			const methodApis = [];
			Object.values(HttpMethods).forEach((method) => {
				const methodObject = pathObject[method];
				if (methodObject) {
					const { deprecated, operationId, summary: summary_, description: description_, responses = {}, requestBody = { content: {} } } = methodObject;
					const { parameters: parameters_ = [] } = methodObject;
					const baseParameters = [...parameters, ...parameters_].map((parameter) => this.getParameterByRef(parameter, enums));
					const baseRequestBody = this.getRequestBodyByRef(requestBody, enums);
					const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
					if (Object.keys(responses).length === 0) Object.assign(responses, { 200: { description: "Successful response" } });
					const httpCodes = Object.keys(responses);
					for (const code of httpCodes) if (code in responses) {
						const response = responses[code];
						const responseSchema = this.getResponseByRef(response);
						methodApis.push({
							method,
							operationId,
							summary: summary_ ?? summary,
							description: description_ ?? description,
							deprecated,
							parameters: uniqueParameterName.map((name) => baseParameters.find((p) => p.name === name)),
							responses: responseSchema,
							requestBody: baseRequestBody
						});
						break;
					}
				}
			});
			return {
				...acc,
				[path]: methodApis
			};
		}, {});
		return {
			enums: Base.uniqueEnums(enums),
			schemas: schemas_,
			responses: responses_,
			parameters: parameters_,
			requestBodies: requestBodies_,
			apis
		};
	}
};
//#endregion
//#region src/openapi/index.ts
const logger = (0, _moccona_logger.createScopedLogger)("OpenAPI");
function getDocVersion(doc) {
	switch ((doc.openapi || doc.swagger).slice(0, 3)) {
		case "3.1": return "v3_1";
		case "3.0": return "v3";
		case "2.0": return "v2";
		default: return "unknown";
	}
}
var OpenAPIProvider = class extends Provider {
	parse(doc) {
		const version = getDocVersion(doc);
		logger.debug(`openapi version ${version}`);
		switch (version) {
			case "v2": return new V2(doc).init();
			case "v3": return new V3(doc).init();
			case "v3_1": return new V3_1(doc).init();
			default: throw new Error(`Not a valid OpenAPI version: ${version}`);
		}
	}
};
function getAdaptor(type) {
	switch (type) {
		case "axios": return new AxiosAdapter();
		default: return new FetchAdapter();
	}
}
async function codeGen(initOptions) {
	const startTime = Date.now();
	const { verbose } = initOptions;
	if (verbose) logger.setLevel("debug");
	else logger.setLevel("info");
	logger.info(`Fetch document from ${initOptions.docURL}`);
	const { enums, schemas, parameters, responses, requestBodies, apis } = new OpenAPIProvider(initOptions, await Base.fetchDoc(initOptions.docURL, initOptions.requestOptions));
	const adaptor = getAdaptor(initOptions.adaptor ?? "fetch");
	const code = await Generator.genCode({
		enums,
		schemas,
		parameters,
		responses,
		requestBodies,
		apis
	}, initOptions, adaptor);
	if (initOptions.output) await Generator.write(code, initOptions.output);
	const duration = Date.now() - startTime;
	return {
		code,
		stats: {
			endpoints: Object.keys(apis).length,
			schemas: Object.keys(schemas).length,
			duration
		}
	};
}
//#endregion
//#region package.json
var version = "0.0.3";
//#endregion
//#region src/cli.ts
/**
* Watch file changes and regenerate on change
*/
async function watchAndGenerate(options) {
	const { createWatch } = await import("vite");
	let watcher = null;
	const generate = async () => {
		try {
			const { endpoints, schemas, duration } = (await codeGen(options)).stats;
			console.log(`\x1b[32m✓\x1b[0m Regenerated: ${options.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`);
		} catch (error) {
			console.error(formatError(error, true));
		}
	};
	watcher = createWatch([options.docURL].filter(Boolean), {
		ignoreInitial: false,
		awaitWriteFinish: {
			stabilityThreshold: 500,
			pollInterval: 100
		}
	});
	watcher.on("change", async (filePath) => {
		console.log(`\x1b[33m↓\x1b[0m File changed: ${filePath}`);
		await generate();
	});
	watcher.on("add", async (filePath) => {
		console.log(`\x1b[32m+\x1b[0m File added: ${filePath}`);
		await generate();
	});
	return watcher;
}
/**
* Resolve document URL from various formats
*/
function resolveDocURL(docURL, baseURL) {
	if (docURL.startsWith("http://") || docURL.startsWith("https://")) return docURL;
	if (docURL.startsWith("/") || docURL.match(/^[A-Za-z]:/)) return `file://${docURL}`;
	if (baseURL) return new URL(docURL, baseURL).href;
	return node_path.default.resolve(process.cwd(), docURL);
}
/**
* Check if spec file/directory exists
*/
async function validateSpecPath(specPath) {
	if (specPath.startsWith("http://") || specPath.startsWith("https://")) return;
	const filePath = specPath.replace(/^file:\/\//, "");
	const absolutePath = node_path.default.isAbsolute(filePath) ? filePath : node_path.default.resolve(process.cwd(), filePath);
	if (!await fs_extra.default.pathExists(absolutePath)) throw createErrors.specNotFound(absolutePath);
}
/**
* Check if URL is remote (http/https)
*/
function isRemoteURL(url) {
	return url.startsWith("http://") || url.startsWith("https://");
}
const cli = (0, commander.createCommand)("apicodegen");
cli.name("apicodegen").version(version).description("API code generation from OpenAPI specifications").argument("[spec]", "URL or path to OpenAPI documentation").option("-s, --spec <path>", "OpenAPI spec file path or URL").option("-o, --output <path>", "Output file path").option("-a, --adaptor <type>", "HTTP client adaptor (fetch|axios)", "fetch").option("-b, --baseURL <url>", "Base URL for API endpoints").option("-c, --config <path>", "Path to config file").option("-w, --watch", "Watch for file changes and regenerate").option("-v, --verbose", "Enable verbose logging").option("--importClientSource <path>", "Custom client import source path").action(async (specArg, options) => {
	const cliOptions = {};
	if (options.spec) cliOptions.spec = options.spec;
	if (options.output) cliOptions.output = options.output;
	if (options.adaptor) cliOptions.adaptor = options.adaptor;
	if (options.baseURL) cliOptions.baseURL = options.baseURL;
	if (options.verbose) cliOptions.verbose = options.verbose;
	if (options.watch) cliOptions.watch = options.watch;
	if (options.importClientSource) cliOptions.importClientSource = options.importClientSource;
	if (options.config) cliOptions.configFile = options.config;
	if (specArg) cliOptions.spec = specArg;
	try {
		const config = await loadConfig({
			cwd: process.cwd(),
			cliOptions
		});
		await validateSpecPath(config.spec);
		const resolvedDocURL = resolveDocURL(config.spec, config.baseURL);
		const codeGenOptions = {
			...toProviderOptions(config),
			docURL: resolvedDocURL
		};
		if (config.watch) {
			console.log("\x1B[33m🔄\x1B[0m Watching for changes...");
			const watchPatterns = [];
			if (!resolvedDocURL.startsWith("http")) {
				const docPath = resolvedDocURL.replace(/^file:\/\//, "");
				const dir = node_path.default.dirname(docPath);
				watchPatterns.push(`${dir}/**/*.json`, `${dir}/**/*.yaml`, `${dir}/**/*.yml`);
			}
			const watcher = await watchAndGenerate(codeGenOptions);
			const shutdown = async () => {
				console.log("\n\x1B[90m👋 Shutting down...\x1B[0m");
				if (watcher) await watcher.close();
				process.exit(0);
			};
			process.on("SIGINT", shutdown);
			process.on("SIGTERM", shutdown);
		} else {
			if (isRemoteURL(resolvedDocURL)) console.log(`\x1b[33m🔄\x1b[0m Fetching spec from ${resolvedDocURL}...`);
			const { endpoints, schemas, duration } = (await codeGen(codeGenOptions)).stats;
			console.log(`\x1b[32m✓\x1b[0m Generated: ${config.output} (${endpoints} endpoints, ${schemas} schemas) ${duration}ms`);
		}
	} catch (error) {
		if (isApicodegenError(error)) console.error(formatError(error, options.verbose));
		else {
			const wrapped = wrapError(error, {
				code: "E_GENERATION_FAILED",
				message: "An unexpected error occurred"
			});
			console.error(formatError(wrapped, options.verbose));
		}
		process.exit(1);
	}
});
cli.parse();
//#endregion
