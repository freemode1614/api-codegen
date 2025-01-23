import { Adapter } from "~/base/Adaptor";
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

  /**
   * Holds acollection of named schema object
   */
  abstract [SchemaType.schemas]: Record<string, SchemaObject>;

  /**
   * Holds acollection of named parameter object
   */
  abstract [SchemaType.parameters]: Record<string, ParameterObject>;

  /**
   * Holds acollection of named response object
   */
  abstract [SchemaType.responses]: Record<string, ResponsesObject>;

  /**
   * Holds acollection of named requestBody object
   */
  abstract [SchemaType.requestBodies]: Record<string, RequestBodiesObject>;

  protected constructor(adaptor: Adapter) {
    super();
    this.init();
  }

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

  abstract init(): void;
}
