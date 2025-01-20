/*
 * Support and handling of enums on `type: number` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
*/
export async function numberEnumSupportUsingGet(req: {
  enum_?: number;
  enum__required: number;
  enum__with_default_?: number;
  enum__with_default___required: number;
  enum__with_example_?: number;
  enum__with_example___required: number;
  enum__with_empty_option_?: number;
  enum__with_duplicate_options_?: number;
}) {
  return fetch(`/anything/strings`, {
    method: "GET",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*
 * Support and handling of enums on `type: boolean` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
*/
export async function booleanEnumSupportUsingPut(req: {
  enum_?: boolean;
  enum__required: boolean;
  enum__with_default_?: boolean;
  enum__with_default___required: boolean;
}) {
  return fetch(`/anything/strings`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
/*
 * Support and handling of enums on `type: string` schemas.

📚 OpenAPI specification references:

* [3.0.3 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schemaObject)

* [3.1.0 Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#schemaObject)
*/
export async function stringEnumSupportUsingPost(req: {
  enum_?: string;
  enum__required: string;
  enum__with_default_?: string;
  enum__with_default___required: string;
  enum__with_example_?: string;
  enum__with_example___required: string;
  enum__with_non_value_example_?: string;
  enum__with_non_value_example___required: string;
  enum__with_empty_option_?: string;
  enum__with_duplicate_options_?: string;
  enum__with_empty_option_and_empty_default_?: string;
}) {
  return fetch(`/anything/strings`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
