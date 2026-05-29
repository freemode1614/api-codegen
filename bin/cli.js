#!/bin/env node

// src/cli.ts
import path2 from "path";

// src/core/errors.ts
var ErrorCodes = {
  SPEC_NOT_FOUND: "E_SPEC_NOT_FOUND",
  SPEC_FETCH_FAILED: "E_SPEC_FETCH_FAILED",
  SPEC_PARSE_FAILED: "E_SPEC_PARSE_FAILED",
  OUTPUT_DIR_MISSING: "E_OUTPUT_DIR_MISSING",
  CONFIG_INVALID: "E_CONFIG_INVALID",
  VALIDATION_FAILED: "E_VALIDATION_FAILED",
  GENERATION_FAILED: "E_GENERATION_FAILED",
  TYPE_CHECK_FAILED: "E_TYPE_CHECK_FAILED"
};
var ApicodegenError = class _ApicodegenError extends Error {
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
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _ApicodegenError);
    }
  }
  /**
   * Convert error to formatted string for CLI output
   */
  toString(verbose = false) {
    const lines = [];
    lines.push(`\x1B[1;31mError [${this.code}]\x1B[0m ${this.message}`);
    if (this.location) {
      lines.push(`  \x1B[36m\u2192 Location:\x1B[0m ${this.location}`);
    }
    if (this.path) {
      lines.push(`  \x1B[36m\u2192 Path:\x1B[0m ${this.path}`);
    }
    if (this.line !== void 0) {
      let lineInfo = `  \x1B[36m\u2192 Line:\x1B[0m ${this.line}`;
      if (this.column !== void 0) {
        lineInfo += `, Column: ${this.column}`;
      }
      lines.push(lineInfo);
    }
    if (this.suggestions.length > 0) {
      for (const suggestion of this.suggestions) {
        lines.push(`  \x1B[32m\u2192 Suggestion:\x1B[0m ${suggestion}`);
      }
    }
    if (verbose && this.cause) {
      lines.push(`
  \x1B[90mOriginal Error:\x1B[0m ${this.cause.message}`);
      if (this.stack) {
        const stackLines = this.stack.split("\n").slice(1).join("\n");
        lines.push(`\x1B[90m${stackLines}\x1B[0m`);
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
var Colors = {
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
function formatError(error, verbose = false) {
  if (error instanceof ApicodegenError) {
    return error.toString(verbose);
  }
  if (error instanceof Error) {
    return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${error.message}${verbose && error.stack ? `

${Colors.gray}${error.stack}${Colors.reset}` : ""}`;
  }
  return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${String(error)}`;
}
var createErrors = {
  specNotFound(path3, cause) {
    return new ApicodegenError({
      code: ErrorCodes.SPEC_NOT_FOUND,
      message: "OpenAPI spec file not found",
      location: path3,
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
  specParseFailed(path3, line, column, cause) {
    return new ApicodegenError({
      code: ErrorCodes.SPEC_PARSE_FAILED,
      message: "Failed to parse OpenAPI spec (invalid JSON or YAML)",
      location: path3,
      line,
      column,
      suggestions: [
        "Validate JSON syntax using https://jsonlint.com",
        "For YAML specs, ensure proper indentation",
        "Check for trailing commas or unquoted special characters"
      ],
      cause
    });
  },
  outputDirMissing(path3, cause) {
    return new ApicodegenError({
      code: ErrorCodes.OUTPUT_DIR_MISSING,
      message: "Output directory does not exist",
      location: path3,
      suggestions: [
        "Create the directory: mkdir -p $(dirname <output>)",
        "Check if the path is correct"
      ],
      cause
    });
  },
  configInvalid(path3, cause) {
    return new ApicodegenError({
      code: ErrorCodes.CONFIG_INVALID,
      message: "Invalid configuration file",
      location: path3,
      suggestions: [
        "Validate JSON syntax in the config file",
        "Check for required fields (spec, output)",
        "See documentation for config file format"
      ],
      cause
    });
  },
  validationFailed(path3, details, cause) {
    return new ApicodegenError({
      code: ErrorCodes.VALIDATION_FAILED,
      message: "OpenAPI spec validation failed",
      location: path3,
      path: details,
      suggestions: [
        "Check OpenAPI spec structure at the specified path",
        "Ensure all required fields are present",
        "Validate using https://editor.swagger.io/"
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
        "Try with --verbose flag for more details"
      ],
      cause
    });
  },
  typeCheckFailed(path3, errors, cause) {
    return new ApicodegenError({
      code: ErrorCodes.TYPE_CHECK_FAILED,
      message: "TypeScript type check failed",
      location: path3,
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
function wrapError(error, context) {
  if (error instanceof ApicodegenError) {
    return error;
  }
  if (error instanceof Error) {
    return new ApicodegenError({
      code: context?.code || ErrorCodes.GENERATION_FAILED,
      message: context?.message || error.message,
      location: context?.location,
      suggestions: context?.suggestions,
      cause: error
    });
  }
  return new ApicodegenError({
    code: context?.code || ErrorCodes.GENERATION_FAILED,
    message: String(error),
    suggestions: context?.suggestions
  });
}
function isApicodegenError(error) {
  return error instanceof ApicodegenError;
}

// src/core/config.ts
import fs from "fs-extra";
import path from "path";
var ENV_MAPPINGS = {
  APICODEGEN_SPEC: "spec",
  APICODEGEN_OUTPUT: "output",
  APICODEGEN_BASE_URL: "baseURL",
  APICODEGEN_ADAPTOR: "adaptor",
  APICODEGEN_VERBOSE: "verbose",
  APICODEGEN_WATCH: "watch",
  APICODEGEN_TYPE_CHECK: "typeCheck"
};
function loadFromEnv() {
  const config = {};
  for (const [envKey, configKey] of Object.entries(ENV_MAPPINGS)) {
    const value = process.env[envKey];
    if (value !== void 0) {
      switch (configKey) {
        case "verbose":
        case "watch":
        case "typeCheck":
          config[configKey] = value === "true" || value === "1";
          break;
        case "adaptor":
          config[configKey] = value;
          break;
        default:
          config[configKey] = value;
      }
    }
  }
  return config;
}
async function loadFromFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (ext === ".json" || ext === ".jsonc") {
      const content2 = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content2);
    }
    if (ext === ".js" || ext === ".cjs" || ext === ".mjs") {
      const mod = await import(filePath);
      return mod.default || mod;
    }
    if (ext === ".ts") {
      const content2 = await fs.readFile(filePath, "utf-8");
      try {
        return JSON.parse(content2);
      } catch {
        const jsonMatch = content2.match(/export\s+default\s+(\{.+\})/s);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[1]);
        }
      }
    }
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to load config from ${filePath}: ${error}`);
  }
}
async function findConfigFile(cwd) {
  const configFiles = [
    "apicodegen.config.json",
    "apicodegen.config.js",
    "apicodegen.config.mjs",
    ".apicodegenrc",
    ".apicodegenrc.json",
    ".apicodegenrc.js",
    ".apicodegenrc.mjs"
  ];
  for (const fileName of configFiles) {
    const filePath = path.join(cwd, fileName);
    if (await fs.pathExists(filePath)) {
      return filePath;
    }
  }
  const packageJsonPath = path.join(cwd, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const pkg = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
      if (pkg.apicodegen && typeof pkg.apicodegen === "string") {
        return path.resolve(cwd, pkg.apicodegen);
      }
    } catch {
    }
  }
  return null;
}
function mergeConfigs(base, ...sources) {
  const result = { ...base };
  for (const source of sources) {
    if (!source) continue;
    for (const [key, value] of Object.entries(source)) {
      if (value !== void 0) {
        result[key] = value;
      }
    }
  }
  return result;
}
function validateConfig(config) {
  if (!config.spec) {
    throw new Error("Missing required field: spec (OpenAPI spec file path or URL)");
  }
  return true;
}
async function loadConfig(options = {}) {
  const cwd = options.cwd || process.cwd();
  const cliOptions = options.cliOptions || {};
  const envConfig = loadFromEnv();
  let fileConfig = {};
  let configFilePath;
  if (options.configFile) {
    configFilePath = path.resolve(cwd, options.configFile);
    fileConfig = await loadFromFile(configFilePath);
  } else {
    const foundPath = await findConfigFile(cwd);
    if (foundPath) {
      configFilePath = foundPath;
      fileConfig = await loadFromFile(foundPath);
    }
  }
  const packageJsonPath = path.join(cwd, "package.json");
  let inlineConfig = {};
  if (await fs.pathExists(packageJsonPath)) {
    try {
      const pkg = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
      if (pkg.apicodegen && typeof pkg.apicodegen === "object") {
        inlineConfig = pkg.apicodegen;
      }
    } catch {
    }
  }
  const merged = mergeConfigs(
    { spec: "", output: "./output.ts" },
    // defaults
    envConfig,
    inlineConfig,
    fileConfig,
    cliOptions
  );
  validateConfig(merged);
  const name = options.name || merged.baseURL || merged.spec;
  return {
    ...merged,
    configFilePath,
    name
  };
}
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

// src/core/base/Adaptor.ts
var Adapter = class {
};

// src/core/constants/keywords.ts
var typescriptKeywords = /* @__PURE__ */ new Set([
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

// src/core/interface.ts
var MediaTypes = /* @__PURE__ */ ((MediaTypes2) => {
  MediaTypes2["JSON"] = "application/json";
  MediaTypes2["TEXT"] = "text";
  MediaTypes2["IMAGE"] = "image";
  MediaTypes2["AUDIO"] = "audio";
  MediaTypes2["VIDEO"] = "video";
  return MediaTypes2;
})(MediaTypes || {});
var HttpMethods = /* @__PURE__ */ ((HttpMethods2) => {
  HttpMethods2["GET"] = "get";
  HttpMethods2["PUT"] = "put";
  HttpMethods2["POST"] = "post";
  HttpMethods2["DELETE"] = "delete";
  HttpMethods2["OPTIONS"] = "options";
  HttpMethods2["HEAD"] = "head";
  HttpMethods2["PATCH"] = "patch";
  HttpMethods2["TRACE"] = "trace";
  return HttpMethods2;
})(HttpMethods || {});

// src/core/base/Base.ts
import { Agent, request } from "undici";
var Base = class _Base {
  constructor() {
    if (new.target === _Base) {
      throw new Error("Cannot instantiate abstract class");
    }
  }
  /**
   * Converts a reference string to a meaningful name.
   * @param ref - The reference string to process.
   * @param [doc] - Optional document reference for context.
   * @returns - The processed name.
   */
  static ref2name(ref, doc) {
    const paths = ref.replace(/^#/, "").split("/").filter(Boolean);
    if (!doc) {
      return paths.slice(-1)[0];
    }
    let temporary = doc;
    let lastPath = "";
    for (const path3 of paths) {
      const adjustedPath = path3.replaceAll("~1", "/");
      temporary = temporary[adjustedPath];
      lastPath = adjustedPath;
    }
    if (!temporary) {
      return "unknown";
    }
    return temporary.$ref ? _Base.ref2name(temporary.$ref, doc) : lastPath;
  }
  /**
   * Converts an API path to a function name.
   * @param path - The API endpoint path.
   * @param [method] - The HTTP method (e.g., GET, POST).
   * @param [operationId] - Unique identifier for the operation.
   * @returns - The generated function name.
   */
  static pathToFnName(path3, method, _operationId = "") {
    const name = _Base.normalize(_Base.camelCase(_Base.normalize(path3)));
    const suffix = method ? _Base.capitalize(_Base.upperCamelCase(`using_${method}`)) : "";
    return name + suffix;
  }
  /**
   * Normalizes a string by replacing special characters and avoiding TypeScript keywords.
   * @param text - Input text to normalize.
   * @returns - The normalized string.
   */
  static normalize(text) {
    if (typescriptKeywords.has(text)) {
      text += "_";
    }
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
    return text.split("_").filter(Boolean).map((t4, index) => index === 0 ? t4 : _Base.capitalize(t4)).join("");
  }
  /**
   * Converts a string to UpperCamelCase.
   * @param text - Input string.
   * @returns - UpperCamelCase string.
   */
  static upperCamelCase(text) {
    return _Base.normalize(text).replaceAll("...", "").split("_").filter(Boolean).map(_Base.capitalize).join("");
  }
  /**
   * Fetches documentation from a given URL.
   * @param url - The URL to fetch the documentation from.
   * @param requestInit - Additional request parameters.
   * @returns - A promise resolving to the fetched documentation data.
   */
  static async fetchDoc(url, requestInit = {}) {
    const agent = new Agent({
      connect: { rejectUnauthorized: false }
    });
    const { body, statusCode } = await request(url, {
      method: "GET",
      dispatcher: agent,
      ...requestInit
    });
    if (statusCode >= 400) {
      throw new Error(`Failed to fetch OpenAPI documentation from ${url}: HTTP ${statusCode}`);
    }
    try {
      return body.json();
    } catch (error) {
      throw new Error(
        `Failed to parse JSON response from ${url}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  /**
   * Determines the media type from a given media type string.
   * @param mediaType - The media type string to evaluate.
   * @returns - The matched MediaTypes or null.
   */
  static getMediaType(mediaType) {
    const mediaTypeValues = Object.values(MediaTypes);
    const found = mediaTypeValues.find((type) => mediaType.includes(type));
    return found;
  }
  /**
   * Checks if a schema is a valid enum type that isn't boolean.
   * @param a - The schema object to evaluate.
   * @returns - True if the schema is a valid non-boolean enum.
   */
  static isValidEnumType(a) {
    return a.type !== "boolean" && !_Base.isBooleanEnum(a);
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
      if (existing) {
        for (const value of e.enum) {
          existing.add(value);
        }
      } else {
        enumMap.set(e.name, new Set(e.enum));
      }
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
    return enums.find((b) => _Base.isSameEnum(b, a));
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

// src/core/base/Provider.ts
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

// src/core/generator/index.ts
import { writeFile } from "fs/promises";
import { format } from "prettier";
import {
  addSyntheticLeadingComment,
  createPrinter,
  NodeFlags,
  SyntaxKind,
  factory as t
} from "typescript";
var Generator = class _Generator {
  /**
   * Converts an array of TypeScript statements into a formatted string of code.
   *
   * @param statements - The array of TypeScript statement nodes.
   * @returns Formatted code as a string.
   * @throws {Error} If no valid statements are provided.
   */
  static toCode(statements) {
    if (statements.length === 0) {
      return "// No api declaration found.";
    }
    const sourceFile = t.createSourceFile(
      statements,
      t.createToken(SyntaxKind.EndOfFileToken),
      NodeFlags.None
    );
    return createPrinter().printFile(sourceFile);
  }
  static async write(code, filepath) {
    try {
      await writeFile(filepath, code);
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
  static toUrlTemplate(path3, parameters, basePath = "") {
    const queryParameters = parameters.filter((p) => p.in === "query" /* query */);
    if (queryParameters.length > 0) {
      const queryString = queryParameters.map(
        (qp, index) => `${index === 0 ? "?" : "&"}${encodeURIComponent(qp.name)}={${Base.camelCase(Base.normalize(qp.name))}}`
      ).join("");
      path3 += queryString;
    }
    const pathSegments = path3.replaceAll("{", "${").split("$").filter(Boolean);
    if (pathSegments.length === 1) {
      return t.createNoSubstitutionTemplateLiteral(basePath + path3);
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
          !isLastSegment ? t.createTemplateMiddle(match[2]) : t.createTemplateTail(match[2] || "")
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
  static addComments(node, comments) {
    if (!Array.isArray(comments) || comments.filter(Boolean).length === 0) return;
    const formatComment = (comment) => {
      return comment.tag ? ` @${comment.tag} ${comment.comment ?? ""}` : ` ${comment.comment}`;
    };
    const formattedComments = "*\n" + comments.map(formatComment).join("\n").trim() + "\n";
    addSyntheticLeadingComment(node, SyntaxKind.MultiLineCommentTrivia, formattedComments, true);
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
      return _Generator.isBinarySchema(arraySchema.items);
    }
    const nonArraySchema = schema;
    return nonArraySchema.format === "blob" /* blob */ || nonArraySchema.format === "binary" /* binary */ || nonArraySchema.type === "file" /* file */;
  }
  static toRequestBodyTypeNode(schema) {
    return t.createParameterDeclaration(
      void 0,
      void 0,
      t.createIdentifier("req"),
      void 0,
      _Generator.toTypeNode(schema)
    );
  }
  static toTypeNode(schema) {
    const { type, ref } = schema;
    if (ref) {
      const identify = Base.ref2name(ref);
      return t.createTypeReferenceNode(
        t.createIdentifier(identify === "unknown" ? identify : Base.upperCamelCase(identify))
      );
    }
    switch (type) {
      case "array" /* array */: {
        const { items } = schema;
        return t.createArrayTypeNode(_Generator.toTypeNode(items));
      }
      case "object" /* object */: {
        const propsCount = Object.keys(schema.properties ?? {}).length;
        if (!schema.properties || propsCount === 0) {
          return t.createTypeReferenceNode(t.createIdentifier("Record"), [
            t.createToken(SyntaxKind.StringKeyword),
            t.createToken(SyntaxKind.UnknownKeyword)
          ]);
        }
        const props = Object.keys(schema.properties);
        return t.createTypeLiteralNode(
          props.map((propKey) => {
            const propSchema = schema.properties[propKey];
            return t.createPropertySignature(
              void 0,
              t.createStringLiteral(propKey),
              // When field is required, a refrence or binary value, don't add question mark.
              schema.required || schema.ref || _Generator.isBinarySchema(schema) ? void 0 : t.createToken(SyntaxKind.QuestionToken),
              _Generator.toTypeNode(propSchema)
            );
          })
        );
      }
      case "integer" /* integer */:
      case "number" /* number */:
        if (schema.enum) {
          return t.createUnionTypeNode(
            schema.enum.map((e) => t.createLiteralTypeNode(t.createNumericLiteral(e)))
          );
        }
        return t.createToken(SyntaxKind.NumberKeyword);
      // case NonArraySchemaType.string:
      case "boolean" /* boolean */:
        return t.createToken(SyntaxKind.BooleanKeyword);
      case "file" /* file */:
        return t.createTypeReferenceNode(t.createIdentifier("Blob"));
      default: {
        const { format: format2, oneOf, allOf, anyOf, type: type2, enum: enum_ } = schema;
        switch (format2) {
          case "number" /* number */:
            return t.createToken(SyntaxKind.NumberKeyword);
          case "string" /* string */:
            return t.createToken(SyntaxKind.StringKeyword);
          case "boolean" /* boolean */:
            return t.createToken(SyntaxKind.BooleanKeyword);
          case "blob" /* blob */:
          case "binary" /* binary */:
            return t.createTypeReferenceNode(t.createIdentifier("Blob"));
          default:
        }
        if (enum_) {
          return t.createUnionTypeNode(
            enum_.map((e) => t.createLiteralTypeNode(t.createStringLiteral(e)))
          );
        }
        if (type2 === "string" /* string */) {
          return t.createToken(SyntaxKind.StringKeyword);
        }
        if (oneOf) {
          return t.createUnionTypeNode(oneOf.map((schema2) => _Generator.toTypeNode(schema2)));
        }
        if (anyOf) {
          return t.createUnionTypeNode(anyOf.map((schema2) => _Generator.toTypeNode(schema2)));
        }
        if (allOf) {
          return t.createIntersectionTypeNode(allOf.map((schema2) => _Generator.toTypeNode(schema2)));
        }
        if (type2 && typeof type2 === "string") {
          return t.createTypeReferenceNode(
            type2 !== "unknown" && type2 !== "null" ? t.createIdentifier(Base.upperCamelCase(type2)) : type2
          );
        }
      }
    }
    return t.createToken(SyntaxKind.UnknownKeyword);
  }
  static toDeclarationNodes(parameters) {
    const objectElements = [];
    const typeObjectElements = [];
    const refParameters = [];
    for (const parameter of parameters) {
      if (parameter.ref) {
        const refName = Base.ref2name(parameter.ref);
        refParameters.push(
          t.createParameterDeclaration(
            void 0,
            void 0,
            t.createIdentifier(Base.camelCase(Base.normalize(refName))),
            void 0,
            t.createTypeReferenceNode(
              t.createIdentifier(Base.upperCamelCase(Base.normalize(refName)))
            ),
            void 0
          )
        );
      } else {
        const { name, schema, required } = parameter;
        objectElements.push(
          t.createBindingElement(
            void 0,
            void 0,
            t.createIdentifier(Base.camelCase(Base.normalize(name)))
          )
        );
        typeObjectElements.push(
          t.createPropertySignature(
            [],
            t.createIdentifier(Base.camelCase(Base.normalize(name))),
            required ? void 0 : t.createToken(SyntaxKind.QuestionToken),
            !schema ? t.createToken(SyntaxKind.UnknownKeyword) : _Generator.toTypeNode(schema)
          )
        );
      }
    }
    if (objectElements.length > 0) {
      const objectParam = t.createParameterDeclaration(
        void 0,
        void 0,
        t.createObjectBindingPattern(objectElements),
        void 0,
        t.createTypeLiteralNode(typeObjectElements),
        void 0
      );
      return [objectParam, ...refParameters];
    }
    return refParameters;
  }
  static toFormDataStatement(parameters, requestBody) {
    const statements = [];
    const fdDeclaration = t.createVariableStatement(
      void 0,
      t.createVariableDeclarationList(
        [
          t.createVariableDeclaration(
            t.createIdentifier("fd"),
            void 0,
            void 0,
            t.createNewExpression(t.createIdentifier("FormData"), void 0, [])
          )
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
                t.createIdentifier("fd"),
                t.createIdentifier("append")
              ),
              void 0,
              [t.createStringLiteral(parameter.name), t.createIdentifier(parameter.name)]
            )
          )
        )
      );
    });
    if (requestBody && requestBody.type === "object" && requestBody.properties && Object.keys(requestBody.properties).length !== 0) {
      Object.keys(requestBody.properties).forEach((key) => {
        const schemaByKey = requestBody.properties[key];
        if (schemaByKey.type === "array" /* array */ && _Generator.isBinarySchema(schemaByKey)) {
          statements.push(
            t.createForOfStatement(
              void 0,
              t.createVariableDeclarationList(
                [t.createVariableDeclaration("file")],
                NodeFlags.Const
              ),
              t.createElementAccessExpression(
                t.createIdentifier("req"),
                t.createStringLiteral(key)
              ),
              t.createBlock([
                t.createExpressionStatement(
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append")
                    ),
                    [],
                    [
                      t.createStringLiteral(key),
                      t.createIdentifier("file"),
                      t.createPropertyAccessExpression(
                        t.createAsExpression(
                          t.createIdentifier("file"),
                          t.createTypeReferenceNode(t.createIdentifier("File"), void 0)
                        ),
                        t.createIdentifier("name")
                      )
                    ]
                  )
                )
              ])
            )
          );
        } else {
          if (schemaByKey.required) {
            statements.push(
              t.createExpressionStatement(
                t.createCallExpression(
                  t.createPropertyAccessExpression(
                    t.createIdentifier("fd"),
                    t.createIdentifier("append")
                  ),
                  void 0,
                  [
                    t.createStringLiteral(key),
                    schemaByKey.type === "string" ? t.createElementAccessExpression(
                      t.createIdentifier("req"),
                      t.createStringLiteral(key)
                    ) : t.createCallExpression(t.createIdentifier("String"), void 0, [
                      t.createElementAccessExpression(
                        t.createIdentifier("req"),
                        t.createStringLiteral(key)
                      )
                    ])
                  ]
                )
              )
            );
          } else {
            statements.push(
              t.createExpressionStatement(
                t.createBinaryExpression(
                  t.createElementAccessExpression(
                    t.createIdentifier("req"),
                    t.createStringLiteral(key)
                  ),
                  t.createToken(SyntaxKind.AmpersandAmpersandToken),
                  t.createCallExpression(
                    t.createPropertyAccessExpression(
                      t.createIdentifier("fd"),
                      t.createIdentifier("append")
                    ),
                    void 0,
                    [
                      t.createStringLiteral(key),
                      schemaByKey.type === "string" ? t.createElementAccessExpression(
                        t.createIdentifier("req"),
                        t.createStringLiteral(key)
                      ) : t.createCallExpression(t.createIdentifier("String"), void 0, [
                        t.createElementAccessExpression(
                          t.createIdentifier("req"),
                          t.createStringLiteral(key)
                        )
                      ])
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
  static bodyBlock(uri, method, parameters, requestBody, response, adapter) {
    const isFormDataRequest = requestBody && ["multipart/form-data", "application/x-www-form-urlencoded"].includes(requestBody.type);
    const shouldParseResponseToJSON = "application/json" === response?.type;
    const isRequestBodyBinary = requestBody?.schema && requestBody.schema.type === "array" /* array */ && _Generator.isBinarySchema(requestBody.schema);
    const parametersShouldPutInFormData = parameters.filter(
      (p) => p.in === "formData" /* formData */ || p.schema && _Generator.isBinarySchema(p.schema)
    );
    const parametersShouldNotPutInFormData = parameters.filter(
      (p) => !parametersShouldPutInFormData.includes(p)
    );
    const isRequestBodyContainsBinary = requestBody?.schema && "properties" in requestBody.schema && Object.values(requestBody.schema?.properties ?? {}).some((p) => _Generator.isBinarySchema(p));
    const hasBinaryInParameters = parameters.some(
      (p) => p?.schema && _Generator.isBinarySchema(p.schema)
    );
    const shouldPutParametersOrBodyInFormData = isFormDataRequest || isRequestBodyBinary || hasBinaryInParameters || isRequestBodyContainsBinary || parametersShouldPutInFormData.length > 0;
    return t.createBlock([
      ...shouldPutParametersOrBodyInFormData ? _Generator.toFormDataStatement(parametersShouldPutInFormData, requestBody?.schema) : [],
      ...adapter.client(
        uri,
        method,
        parametersShouldNotPutInFormData,
        requestBody,
        response,
        adapter,
        shouldPutParametersOrBodyInFormData,
        shouldParseResponseToJSON
      )
    ]);
  }
  static schemaToStatemets(parsedDoc, adaptor, options) {
    const statements = [];
    const { apis, schemas = {}, enums } = parsedDoc;
    const enumNames = [];
    for (const enumObject of enums) {
      enumNames.push(Base.upperCamelCase(enumObject.name));
      statements.push(
        t.createEnumDeclaration(
          [t.createToken(SyntaxKind.ExportKeyword)],
          t.createIdentifier(Base.upperCamelCase(enumObject.name)),
          enumObject.enum.map((member) => {
            return t.createEnumMember(
              t.createStringLiteral(typeof member === "string" ? member : `${member}_`),
              typeof member === "string" ? t.createStringLiteral(member) : t.createNumericLiteral(member)
            );
          })
        )
      );
    }
    for (const schemaKey in schemas) {
      if (Object.hasOwn(schemas, schemaKey) && !enumNames.includes(Base.upperCamelCase(schemaKey))) {
        const schema = schemas[schemaKey];
        statements.push(
          t.createTypeAliasDeclaration(
            [t.createModifier(SyntaxKind.ExportKeyword)],
            t.createIdentifier(Base.upperCamelCase(schemaKey)),
            void 0,
            _Generator.toTypeNode(schema)
          )
        );
      }
    }
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
          description
        } = operation;
        let { parameters = [] } = operation;
        parameters = parameters.filter((p) => p.in !== "cookie");
        if (requestBody.length === 0) {
          requestBody.push({ type: "application/json" /* JSON */ });
        }
        const shouldAddExtraMethodNameSuffix = requestBody.length > 1;
        for (const req of requestBody) {
          const statement = t.createFunctionDeclaration(
            [t.createModifier(SyntaxKind.ExportKeyword), t.createModifier(SyntaxKind.AsyncKeyword)],
            void 0,
            Base.pathToFnName(uri, method, operationId) + (shouldAddExtraMethodNameSuffix ? Base.capitalize(req.type.split("/")[1]) : ""),
            void 0,
            [
              ...parameters.length > 0 ? _Generator.toDeclarationNodes(parameters) : [],
              ...req?.schema ? [_Generator.toRequestBodyTypeNode(req.schema)] : []
            ].filter(Boolean),
            void 0,
            _Generator.bodyBlock(
              options.baseURL + uri,
              method,
              parameters,
              req,
              responses[0],
              adaptor
            )
          );
          _Generator.addComments(
            statement,
            [
              description && {
                comment: description
              },
              summary && {
                comment: summary
              },
              deprecated && {
                tag: "deprecated"
              }
            ].filter(Boolean)
          );
          statements.push(statement);
        }
      }
    }
    return statements;
  }
  static async prettier(code) {
    return await format(code, {
      parser: "typescript"
    });
  }
  static async genCode(schema, initOptions, adaptor) {
    const { importClientSource } = initOptions;
    const statements = _Generator.schemaToStatemets(schema, adaptor, {
      baseURL: initOptions.baseURL ?? ""
    });
    let code = _Generator.toCode(statements);
    if (importClientSource) {
      code = importClientSource + "\n\n" + code;
    }
    return await _Generator.prettier(code);
  }
};

// src/core/client/axios.ts
import { factory as t2 } from "typescript";
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
    const toLiterlExpression = () => {
      return t2.createObjectLiteralExpression(
        [
          // Set the HTTP method
          t2.createPropertyAssignment(
            t2.createIdentifier(adapter.methodFieldName),
            t2.createStringLiteral(method.toUpperCase())
          )
        ].concat(
          // Add headers if there are any
          inHeader.length > 0 ? t2.createPropertyAssignment(
            t2.createIdentifier(adapter.headersFieldName),
            t2.createObjectLiteralExpression(
              inHeader.map(
                (p) => t2.createPropertyAssignment(
                  t2.createStringLiteral(p.name),
                  t2.createCallExpression(
                    t2.createIdentifier("encodeURIComponent"),
                    void 0,
                    [
                      t2.createCallExpression(t2.createIdentifier("String"), void 0, [
                        t2.createIdentifier(Base.camelCase(Base.normalize(p.name)))
                      ])
                    ]
                  )
                )
              )
            )
          ) : []
        ).concat(
          shouldUseFormData || inBody.length > 0 || requestBody?.schema ? t2.createPropertyAssignment(
            t2.createIdentifier(adapter.bodyFieldName),
            shouldUseFormData ? t2.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? t2.createIdentifier("req") : t2.createIdentifier("req")
          ) : []
        ),
        true
      );
    };
    statements.push(
      t2.createReturnStatement(
        t2.createCallExpression(
          t2.createIdentifier(adapter.name),
          response?.schema ? [Generator.toTypeNode(response.schema)] : void 0,
          [Generator.toUrlTemplate(uri, parameters), toLiterlExpression()]
        )
      )
    );
    return statements;
  }
};

// src/core/client/fetch.ts
import { SyntaxKind as SyntaxKind2, factory as t3 } from "typescript";
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
    const toLiterlExpression = () => {
      return t3.createObjectLiteralExpression(
        [
          // Set the HTTP method
          t3.createPropertyAssignment(
            t3.createIdentifier(adapter.methodFieldName),
            t3.createStringLiteral(method.toUpperCase())
          )
        ].concat(
          // Add headers if there are any
          inHeader.length > 0 ? t3.createPropertyAssignment(
            t3.createIdentifier(adapter.headersFieldName),
            t3.createObjectLiteralExpression(
              inHeader.map(
                (p) => t3.createPropertyAssignment(
                  t3.createStringLiteral(p.name),
                  t3.createCallExpression(
                    t3.createIdentifier("encodeURIComponent"),
                    void 0,
                    [
                      t3.createCallExpression(t3.createIdentifier("String"), void 0, [
                        t3.createIdentifier(Base.camelCase(Base.normalize(p.name)))
                      ])
                    ]
                  )
                )
              )
            )
          ) : []
        ).concat(
          shouldUseFormData || inBody.length > 0 || requestBody?.schema ? t3.createPropertyAssignment(
            t3.createIdentifier(adapter.bodyFieldName),
            shouldUseFormData ? t3.createIdentifier("fd") : inBody.length > 0 || requestBody?.schema && !Generator.isBinarySchema(requestBody.schema) ? t3.createCallExpression(
              t3.createPropertyAccessExpression(
                t3.createIdentifier("JSON"),
                t3.createIdentifier("stringify")
              ),
              [],
              [
                requestBody ? t3.createIdentifier("req") : t3.createObjectLiteralExpression(
                  inBody.map(
                    (b) => t3.createShorthandPropertyAssignment(t3.createIdentifier(b.name))
                  ),
                  true
                )
              ]
            ) : (
              // One File parameter
              t3.createIdentifier("req")
            )
          ) : []
        ),
        true
      );
    };
    statements.push(
      t3.createReturnStatement(
        shouldUseJSONResponse ? (
          // Handle JSON response with proper type checking
          t3.createCallExpression(
            t3.createPropertyAccessExpression(
              t3.createCallExpression(t3.createIdentifier(adapter.name), void 0, [
                Generator.toUrlTemplate(uri, parameters),
                toLiterlExpression()
              ]),
              t3.createIdentifier("then")
            ),
            void 0,
            [
              t3.createArrowFunction(
                [t3.createModifier(SyntaxKind2.AsyncKeyword)],
                [],
                [
                  t3.createParameterDeclaration(
                    void 0,
                    void 0,
                    t3.createIdentifier("response")
                  )
                ],
                void 0,
                t3.createToken(SyntaxKind2.EqualsGreaterThanToken),
                response?.schema ? t3.createAsExpression(
                  t3.createParenthesizedExpression(
                    t3.createAwaitExpression(
                      t3.createCallExpression(
                        t3.createPropertyAccessExpression(
                          t3.createIdentifier("response"),
                          t3.createIdentifier("json")
                        ),
                        void 0,
                        []
                      )
                    )
                  ),
                  response?.schema ? Generator.toTypeNode(response.schema) : t3.createToken(SyntaxKind2.UnknownKeyword)
                ) : t3.createParenthesizedExpression(
                  t3.createAwaitExpression(
                    t3.createCallExpression(
                      t3.createPropertyAccessExpression(
                        t3.createIdentifier("response"),
                        t3.createIdentifier("json")
                      ),
                      void 0,
                      []
                    )
                  )
                )
              )
            ]
          )
        ) : (
          // Simple fetch call without JSON parsing
          t3.createCallExpression(t3.createIdentifier(adapter.name), void 0, [
            Generator.toUrlTemplate(uri, parameters),
            toLiterlExpression()
          ])
        )
      )
    );
    return statements;
  }
};

// src/openapi/index.ts
import { createScopedLogger } from "@moccona/logger";

// src/openapi/V2.ts
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
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      if (!this.doc.definitions) {
        this.doc.definitions = {};
      }
      schema = this.doc.definitions[Base.ref2name(schema.$ref, this.doc)];
    }
    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }
  /**
   * Transform all OpenAPI schema to Base Schema
   */
  toBaseSchema(schema, enums = [], schemaKey = "", upLevelSchemaKey = "") {
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey));
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc))
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
          };
        }, {})
      };
    }
  }
  /**
   * OpenAPI parameter to base parameter.
   */
  getParameterByRef(parameter, enums = [], upLevelSchemaKey = "") {
    if (Base.isRef(parameter)) {
      parameter = this.doc.parameters?.[Base.ref2name(parameter.$ref, this.doc)];
    }
    const { name, required, description, type, items, enum: enum_, properties, schema } = parameter;
    if (enum_) {
      const type2 = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
      const enumSchema = {
        name: type2,
        enum: [...new Set(enum_)]
      };
      const sameEnum = Base.findSameSchema(enumSchema, enums);
      if (!sameEnum && Base.isValidEnumType({ type: type2, enum: enum_ })) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type: sameEnum?.name ?? type2
        }
      };
    }
    if (items) {
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type,
          items
        }
      };
    }
    if (schema && Base.isRef(schema)) {
      return {
        name,
        required,
        description,
        in: parameter.in,
        schema: {
          type: Base.capitalize(Base.ref2name(schema.$ref))
        }
      };
    }
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
    if (Base.isRef(schema)) {
      schema = this.doc.responses[Base.ref2name(schema.$ref, this.doc)];
    }
    const { schema: responseSchema } = schema;
    return [
      {
        type: "application/json" /* JSON */,
        schema: responseSchema && this.getSchemaByRef(responseSchema, true)
      }
    ];
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
    const apis = Object.keys(paths).reduce((acc, path3) => {
      let pathObject = paths[path3] ?? {};
      if (pathObject.$ref) {
        const resolved = this.resolvePathRef(pathObject.$ref);
        if (resolved) {
          pathObject = resolved;
        }
      }
      const { parameters = [] } = pathObject;
      const methodApis = [];
      Object.values(HttpMethods).forEach((method) => {
        const methodObject = pathObject[method];
        if (methodObject) {
          const {
            deprecated,
            operationId,
            summary: summary_,
            description: description_,
            responses: responses2 = {}
          } = methodObject;
          const { parameters: parameters_ = [] } = methodObject;
          const baseParameters = [...parameters, ...parameters_].map(
            (parameter) => this.getParameterByRef(parameter, enums)
          );
          const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
          if (Object.keys(responses2).length === 0) {
            Object.assign(responses2, {
              200: {
                description: "Successful response"
              }
            });
          }
          const inBody = baseParameters.filter((p) => p.in === "body" || p.in === "formData");
          const notInBody = baseParameters.filter((p) => p.in !== "body" && p.in !== "formData");
          const httpCodes = Object.keys(responses2);
          for (const code of httpCodes) {
            if (code in responses2) {
              const response = responses2[code];
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
                requestBody: inBody.length > 0 ? inBodyOnlyHasBody ? [
                  {
                    type: "application/json" /* JSON */,
                    schema: inBody[0].schema
                  }
                ] : [
                  {
                    type: "application/json" /* JSON */,
                    schema: {
                      type: "object" /* object */,
                      properties: inBody.reduce((a, p) => {
                        return {
                          ...a,
                          [p.name]: {
                            type: p.schema?.type ?? "unknown",
                            required: p.schema?.required,
                            // @ts-expect-error items can be undefined
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            items: p.schema?.items,
                            description: p.schema?.description
                          }
                        };
                      }, {})
                    }
                  }
                ] : void 0
              });
              break;
            }
          }
        }
      });
      return {
        ...acc,
        [path3]: methodApis
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

// src/openapi/V3.ts
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
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      const resolvedSchema = this.doc.components?.schemas?.[Base.ref2name(schema.$ref, this.doc)];
      if (!resolvedSchema) {
        return { type: "unknown" };
      }
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
      if (!resolvedSchema) {
        return {
          name: "unknown",
          in: "query"
        };
      }
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
      if (!sameEnum && Base.isValidEnumType(parameterSchema)) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        deprecated,
        in: schema.in,
        schema: {
          type: sameEnum?.name ?? type
        }
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
      if (!resolvedSchema) {
        return [];
      }
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
      if (!resolvedSchema) {
        return [];
      }
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
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey));
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description,
          deprecated
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc))
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
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
    const apis = Object.keys(paths).reduce((acc, path3) => {
      let pathObject = paths[path3] ?? {};
      if (pathObject.$ref) {
        const resolved = this.resolvePathRef(pathObject.$ref);
        if (resolved) {
          pathObject = resolved;
        }
      }
      const { parameters: parameters2 = [], description, summary } = pathObject;
      const methodApis = [];
      Object.values(HttpMethods).forEach((method) => {
        const methodObject = pathObject[method];
        if (methodObject) {
          const {
            deprecated,
            operationId,
            responses: responses2 = {},
            summary: summary_,
            description: description_,
            requestBody = { content: {} }
          } = methodObject;
          const { parameters: parameters_2 = [] } = methodObject;
          const baseParameters = [...parameters2, ...parameters_2].map(
            (parameter) => this.getParameterByRef(parameter, enums)
          );
          const baseRequestBody = this.getRequestBodyByRef(requestBody, enums);
          const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
          if (Object.keys(responses2).length === 0) {
            Object.assign(responses2, {
              200: {
                description: "Successful response"
              }
            });
          }
          const httpCodes = Object.keys(responses2);
          for (const code of httpCodes) {
            if (code in responses2) {
              const response = responses2[code];
              const responseSchema = this.getResponseByRef(response);
              methodApis.push({
                method,
                operationId,
                summary: summary_ ?? summary,
                description: description_ ?? description,
                deprecated,
                parameters: uniqueParameterName.map(
                  (name) => baseParameters.find((p) => p.name === name)
                ),
                responses: responseSchema,
                requestBody: baseRequestBody
              });
              break;
            }
          }
        }
      });
      return {
        ...acc,
        [path3]: methodApis
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

// src/openapi/V3_1.ts
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
      if (reserveRef) {
        return {
          type: upLevelSchemaKey + refName
        };
      }
      if (!this.doc.components) {
        this.doc.components = {
          schemas: {}
        };
      }
      schema = this.doc.components.schemas?.[Base.ref2name(schema.$ref, this.doc)];
    }
    return this.toBaseSchema(schema, enums, "", upLevelSchemaKey + refName);
  }
  /**
   * OpenAPI parameter to base parameter.
   */
  getParameterByRef(schema, enums = [], upLevelSchemaKey = "") {
    if (Base.isRef(schema)) {
      schema = this.doc.components?.parameters?.[Base.ref2name(schema.$ref, this.doc)];
    }
    const { name, required, deprecated, description, schema: parameterSchema } = schema;
    if (parameterSchema && !Base.isRef(parameterSchema) && parameterSchema.enum) {
      const type = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(name));
      const enumSchema = {
        name: type,
        enum: [...new Set(parameterSchema.enum)]
      };
      const sameEnum = Base.findSameSchema(enumSchema, enums);
      if (!sameEnum && Base.isValidEnumType(parameterSchema)) {
        enums.push(enumSchema);
      }
      return {
        name,
        required,
        description,
        deprecated,
        in: schema.in,
        schema: {
          type: sameEnum?.name ?? type
        }
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
      schema = this.doc.components?.responses?.[Base.ref2name(schema.$ref, this.doc)];
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
      schema = this.doc.components?.requestBodies?.[Base.ref2name(schema.$ref, this.doc)];
    }
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
    if (!schema) {
      return {
        type: "unknown"
      };
    }
    if (Base.isRef(schema)) {
      return this.getSchemaByRef(schema, true);
    }
    if (this.isOpenAPIArraySchema(schema)) {
      const { type, description, items, required } = schema;
      return {
        type,
        required: !!required,
        description,
        items: this.toBaseSchema(items, enums, schemaKey, upLevelSchemaKey)
      };
    } else {
      const {
        required = [],
        allOf,
        anyOf,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        oneOf,
        properties = {}
      } = schema;
      let { type } = schema;
      if (enum_ && type !== "boolean") {
        const name = Base.upperCamelCase(Base.normalize(upLevelSchemaKey)) + Base.upperCamelCase(Base.normalize(schemaKey));
        const enumObject = {
          name,
          enum: [...new Set(enum_)]
        };
        const sameObject = Base.findSameSchema(enumObject, enums);
        if (!sameObject && Base.isValidEnumType(schema)) {
          enums.push(enumObject);
        }
        return {
          type: sameObject ? sameObject.name : Base.isBooleanEnum(schema) ? "boolean" : enumObject.name,
          required,
          description,
          deprecated
        };
      }
      if (type === void 0 && Object.keys(properties).length > 0) {
        type = "object" /* object */;
      }
      return {
        type,
        required,
        description,
        deprecated,
        enum: enum_,
        format: format2,
        allOf: allOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        anyOf: anyOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        oneOf: oneOf?.map(
          (s) => Base.isRef(s) ? {
            ...s,
            ref: s.$ref,
            type: Base.capitalize(Base.ref2name(s.$ref, this.doc))
          } : this.toBaseSchema(s, enums)
        ),
        properties: Object.keys(properties).reduce((acc, p) => {
          const propSchema = properties[p];
          return {
            ...acc,
            [p]: Base.isRef(propSchema) ? {
              type: Base.capitalize(Base.ref2name(propSchema.$ref, this.doc))
            } : this.toBaseSchema(propSchema, enums, p, upLevelSchemaKey)
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
    const apis = Object.keys(paths).reduce((acc, path3) => {
      let pathObject = paths[path3] ?? {};
      if (pathObject.$ref) {
        const resolved = this.resolvePathRef(pathObject.$ref);
        if (resolved) {
          pathObject = resolved;
        }
      }
      const { parameters: parameters2 = [], description, summary } = pathObject;
      const methodApis = [];
      Object.values(HttpMethods).forEach((method) => {
        const methodObject = pathObject[method];
        if (methodObject) {
          const {
            deprecated,
            operationId,
            summary: summary_,
            description: description_,
            responses: responses2 = {},
            requestBody = { content: {} }
          } = methodObject;
          const { parameters: parameters_2 = [] } = methodObject;
          const baseParameters = [...parameters2, ...parameters_2].map(
            (parameter) => this.getParameterByRef(parameter, enums)
          );
          const baseRequestBody = this.getRequestBodyByRef(requestBody, enums);
          const uniqueParameterName = [...new Set(baseParameters.map((p) => p.name))];
          if (Object.keys(responses2).length === 0) {
            Object.assign(responses2, {
              200: {
                description: "Successful response"
              }
            });
          }
          const httpCodes = Object.keys(responses2);
          for (const code of httpCodes) {
            if (code in responses2) {
              const response = responses2[code];
              const responseSchema = this.getResponseByRef(response);
              methodApis.push({
                method,
                operationId,
                summary: summary_ ?? summary,
                description: description_ ?? description,
                deprecated,
                parameters: uniqueParameterName.map(
                  (name) => baseParameters.find((p) => p.name === name)
                ),
                responses: responseSchema,
                requestBody: baseRequestBody
              });
              break;
            }
          }
        }
      });
      return {
        ...acc,
        [path3]: methodApis
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

// src/openapi/index.ts
var logger = createScopedLogger("OpenAPI");
function getDocVersion(doc) {
  const version2 = (doc.openapi || doc.swagger).slice(0, 3);
  switch (version2) {
    case "3.1":
      return "v3_1" /* v3_1 */;
    case "3.0":
      return "v3" /* v3 */;
    case "2.0":
      return "v2" /* v2 */;
    default:
      return "unknown" /* unknown */;
  }
}
var OpenAPIProvider = class extends Provider {
  parse(doc) {
    const version2 = getDocVersion(doc);
    logger.debug(`openapi version ${version2}`);
    switch (version2) {
      case "v2" /* v2 */:
        return new V2(doc).init();
      case "v3" /* v3 */:
        return new V3(doc).init();
      case "v3_1" /* v3_1 */:
        return new V3_1(doc).init();
      default:
        throw new Error(`Not a valid OpenAPI version: ${version2}`);
    }
  }
};
function getAdaptor(type) {
  switch (type) {
    case "axios" /* axios */:
      return new AxiosAdapter();
    default:
      return new FetchAdapter();
  }
}
async function codeGen(initOptions) {
  const { verbose } = initOptions;
  if (verbose) {
    logger.setLevel("debug");
  } else {
    logger.setLevel("info");
  }
  logger.info(`Fetch document from ${initOptions.docURL}`);
  const doc = await Base.fetchDoc(initOptions.docURL, initOptions.requestOptions);
  const provider = new OpenAPIProvider(initOptions, doc);
  const { enums, schemas, parameters, responses, requestBodies, apis } = provider;
  const adaptor = getAdaptor(initOptions.adaptor ?? "fetch" /* fetch */);
  const code = await Generator.genCode(
    {
      enums,
      schemas,
      parameters,
      responses,
      requestBodies,
      apis
    },
    initOptions,
    adaptor
  );
  if (initOptions.output) {
    await Generator.write(code, initOptions.output);
  }
  return code;
}

// src/cli.ts
import { createCommand } from "commander";
import fs2 from "fs-extra";

// package.json
var version = "0.0.3";

// src/cli.ts
async function watchAndGenerate(options) {
  const { createWatch } = await import("vite");
  let watcher = null;
  const generate = async () => {
    try {
      await codeGen(options);
      console.log(`\x1B[32m\u2713\x1B[0m Regenerated: ${options.output}`);
    } catch (error) {
      console.error(formatError(error, true));
    }
  };
  const patterns = [options.docURL].filter(Boolean);
  watcher = createWatch(patterns, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  });
  watcher.on("change", async (filePath) => {
    console.log(`\x1B[33m\u2193\x1B[0m File changed: ${filePath}`);
    await generate();
  });
  watcher.on("add", async (filePath) => {
    console.log(`\x1B[32m+\x1B[0m File added: ${filePath}`);
    await generate();
  });
  return watcher;
}
function resolveDocURL(docURL, baseURL) {
  if (docURL.startsWith("http://") || docURL.startsWith("https://")) {
    return docURL;
  }
  if (docURL.startsWith("/") || docURL.match(/^[A-Za-z]:/)) {
    return `file://${docURL}`;
  }
  if (baseURL) {
    return new URL(docURL, baseURL).href;
  }
  return path2.resolve(process.cwd(), docURL);
}
async function validateSpecPath(specPath) {
  if (specPath.startsWith("http://") || specPath.startsWith("https://")) {
    return;
  }
  const filePath = specPath.replace(/^file:\/\//, "");
  const absolutePath = path2.isAbsolute(filePath) ? filePath : path2.resolve(process.cwd(), filePath);
  const exists = await fs2.pathExists(absolutePath);
  if (!exists) {
    throw createErrors.specNotFound(absolutePath);
  }
}
var cli = createCommand("apicodegen");
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
  if (specArg) {
    cliOptions.spec = specArg;
  }
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
      console.log("\x1B[33m\u{1F504}\x1B[0m Watching for changes...");
      const watchPatterns = [];
      if (!resolvedDocURL.startsWith("http")) {
        const docPath = resolvedDocURL.replace(/^file:\/\//, "");
        const dir = path2.dirname(docPath);
        watchPatterns.push(`${dir}/**/*.json`, `${dir}/**/*.yaml`, `${dir}/**/*.yml`);
      }
      const watcher = await watchAndGenerate(codeGenOptions);
      const shutdown = async () => {
        console.log("\n\x1B[90m\u{1F44B} Shutting down...\x1B[0m");
        if (watcher) {
          await watcher.close();
        }
        process.exit(0);
      };
      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    } else {
      await codeGen(codeGenOptions);
      console.log(`\x1B[32m\u2713\x1B[0m Generated: ${config.output}`);
    }
  } catch (error) {
    if (isApicodegenError(error)) {
      console.error(formatError(error, options.verbose));
    } else {
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
