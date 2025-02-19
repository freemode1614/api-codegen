/**
 * Simple represenration for JSON object
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
  "enum" = "enum",
  "file" = "file",
}

export enum ArraySchemaType {
  "array" = "array",
}

export enum SchemaFormatType {
  "string" = "string",
  "number" = "number",
  "boolean" = "boolean",
  "file" = "file",
  "binary" = "binary",
  "blob" = "blob",
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

export interface EnumSchemaObject {
  name: string;
  enum: (string | number)[];
}

export interface SingleTypeSchemaObject {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
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
} & Partial<Record<HttpMethods, OperationObject>>;

export type PathsObject = Record<string, OperationObject[]>;

export type FetchDocRequestInit = {
  method?: string;
  body?: string | FormData;
  headers?: Record<string, string>;
};

export type ProviderInitOptions = {
  docURL: string;
  output: string;
  baseURL?: string;
  importClientSource?: string;
  requestOptions?: FetchDocRequestInit;
  verbose?: boolean;
};

export interface ProviderInitResult {
  readonly enums: EnumSchemaObject[];
  readonly schemas: Record<string, SchemaObject>;
  readonly parameters: Record<string, ParameterObject>;
  readonly responses: Record<string, ResponsesObject>;
  readonly requestBodies: Record<string, RequestBodyObject>;
  readonly apis: PathsObject;
}
