/**
 * @file Base class implementation
 * @author [Your Name]
 * @description Base utility class providing common methods for code generation and API handling
 */

import { request, Agent } from "undici";
import type {
  FetchDocRequestInit,
  SchemaObject,
  SingleTypeSchemaObject,
  EnumSchemaObject,
  ReferenceObject,
} from "~/interface";
import { MediaTypes } from "~/interface";
import { typescriptKeywords } from "~/constants/keywords";

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
   * @param {string} ref - The reference string to process.
   * @param {any} [doc] - Optional document reference for context.
   * @returns {string} - The processed name.
   */
  static ref2name(ref: string, doc?: any): string {
    const paths = ref.replace(/^#/, "").split("/").filter(Boolean);

    if (!doc) {
      return paths.slice(-1)[0];
    }

    let temp = doc;
    let lastPath = "";
    for (const path of paths) {
      const adjustedPath = path.replace("~/1", "/");
      temp = temp[adjustedPath];
      lastPath = adjustedPath;
    }

    if (!temp) {
      return "unknown";
    }

    return temp["$ref"] ? this.ref2name(temp["$ref"], doc) : lastPath;
  }

  /**
   * Converts an API path to a function name.
   * @param {string} path - The API endpoint path.
   * @param {string} [method] - The HTTP method (e.g., GET, POST).
   * @param {string} [operationId] - Unique identifier for the operation.
   * @returns {string} - The generated function name.
   */
  static pathToFnName(path: string, method?: string, operationId?: string) {
    const name = this.camelCase(this.normalize(path));
    const suffix = method
      ? this.capitalize(this.upperCamelCase(`using_${method}`))
      : "";

    return (
      (operationId ? this.camelCase(this.normalize(operationId)) : name) + suffix
    );
  }

  /**
   * Normalizes a string by replacing special characters and avoiding TypeScript keywords.
   * @param {string} text - Input text to normalize.
   * @returns {string} - The normalized string.
   */
  static normalize(text: string) {
    if (typescriptKeywords.has(text)) {
      text += "_";
    }
    return text.replace(/[/\-_{}():\s`,*<>$]/gm, "_").replaceAll("...", "");
  }

  /**
   * Capitalizes the first character of a string.
   * @param {string} text - Input string.
   * @returns {string} - Capitalized string.
   */
  static capitalize(text: string) {
    text = text.trim();
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  }

  /**
   * Converts a string to camelCase.
   * @param {string} text - Input string.
   * @returns {string} - CamelCase string.
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
   * @param {string} text - Input string.
   * @returns {string} - UpperCamelCase string.
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
   * @param {string} url - The URL to fetch the documentation from.
   * @param {FetchDocRequestInit} requestInit - Additional request parameters.
   * @returns {Promise<T>} - A promise resolving to the fetched documentation data.
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
   * @param {string} mediaType - The media type string to evaluate.
   * @returns {MediaTypes | null} - The matched MediaTypes or null.
   */
  static getMediaType(mediaType: string): MediaTypes | null {
    for (const type in Object.values(MediaTypes)) {
      if (new RegExp(type).test(mediaType)) {
        return type as MediaTypes;
      }
    }
    return null;
  }

  /**
   * Checks if a schema is a valid enum type that isn't boolean.
   * @param {SchemaObject} a - The schema object to evaluate.
   * @returns {boolean} - True if the schema is a valid non-boolean enum.
   */
  static isValidEnumType(a: SchemaObject) {
    return a.type !== "boolean" && !this.isBooleanEnum(a);
  }

  /**
   * Checks if a schema represents a boolean enum.
   * @param {SchemaObject} a - The schema object to evaluate.
   * @returns {boolean} - True if the schema is a boolean enum.
   */
  static isBooleanEnum(a: SchemaObject) {
    return (
      a.type === "boolean" ||
      !!(a as SingleTypeSchemaObject).enum?.some(
        (member) => typeof member === "boolean"
      )
    );
  }

  /**
   * Checks if two enum schemas are identical.
   * @param {EnumSchemaObject} a - First enum schema to compare.
   * @param {EnumSchemaObject} b - Second enum schema to compare.
   * @returns {boolean} - True if the enums are identical.
   */
  private static isSameEnum(a: EnumSchemaObject, b: EnumSchemaObject) {
    return (
      a.enum.length === b.enum.length &&
      a.enum.sort().every((v, index) => v === b.enum.sort()[index])
    );
  }

  /**
   * Filters out duplicate enum schemas from an array.
   * @param {EnumSchemaObject[]} enums - Array of enum schemas to process.
   * @returns {EnumSchemaObject[]} - Array of unique enum schemas.
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
   * @param {EnumSchemaObject} a - The enum schema to find.
   * @param {EnumSchemaObject[]} enums - Array of enum schemas to search.
   * @returns {EnumSchemaObject | undefined} - The found schema or undefined.
   */
  static findSameSchema(a: EnumSchemaObject, enums: EnumSchemaObject[]) {
    return enums.find((b) => this.isSameEnum(b, a));
  }

  /**
   * Checks if an object is a reference object.
   * @param {any} schema - The object to check.
   * @returns {boolean} - True if the object is a reference.
   */
  static isRef(schema: any): schema is ReferenceObject {
    return "$ref" in schema && typeof schema.$ref === "string";
  }
}