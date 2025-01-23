/**
 * Simple represenration for
 */
export type JSONValue = {
  [K: string]:
    | string
    | number
    | boolean
    | JSONValue
    | (string | number | boolean | JSONValue)[];
};

export enum SchemaType {
  schemas = "schemas",
  parameters = "parameters",
  responses = "responses",
  requestBodies = "requestBodies",
}

export enum NonArraySchemaType {
  "object" = "object",
  "string" = "string",
  "number" = "number",
  "boolean" = "boolean",
  "integer" = "integer",
  "null" = "null",
}

export enum ArraySchemaType {
  "array" = "array",
}

export enum SchemaFormatType {
  "string" = "string",
  "number" = "number",
  "boolean" = "boolean",
  "File" = "File",
  "null" = "null",
  "binary" = "binary",
}

export enum ParameterIn {
  "header" = "header",
  "body" = "body",
  "query" = "query",
  "cookie" = "cookie",
  "path" = "path",
  "formData" = "formData",
}

export interface SingleTypeSchemaObject {
  name: string;
  type: keyof typeof NonArraySchemaType;
  allOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  deprecated?: boolean;
  enum?: (string | number)[];
  format?: keyof typeof SchemaFormatType;
  oneOf?: SchemaObject[];
  properties?: Record<string, SchemaObject>;
  readonly?: boolean;
  required?: boolean;
  ref?: string;
}
export interface ArrayTypeSchemaObject {
  name: string;
  type: keyof typeof ArraySchemaType;
  items: SchemaObject;
  required?: boolean;
  ref?: string;
}

export type SchemaObject = SingleTypeSchemaObject | ArrayTypeSchemaObject;

export type ParameterObject = {
  name: string;
  in: keyof typeof ParameterIn;
  schema?: SchemaObject;
  required?: boolean;
  description?: string;
  ref?: string;
};

export enum ResponseType {
  JSON = "application/json",
  TEXT = "text",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
}

export type ResponseObject = {
  type: ResponseType;
  schema: SchemaObject;
};

export type ResponsesObject = Record<string, ResponseObject>;

export type RequestBodyObject = {
  schema: SchemaObject;
};

export type RequestBodiesObject = Record<string, RequestBodyObject>;

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
  "bigint",
]);

export abstract class Base {
  abstract name: string;

  protected constructor() {
    if (new.target === Base) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  static ref2name(ref: string) {
    if (ref.includes("~")) {
      return "unknown";
    }

    return ref.split("/").pop() ?? "unknown";
  }

  static normalize(text: string) {
    if (typescriptKeywords.has(text)) {
      text += "_";
    }
    return text.replace(/[/\-_{}():\s`,*<>$]/gm, "_").replaceAll("...", "");
  }

  static capitalize(text: string) {
    text = text.trim();
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }

  static camelCase(text: string) {
    text = text.trim();
    return text
      .split("_")
      .filter(Boolean)
      .map((t, index) => (index === 0 ? t : this.capitalize(t)))
      .join("");
  }

  static upperCamelCase(text: string) {
    return this.normalize(text)
      .replaceAll("...", "")
      .split("_")
      .filter(Boolean)
      .map(this.capitalize)
      .join("");
  }
}
