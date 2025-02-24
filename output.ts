import axios from "axios";

export enum StringEnum {
  "available" = "available",
  "pending" = "pending",
  "sold" = "sold",
}
export enum EnumWithEmptyOption {
  "" = "",
  "available" = "available",
  "pending" = "pending",
  "sold" = "sold",
}
export enum EnumWithEmptyOptionAndEmptyDefault {
  "" = "",
}
export type Circular = {
  string: string;
  children: Circular[];
};
/**
Handling of `format` data types on `type: string` schemas.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 `format` data types
*/
export async function stringFormatSupportUsingPut(req: {
  binary: File;
  "binary (with default)": File;
  blob: File;
  date: string;
  "date (with pattern)": string;
  "date-time": string;
  html: string;
  json: string;
  string: string;
  password: string;
  "password (minLength: 5, maxLength: 20)": string;
  url: string;
  "unknown-format": string;
}) {
  const fd = new FormData();
  fd.append("binary", req["binary"]);
  fd.append("binary (with default)", req["binary (with default)"]);
  fd.append("blob", req["blob"]);
  fd.append("date", req["date"]);
  fd.append("date (with pattern)", req["date (with pattern)"]);
  fd.append("date-time", req["date-time"]);
  fd.append("html", req["html"]);
  fd.append("json", req["json"]);
  fd.append("string", req["string"]);
  fd.append("password", req["password"]);
  fd.append(
    "password (minLength: 5, maxLength: 20)",
    req["password (minLength: 5, maxLength: 20)"],
  );
  fd.append("url", req["url"]);
  fd.append("unknown-format", req["unknown-format"]);
  return axios(`/v1/anything/strings`, {
    method: "PUT",
    data: fd,
  });
}
/**
Support and handling of `type: string` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 String support
*/
export async function stringSchemaSupportUsingPost(req: {
  stock: string;
  "description (markdown)": string;
  title: string;
  required: string;
  default: string;
  "default (null)": string;
  "default (required)": string;
  nullable: string;
  enum: StringEnum;
  "enum (with default)": StringEnum;
  "enum (with default and required)": StringEnum;
  "enum (with empty option)": EnumWithEmptyOption;
  "enum (with empty option and empty default)": EnumWithEmptyOptionAndEmptyDefault;
}) {
  return axios(`/v1/anything/strings`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a single `type: string`.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads
*/
export async function stringTopLevelUsingPost(req: string) {
  return axios(`/v1/anything/strings/top-level-payloads`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a single `type: string` but `format: json`.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads (JSON)

*/
export async function stringTopLevelJSONUsingPatch(req: string) {
  return axios(`/v1/anything/strings/top-level-payloads`, {
    method: "PATCH",
    data: req,
  });
}
/**
Handling `format` data types on `type: integer` and `type: number` schemas.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 `format` data types
*/
export async function numberFormatSupportUsingPut(req: {
  "integer (format: int8)": number;
  "integer (format: uint8)": number;
  "integer (format: int16)": number;
  "integer (format: uint16)": number;
  "integer (format: int32)": number;
  "integer (format: int32, multipleOf: 2)": number;
  "integer (format: uint32)": number;
  "integer (format: int64)": number;
  "integer (format: uint64)": number;
  "number (format: float)": number;
  "number (format: double)": number;
}) {
  return axios(`/v1/anything/numbers`, {
    method: "PUT",
    data: req,
  });
}
/**
Support and handling of `type: integer` and `type: number` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Number support
*/
export async function numberSchemaSupportUsingPost(req: {
  "integer (stock)": number;
  "integer (markdown description)": number;
  "integer (title)": number;
  "integer (required)": number;
  "integer (default)": number;
  "integer (default null)": number;
  "integer (default, required)": number;
  "integer (nullable)": number;
  "integer (minimum / maximum)": number;
  "number (stock)": number;
  "number (markdown description)": number;
  "number (title)": number;
  "number (required)": number;
  "number (default)": number;
  "number (default null)": number;
  "number (default, required)": number;
  "number (nullable)": number;
}) {
  return axios(`/v1/anything/numbers`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a single `type: integer`.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads
*/
export async function numberTopLevelUsingPatch(req: number) {
  return axios(`/v1/anything/numbers`, {
    method: "PATCH",
    data: req,
  });
}
/**
Support and handling of `type: boolean` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Boolean support
*/
export async function booleanSchemaSupportUsingPost(req: {
  stock: boolean;
  "description (markdown)": boolean;
  title: boolean;
  required: boolean;
  default: boolean;
  "default (required)": boolean;
  "inferred from enum": boolean;
}) {
  return axios(`/v1/anything/booleans`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a single `type: boolean`.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads
*/
export async function booleanTopLevelUsingPatch(req: boolean) {
  return axios(`/v1/anything/booleans`, {
    method: "PATCH",
    data: req,
  });
}
/**
Support and handling of `type: array` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Array support
*/
export async function arraySchemaSupportUsingPost(req: {
  stock: unknown[];
  "with markdown description": unknown[];
  "with title": unknown[];
  "array<any>": unknown[];
  "array<any> (but no `items` property)": unknown[];
  "array<string>": string[];
  "array<string> (with overall `null` default)": string[];
  "array<string> (loaded via a $ref)": StringEnum[];
  "array<integer>": number[];
  "array<number>": number[];
  "array<boolean>": boolean[];
  "array<object>": {
    string: string;
    integer: number;
    number: number;
    boolean: boolean;
  }[];
  "array<object> (additionalProperties)": Record<string, unknown>[];
  "array<array<object>>": {
    string: string;
  }[][];
}) {
  return axios(`/v1/anything/arrays`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a `type: array` composed of objects.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads (objects)
*/
export async function arrayTopLevelObjectsUsingPost(
  req: {
    string: string;
    integer: number;
    number: number;
    boolean: boolean;
    array: unknown[];
    object: Record<string, unknown>;
  }[],
) {
  return axios(`/v1/anything/arrays/top-level-payloads`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a `requestBody` payload that's a `type: array` composed of primitives.

📚 OpenAPI specification references:

* [3.0.3 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#data-types)

* [3.1.0 Data Types](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#dataTypes)
 Top-level payloads (primitives)
*/
export async function arrayTopLevelPrimitivesUsingPatch(req: string[]) {
  return axios(`/v1/anything/arrays/top-level-payloads`, {
    method: "PATCH",
    data: req,
  });
}
/**
Support and handling of `type: object` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Object support
*/
export async function objectSchemaSupportUsingPost(req: {
  object: {
    string: string;
    integer: number;
    number: number;
    object: {
      string: string;
    };
    array: string[];
  };
  "object (with `title`)": {
    string: string;
    integer: number;
    number: number;
    object: {
      string: string;
    };
    array: string[];
  };
  "object (without an explicit `type`)": {
    property1: number;
    property2: number;
  };
  "object (additionalProperties)": Record<string, unknown>;
  "object (without `properties`)": Record<string, unknown>;
}) {
  return axios(`/v1/anything/objects`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a nested `$ref` that recursively references itself.

📚 OpenAPI specification references:

* [3.0.3 Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)

* [3.1.0 Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)
 Nested circular $ref
*/
export async function circularHandlingUsingPost(req: { circular: Circular }) {
  return axios(`/v1/anything/circular`, {
    method: "POST",
    data: req,
  });
}
/**
Handling of a top-level request body `$ref` that recursively references itself.

📚 OpenAPI specification references:

* [3.0.3 Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#referenceObject)

* [3.1.0 Reference Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#referenceObject)
 Top-level circular $ref
*/
export async function circularTopLevelUsingPatch(req: {
  string: string;
  children: Circular[];
}) {
  return axios(`/v1/anything/circular`, {
    method: "PATCH",
    data: req,
  });
}
/**
This is a special value on ReadMe to denote a top level property. This can be done better using JSON Schema, but from ReadMe's dash, this is the only way to do it.

<https://docs.readme.com/docs/raw-body-content>
 Top-level RAW_BODY (string)
*/
export async function rawBodyTopLevelUsingPost(req: { RAW_BODY: string }) {
  return axios(`/v1/anything/raw_body/top-level-payloads`, {
    method: "POST",
    data: req,
  });
}
/**
This is a special value on ReadMe to denote a top level property. This can be done better using JSON Schema, but from ReadMe's dash, this is the only way to do it.

<https://docs.readme.com/docs/raw-body-content>
 Top-level RAW_BODY (JSON)
*/
export async function rawBodyTopLevelJSONUsingPatch(req: { RAW_BODY: string }) {
  return axios(`/v1/anything/raw_body/top-level-payloads`, {
    method: "PATCH",
    data: req,
  });
}
/**
Handling cases for when `type` is missing from a schema.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Missing schema type
*/
export async function quirksMissingTypeUsingPost(req: {
  "missing type": unknown;
  "missing type (on completely empty schema)": unknown;
  "implicit array": unknown;
  "implicit object": {
    name: string;
  };
}) {
  return axios(`/v1/anything/quirks`, {
    method: "POST",
    data: req,
  });
}
/**
When an `allOf` sits at the top of a request body schema and it cannot be merged, we're unable to render out anything for an input because there's no usable schema for us.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Incompatible allOf schemas on a root requestBody
*/
export async function quirksEntirelyIncompatibleAllOfUsingPut(
  req: string | number,
) {
  return axios(`/v1/anything/quirks/polymorphism`, {
    method: "PUT",
    data: req,
  });
}
/**
Handling cases for when a nested `allOf` cannot be merged together.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Incompatible nested allOf schemas
*/
export async function quirksIncompatibleNestedAllOfUsingPost(req: {
  incompatible: string | number;
  compatible:
    | {
        name: string;
      }
    | {
        name: unknown;
      };
}) {
  return axios(`/v1/anything/quirks/polymorphism`, {
    method: "POST",
    data: req,
  });
}
/**
Like `quirks_entirelyIncompatibleAllOf`, when we're to merge an `allOf` together we eliminate it, however this schema here has additional properties (`description`) alongside that `allOf` so it's not a wholly empty schema and we can use it. Unfortunately since we don't have any of the real data for the request body to use we treat this as a string input with a `format` of `json` so that the user can input a raw JSON input to make their request with.

Unfortunately in this case we don't support `description` on the root schema so it won't show up, but a large input box still will for the user. Obviously all of this less than ideal as we're losing request body schema data but since the `allOf` present is incompatible it's unusable and this is the best we can do under the circumstances.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
 Incompatible allOf schemas on a root requestBody (with other schema properties)
*/
export async function quirksPartiallyUsableIncompatibleAllOfUsingPatch(
  req: string | number,
) {
  return axios(`/v1/anything/quirks/polymorphism`, {
    method: "PATCH",
    data: req,
  });
}
