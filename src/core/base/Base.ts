/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file Base class implementation
 * @author [Your Name]
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
    const name = this.camelCase(this.normalize(path));
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
    return text.replace(/[/\-_{}():\s`,*<>$#.]/gm, "_").replaceAll("...", "");
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
      connect: {
        rejectUnauthorized: false,
      },
    });

    // eslint-disable-next-line no-useless-catch
    try {
      const { body } = await request(url, {
        method: "GET",
        dispatcher: agent,
        ...requestInit,
      });
      return body.json() as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Determines the media type from a given media type string.
   * @param mediaType - The media type string to evaluate.
   * @returns - The matched MediaTypes or null.
   */
  static getMediaType(mediaType: string): MediaTypes | undefined {
    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const type in Object.values(MediaTypes)) {
      if (new RegExp(type).test(mediaType)) {
        return type as MediaTypes;
      }
    }
    return;
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
  static uniqueEnums(enums: EnumSchemaObject[]) {
    const uniqueEnums_: EnumSchemaObject[] = [];
    for (const enumObject of enums) {
      if (uniqueEnums_.length === 0) {
        uniqueEnums_.push(enumObject);
      } else {
        if (!uniqueEnums_.some((a) => this.isSameEnum(a, enumObject))) {
          uniqueEnums_.push(enumObject);
        }
      }
    }
    return uniqueEnums_;
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

  static isRef(schema: any): schema is ReferenceObject {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return "$ref" in schema && typeof schema.$ref === "string";
  }
}
