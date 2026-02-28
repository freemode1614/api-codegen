/**
 * @file Base class implementation
 * @author wp.l
 * @description Base utility class providing common methods for code generation and API handling
 */

import { typescriptKeywords } from "@apicodegen/core/constants/keywords";
import type {
  EnumSchemaObject,
  FetchDocRequestInit,
  ReferenceObject,
  SchemaObject,
  SingleTypeSchemaObject,
} from "@apicodegen/core/interface";
import { MediaTypes } from "@apicodegen/core/interface";
import { Agent, request } from "undici";

/**
 * Represents success HTTP status codes.
 * Each key is a string representation of a success HTTP status code.
 */
export const SuccessHttpStatusCode = {
  "200": "200", // OK
  "201": "201", // Created
  "202": "202", // Accepted
  "203": "203", // Non-Authoritative Information
  "204": "204", // No Content
  "205": "205", // Reset Content
  "206": "206", // Partial Content
  "207": "207", // Multi_Status
  "208": "208", // Already_Reported
  "226": "226", // IM Used
};

/**
 * Base abstract class providing common utility methods.
 */
export abstract class Base {
  protected constructor() {
    if (new.target === Base) {
      throw new Error("Cannot instantiate abstract class");
    }
  }

  /**
   * Converts a reference string to a meaningful name.
   * @param ref - The reference string to process.
   * @param [doc] - Optional document reference for context.
   * @returns - The processed name.
   */
  static ref2name(ref: string, doc?: any): string {
    const paths = ref.replace(/^#/, "").split("/").filter(Boolean);

    if (!doc) {
      return paths.slice(-1)[0];
    }

    let temporary = doc as unknown;
    let lastPath = "";
    for (const path of paths) {
      // For handling path prefix with ~1
      const adjustedPath = path.replaceAll("~1", "/");
      temporary = (temporary as Record<string, any>)[adjustedPath];
      lastPath = adjustedPath;
    }

    if (!temporary) {
      return "unknown";
    }

    return (temporary as unknown as { $ref: string }).$ref
      ? this.ref2name((temporary as unknown as { $ref: string }).$ref, doc)
      : lastPath;
  }

  /**
   * Converts an API path to a function name.
   * @param path - The API endpoint path.
   * @param [method] - The HTTP method (e.g., GET, POST).
   * @param [operationId] - Unique identifier for the operation.
   * @returns - The generated function name.
   */
  static pathToFnName(
    path: string,
    method?: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _operationId: string = "",
  ) {
    const name = this.normalize(this.camelCase(this.normalize(path)));
    const suffix = method
      ? this.capitalize(this.upperCamelCase(`using_${method}`))
      : "";

    return name + suffix;
  }

  /**
   * Normalizes a string by replacing special characters and avoiding TypeScript keywords.
   * @param text - Input text to normalize.
   * @returns - The normalized string.
   */
  static normalize(text: string) {
    if (typescriptKeywords.has(text)) {
      text += "_";
    }
    return text
      .replace(/[/\-_{}():\s`,*<>$#.]/gm, "_")
      .replace(/^\d./gm, "")
      .replaceAll("...", "");
  }

  /**
   * Capitalizes the first character of a string.
   * @param text - Input string.
   * @returns - Capitalized string.
   */
  static capitalize(text: string) {
    text = text.trim();
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }

  /**
   * Converts a string to camelCase.
   * @param text - Input string.
   * @returns - CamelCase string.
   */
  static camelCase(text: string) {
    text = text.trim();
    return text
      .split("_")
      .filter(Boolean)
      .map((t, index) => (index === 0 ? t : this.capitalize(t)))
      .join("");
  }

  /**
   * Converts a string to UpperCamelCase.
   * @param text - Input string.
   * @returns - UpperCamelCase string.
   */
  static upperCamelCase(text: string) {
    return this.normalize(text)
      .replaceAll("...", "")
      .split("_")
      .filter(Boolean)
      .map(this.capitalize)
      .join("");
  }

  /**
   * Fetches documentation from a given URL.
   * @param url - The URL to fetch the documentation from.
   * @param requestInit - Additional request parameters.
   * @returns - A promise resolving to the fetched documentation data.
   */
  static async fetchDoc<T = unknown>(
    url: string,
    requestInit: FetchDocRequestInit = {},
  ): Promise<T> {
    const agent = new Agent({
      connect: { rejectUnauthorized: false },
    });

    const { body, statusCode } = await request(url, {
      method: "GET",
      dispatcher: agent,
      ...requestInit,
    });

    if (statusCode >= 400) {
      throw new Error(
        `Failed to fetch OpenAPI documentation from ${url}: HTTP ${statusCode}`,
      );
    }

    try {
      return body.json() as T;
    } catch (error) {
      throw new Error(
        `Failed to parse JSON response from ${url}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * Determines the media type from a given media type string.
   * @param mediaType - The media type string to evaluate.
   * @returns - The matched MediaTypes or null.
   */
  static getMediaType(mediaType: string): MediaTypes | undefined {
    const mediaTypeValues = Object.values(MediaTypes) as string[];
    const found = mediaTypeValues.find((type) =>
      mediaType.includes(type),
    );
    return found as MediaTypes | undefined;
  }

  /**
   * Checks if a schema is a valid enum type that isn't boolean.
   * @param a - The schema object to evaluate.
   * @returns - True if the schema is a valid non-boolean enum.
   */
  static isValidEnumType(a: SchemaObject) {
    return a.type !== "boolean" && !this.isBooleanEnum(a);
  }

  /**
   * Checks if a schema represents a boolean enum.
   * @param a - The schema object to evaluate.
   * @returns - True if the schema is a boolean enum.
   */
  static isBooleanEnum(a: SchemaObject) {
    return (
      a.type === "boolean" ||
      !!(a as SingleTypeSchemaObject).enum?.some(
        (member) => typeof member === "boolean",
      )
    );
  }

  /**
   * Checks if two enum schemas are identical.
   * @param a - First enum schema to compare.
   * @param b - Second enum schema to compare.
   * @returns - True if the enums are identical.
   */
  private static isSameEnum(a: EnumSchemaObject, b: EnumSchemaObject) {
    return (
      a.enum.length === b.enum.length &&
      a.enum.sort().every((v, index) => v === b.enum.sort()[index])
    );
  }

  /**
   * Filters out duplicate enum schemas from an array.
   * @param enums - Array of enum schemas to process.
   * @returns - Array of unique enum schemas.
   */
  static uniqueEnums(enums: EnumSchemaObject[]): EnumSchemaObject[] {
    const enumMap = new Map<string, Set<string | number>>();

    for (const e of enums) {
      const existing = enumMap.get(e.name);
      if (existing) {
        // Merge enum values with the same name
        for (const value of e.enum) {
          existing.add(value);
        }
      } else {
        enumMap.set(e.name, new Set(e.enum));
      }
    }

    // Convert back to array
    return Array.from(enumMap.entries()).map(([name, values]) => ({
      name,
      enum: Array.from(values),
    }));
  }

  /**
   * Finds the first occurrence of a matching enum schema in an array.
   * @param a - The enum schema to find.
   * @param enums - Array of enum schemas to search.
   * @returns - The found schema or undefined.
   */
  static findSameSchema(a: EnumSchemaObject, enums: EnumSchemaObject[]) {
    return enums.find((b) => this.isSameEnum(b, a));
  }

  /**
   * Checks if an object is a reference object.
   * @param schema - The object to check.
   * @returns - True if the object is a reference.
   */

  static isRef(schema: unknown): schema is ReferenceObject {
    return (
      typeof schema === "object" &&
      schema !== null &&
      "$ref" in schema &&
      typeof (schema as Record<string, unknown>).$ref === "string"
    );
  }
}
