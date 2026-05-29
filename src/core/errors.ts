/**
 * Error handling utilities for api-codegen
 */

// Error codes
export const ErrorCodes = {
  SPEC_NOT_FOUND: "E_SPEC_NOT_FOUND",
  SPEC_FETCH_FAILED: "E_SPEC_FETCH_FAILED",
  SPEC_PARSE_FAILED: "E_SPEC_PARSE_FAILED",
  OUTPUT_DIR_MISSING: "E_OUTPUT_DIR_MISSING",
  CONFIG_INVALID: "E_CONFIG_INVALID",
  VALIDATION_FAILED: "E_VALIDATION_FAILED",
  GENERATION_FAILED: "E_GENERATION_FAILED",
  TYPE_CHECK_FAILED: "E_TYPE_CHECK_FAILED",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

/**
 * Error context for ApicodegenError
 */
export interface ApicodegenErrorContext {
  /** Error code */
  code: ErrorCode;
  /** Human readable message */
  message: string;
  /** File/URL related to error */
  location?: string;
  /** Line number if applicable */
  line?: number;
  /** Column number if applicable */
  column?: number;
  /** Related schema/path if applicable */
  path?: string;
  /** Suggested fixes */
  suggestions?: string[];
  /** Original error */
  cause?: Error;
}

/**
 * Custom error class for api-codegen with rich context
 */
export class ApicodegenError extends Error {
  readonly code: ErrorCode;
  readonly location?: string;
  readonly line?: number;
  readonly column?: number;
  readonly path?: string;
  readonly suggestions: string[];
  readonly cause?: Error;

  constructor(context: ApicodegenErrorContext) {
    super(context.message);
    this.name = "ApicodegenError";
    this.code = context.code;
    this.location = context.location;
    this.line = context.line;
    this.column = context.column;
    this.path = context.path;
    this.suggestions = context.suggestions || [];
    this.cause = context.cause;

    // Maintains proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApicodegenError);
    }
  }

  /**
   * Convert error to formatted string for CLI output
   */
  toString(verbose = false): string {
    const lines: string[] = [];

    // Error header with code
    lines.push(`\x1b[1;31mError [${this.code}]\x1b[0m ${this.message}`);

    // Location
    if (this.location) {
      lines.push(`  \x1b[36m→ Location:\x1b[0m ${this.location}`);
    }

    // Path
    if (this.path) {
      lines.push(`  \x1b[36m→ Path:\x1b[0m ${this.path}`);
    }

    // Line/column
    if (this.line !== undefined) {
      let lineInfo = `  \x1b[36m→ Line:\x1b[0m ${this.line}`;
      if (this.column !== undefined) {
        lineInfo += `, Column: ${this.column}`;
      }
      lines.push(lineInfo);
    }

    // Suggestions
    if (this.suggestions.length > 0) {
      for (const suggestion of this.suggestions) {
        lines.push(`  \x1b[32m→ Suggestion:\x1b[0m ${suggestion}`);
      }
    }

    // Stack trace in verbose mode
    if (verbose && this.cause) {
      lines.push(`\n  \x1b[90mOriginal Error:\x1b[0m ${this.cause.message}`);
      if (this.stack) {
        // Skip first few lines of stack (our error header)
        const stackLines = this.stack.split("\n").slice(1).join("\n");
        lines.push(`\x1b[90m${stackLines}\x1b[0m`);
      }
    }

    return lines.join("\n");
  }

  /**
   * Convert to JSON-serializable object
   */
  toJSON(): object {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      location: this.location,
      line: this.line,
      column: this.column,
      path: this.path,
      suggestions: this.suggestions,
      cause: this.cause?.message,
    };
  }
}

/**
 * ANSI color codes for terminal output
 */
export const Colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
} as const;

/**
 * Format error for CLI output
 */
