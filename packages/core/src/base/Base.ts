import { createScopedLogger } from "@moccona/logger";
import { request, Agent } from "undici";
import {
  FetchDocRequestInit,
  MediaTypes,
  SchemaObject,
  SingleTypeSchemaObject,
  EnumSchemaObject,
  ReferenceObject,
} from "~/interface";

const logger = createScopedLogger("Base");

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
    const name = this.camelCase(this.normalize(path));
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

  static async fetchDoc<T = unknown>(
    url: string,
    requestInit: FetchDocRequestInit = {},
  ): Promise<T> {
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
        ...requestInit,
      });

      return body.json() as T;
    } catch (error) {
      logger.error((error as Error).message);
      throw error;
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

  static isValidEnumType(a: SchemaObject) {
    return a.type !== "boolean" && !this.isBooleanEnum(a);
  }

  static isBooleanEnum(a: SchemaObject) {
    return (
      a.type === "boolean" ||
      (a as SingleTypeSchemaObject).enum?.some(
        (member) => typeof member === "boolean",
      )
    );
  }

  private static isSameEnum(a: EnumSchemaObject, b: EnumSchemaObject) {
    // Sort and compare each element
    return (
      a.enum.length === b.enum.length &&
      a.enum.sort().every((v, index) => v === b.enum.sort()[index])
    );
  }

  static uniqueEnums(enums: EnumSchemaObject[]) {
    const enums_: EnumSchemaObject[] = [];
    for (const enumObject of enums) {
      if (enums_.length === 0) {
        enums_.push(enumObject);
      } else {
        if (!enums_.some((a) => this.isSameEnum(a, enumObject))) {
          enums_.push(enumObject);
        }
      }
    }

    return enums_;
  }

  static findSameSchema(a: EnumSchemaObject, enums: EnumSchemaObject[]) {
    return enums.find((b) => this.isSameEnum(b, a));
  }

  static isRef(schema: any): schema is ReferenceObject {
    return "$ref" in schema && typeof schema.$ref === "string";
  }
}
