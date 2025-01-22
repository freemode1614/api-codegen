/**
 *
 * Base for all abstract class
 *
 */

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
  allOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  deprecated?: boolean;
  enum?: (string | number)[];
  format?: string;
  oneOf?: SchemaObject[];
  properties?: Record<string, SchemaObject>;
  readonly?: boolean;
  required?: boolean;
  ref?: string;
};

export type ArraySchemaObject = {
  name: string;
  type: "array";
  items: SchemaObject;
  ref?: string;
};

export type ReferenceObject = { $ref: string };

/**
 * Type guard for reference object.
 * @param o
 * @returns {boolean}
 */
export const isRef = (o: unknown): o is ReferenceObject => {
  if (!o) return false;
  if (typeof (o as ReferenceObject).$ref !== "string") return false;

  return true;
};

export type SchemaObject = NonArraySchemaObject | ArraySchemaObject;

export type ParameterObject = {
  name: string;
  in: string;
  schema: SchemaObject;
  required?: boolean;
  description?: string;
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

export type RequestObject = {
  schema: SchemaObject;
};

export type RequestBodiesObject = Record<string, RequestObject>;

export abstract class Base {
  abstract name: string;
}