export function formatError(error: unknown, verbose = false): string {
  if (error instanceof ApicodegenError) {
    return error.toString(verbose);
  }

  if (error instanceof Error) {
    return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${error.message}${verbose && error.stack ? `\n\n${Colors.gray}${error.stack}${Colors.reset}` : ""}`;
  }

  return `${Colors.red}${Colors.bold}Error${Colors.reset}: ${String(error)}`;
}

/**
 * Print error to console with formatting
 */
export function printError(
  error: unknown,
  verbose = false,
  stream: NodeJS.WriteStream = process.stderr,
): void {
  stream.write(formatError(error, verbose));
  stream.write("\n");
}

/**
 * Create error with common patterns
 */
export const createErrors = {
  specNotFound(path: string, cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.SPEC_NOT_FOUND,
      message: "OpenAPI spec file not found",
      location: path,
      suggestions: [
        "Check if the file exists using 'ls -la'",
        "Use --spec to provide the correct path",
        "For remote specs, ensure the URL is accessible",
      ],
      cause,
    });
  },

  specFetchFailed(url: string, statusCode?: number, cause?: Error): ApicodegenError {
    const message = statusCode
      ? `Failed to fetch OpenAPI spec (HTTP ${statusCode})`
      : "Failed to fetch OpenAPI spec from URL";

    return new ApicodegenError({
      code: ErrorCodes.SPEC_FETCH_FAILED,
      message,
      location: url,
      suggestions: [
        "Check if the URL is accessible in a browser",
        "Download the spec file locally and use the local path",
        "Verify CORS settings if fetching from a different origin",
      ],
      cause,
    });
  },

  specParseFailed(path: string, line?: number, column?: number, cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.SPEC_PARSE_FAILED,
      message: "Failed to parse OpenAPI spec (invalid JSON or YAML)",
      location: path,
      line,
      column,
      suggestions: [
        "Validate JSON syntax using jsonlint.com",
        "For YAML specs, ensure proper indentation",
        "Check for trailing commas or unquoted special characters",
      ],
      cause,
    });
  },

  outputDirMissing(path: string, cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.OUTPUT_DIR_MISSING,
      message: "Output directory does not exist",
      location: path,
      suggestions: [
        "Create the directory: mkdir -p $(dirname <output>)",
        "Check if the path is correct",
      ],
      cause,
    });
  },

  configInvalid(path: string, cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.CONFIG_INVALID,
      message: "Invalid configuration file",
      location: path,
      suggestions: [
        "Validate JSON syntax in the config file",
        "Check for required fields (spec, output)",
      ],
      cause,
    });
  },

  validationFailed(path: string, details: string, cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.VALIDATION_FAILED,
      message: "OpenAPI spec validation failed",
      location: path,
      path: details,
      suggestions: [
        "Check OpenAPI spec structure at the specified path",
        "Ensure all required fields are present",
        "Validate using swagger.io editor",
      ],
      cause,
    });
  },

  generationFailed(cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.GENERATION_FAILED,
      message: "Code generation failed",
      suggestions: [
        "Check for unsupported OpenAPI features",
        "Ensure spec follows OpenAPI 2.0, 3.0, or 3.1 specification",
        "Use --verbose for more details",
      ],
      cause,
    });
  },

  typeCheckFailed(path: string, errors: string[], cause?: Error): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.TYPE_CHECK_FAILED,
      message: "TypeScript type check failed",
      location: path,
      suggestions: [
        "Review type errors above",
        "Check for schema inconsistencies",
        "Update generated types or fix source schema",
      ],
      cause,
    });
  },

  missingRequiredField(field: string, context?: string): ApicodegenError {
    return new ApicodegenError({
      code: ErrorCodes.VALIDATION_FAILED,
      message: `Missing required field: ${field}`,
      path: context,
      suggestions: [`Add the '${field}' field to your configuration`],
    });
  },
};

/**
 * Wrap unknown error in ApicodegenError if needed
 */
export function wrapError(
  error: unknown,
  context?: Partial<ApicodegenErrorContext>,
): ApicodegenError {
  if (error instanceof ApicodegenError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApicodegenError({
      code: context?.code || ErrorCodes.GENERATION_FAILED,
      message: context?.message || error.message,
      location: context?.location,
      suggestions: context?.suggestions,
      cause: error,
    });
  }

  return new ApicodegenError({
    code: context?.code || ErrorCodes.GENERATION_FAILED,
    message: String(error),
    suggestions: context?.suggestions,
  });
}

/**
 * Check if error is an ApicodegenError
 */
export function isApicodegenError(error: unknown): error is ApicodegenError {
  return error instanceof ApicodegenError;
}
