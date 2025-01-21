import { Base } from "~/base/Base";

export type JSONValue = {
  [K: string]: string | number | JSONValue | (string | number | JSONValue)[];
};

export enum SchemaType {
  schemas = "schemas",
  parameters = "parameters",
  responses = "responses",
  requestBodies = "requestBodies",
}

export type NonArraySchemaObject = {
  name: string;
  type: string;
  format: string;
};

export type ArraySchemaObject = {
  name: string;
  items: SchemaObject;
};

export type SchemaObject = NonArraySchemaObject | ArraySchemaObject;

export type ParameterObject = {
  in: string;
  name: string;
  required: boolean;
  schema: SchemaObject;
};

export type ResponseObject = {
  schema: SchemaObject;
};

export type ResponsesObject = Record<string, ResponseObject>;

export type RequestObject = {
  schema: SchemaObject;
};

export type RequestBodiesObject = Record<string, RequestObject>;

/**
 *
 * Base provider for tool
 *
 */
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
        "Not a valid schema type" +
          schemaType +
          ", expect" +
          Object.keys(schemaType).join(", "),
      );
    }

    return targetSchemas[refName];
  }
}
