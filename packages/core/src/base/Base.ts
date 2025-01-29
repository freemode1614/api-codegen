import { createScopedLogger } from "@moccona/logger";
import { request, Agent } from "undici";

const logger = createScopedLogger("Base");

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
}

export enum ArraySchemaType {
  "array" = "array",
}

export enum SchemaFormatType {
  "string" = "string",
  "number" = "number",
  "boolean" = "boolean",
  "File" = "File",
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

export interface ReferenceObject {
  $ref: string;
}

export interface SingleTypeSchemaObject {
  type: keyof typeof NonArraySchemaType | string;
  description?: string;
  allOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  deprecated?: boolean;
  enum?: (string | number)[];
  format?: keyof typeof SchemaFormatType;
  oneOf?: SchemaObject[];
  properties?: Record<string, SchemaObject>;
  readonly?: boolean;
  required?: string[] | boolean;
  ref?: string;
}

export interface ArrayTypeSchemaObject {
  type: keyof typeof ArraySchemaType;
  items?: SchemaObject;
  required?: boolean;
  description?: string;
  ref?: string;
}

export type SchemaObject = SingleTypeSchemaObject | ArrayTypeSchemaObject;

export type ParameterObject = {
  name: string;
  in: keyof typeof ParameterIn;
  schema?: SchemaObject;
  required?: boolean;
  description?: string;
  deprecated?: boolean;
  ref?: string;
};

export enum MediaTypes {
  JSON = "application/json",
  TEXT = "text",
  IMAGE = "image",
  AUDIO = "audio",
  VIDEO = "video",
}

export type MediaTypeObject = {
  type: MediaTypes | keyof typeof MediaTypes;
  schema?: SchemaObject;
};

export type ResponsesObject = Record<string, MediaTypeObject[]>;

export type RequestBodyObject = ResponsesObject;

export enum HttpMethods {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
  OPTIONS = "options",
  HEAD = "head",
  PATCH = "patch",
  TRACE = "trace",
}

export const SuccessHttpStatusCode = {
  "200": "200",
  "201": "201",
  "202": "202",
  "203": "203",
  "204": "204",
  "205": "205",
  "206": "206",
  "207": "207",
  "208": "208",
  "226": "226",
};

export type OperationObject = {
  method: string;
  summary?: string;
  description?: string;
  operationId?: string;
  externalDocs?: { url: string; description?: string }[];
  parameters?: ParameterObject[];
  requestBody?: MediaTypeObject[];
  responses: MediaTypeObject[];
  deprecated?: boolean;
};

export type PathObject = {
  ref?: string;
  summary?: string;
  description?: string;
  parameters?: ParameterObject[];
} & {
  [method in HttpMethods]?: OperationObject;
};

export type PathsObject = {
  [path: string]: OperationObject[];
};

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
  protected constructor() {
    if (new.target === Base) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  static ref2name(ref: string, doc?: any): string {
    const paths = ref.replace(/^#/, "").split("/").filter(Boolean);

    if (!doc) {
      return paths.slice(-1)[0];
    }

    let temp = doc;
    let lastPath = "";
    for (let path of paths) {
      path = path.replace("~1", "/");
      temp = temp[path];
      lastPath = path;
    }

    if (!temp) {
      return "unknown";
    }

    return temp["$ref"] ? this.ref2name(temp["$ref"], doc) : lastPath;
  }

  static pathToFnName(path: string, method?: string, operationId?: string) {
    const name = this.camelCase(path.replace(/^\//, "").replaceAll("/", "_"));
    const suffix = method
      ? this.capitalize(this.upperCamelCase(`using_${method}`))
      : "";
    return (
      (operationId ? this.camelCase(this.normalize(operationId)) : name) +
      suffix
    );
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

  static async fetchDoc<T = unknown>(url: string): Promise<T> {
    const agent = new Agent({
      connect: {
        rejectUnauthorized: false,
      },
    });
    logger.info(`Fetch document from ${url}`);

    try {
      const { body } = await request(url, {
        method: "GET",
        dispatcher: agent,
      });

      return body.json() as T;
    } catch (error) {
      logger.error((error as Error).message);
      return {} as T;
    }
  }

  static getMediaType(mediaType: string): MediaTypes | null {
    for (const type in Object.values(MediaTypes)) {
      if (new RegExp(type).test(mediaType)) {
        return type as MediaTypes;
      }
    }

    return null;
  }
}
