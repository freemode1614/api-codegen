import type {
  JSONValue,
  ParameterObject,
  RequestBodiesObject,
  ResponsesObject,
  SchemaObject,
} from "~/base/Base";
import { Base, SchemaType } from "~/base/Base";

export abstract class Provider extends Base {
  /**
   * A property to store JSON data externally.
   * This attribute holds structured data in JSON format, allowing for flexible and dynamic data handling.
   */
  abstract schema: JSONValue;

  abstract [SchemaType.schemas]: Record<string, SchemaObject>;
  abstract [SchemaType.parameters]: Record<string, ParameterObject>;
  abstract [SchemaType.responses]: Record<string, ResponsesObject>;
  abstract [SchemaType.requestBodies]: Record<string, RequestBodiesObject>;

  /**
   * Abstract method to be implemented by subclasses.
   * @returns A boolean indicating some condition.
   */
  abstract test(): boolean;

  protected getSchemaByType(
    schemaType: keyof typeof SchemaType | SchemaType,
    refName: string,
  ) {
    const targetSchemas = this[schemaType];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!targetSchemas) {
      throw new Error(
        `Not a valid schema type ${schemaType}, expect ${Object.keys(SchemaType).join(", ")}`,
      );
    }

    return targetSchemas[refName];
  }
}
