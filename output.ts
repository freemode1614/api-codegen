/**
 * 1.0.0
 * Support for different schema types
 * Additionally some support for features that schema types may individually support.

https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject
 */

export type StringObjectEnumObject = "available" | "pending" | "sold";

export type Circular = {
  stringObject?: string;
  children?: Circular[];
};

export async function stringFormatSupportUsingPUT({
  binary,
  binaryWithObjectDefaultObject,
  blob,
  date,
  dateWithObjectPattern,
  dateTime,
  html,
  json,
  stringObject,
  password,
  passwordMinLength5MaxLength20,
  url,
  unknownFormat,
}: {
  binary?: Blob;
  binaryWithObjectDefaultObject: Blob;
  blob?: unknown;
  date?: string;
  dateWithObjectPattern?: string;
  dateTime?: string;
  html?: unknown;
  json?: string;
  stringObject?: string;
  password?: string;
  passwordMinLength5MaxLength20?: string;
  url?: unknown;
  unknownFormat?: unknown;
}) {
  return fetch(`/anything/strings`, {
    method: "PUT",
    body: JSON.stringify({
      binary,
      binaryWithObjectDefaultObject,
      blob,
      date,
      dateWithObjectPattern,
      dateTime,
      html,
      json,
      stringObject,
      password,
      passwordMinLength5MaxLength20,
      url,
      unknownFormat,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function stringSchemaSupportUsingPOST({
  stock,
  descriptionMarkdown,
  title,
  required,
  defaultObject,
  defaultNullObject,
  defaultRequired,
  nullable,
  enumObject,
  enumWithObjectDefaultObject,
  enumWithObjectDefaultObjectAndRequired,
  enumWithObjectEmptyOption,
  enumWithObjectEmptyOptionAndEmptyDefaultObject,
}: {
  stock?: string;
  descriptionMarkdown?: string;
  title?: string;
  required: string;
  defaultObject?: string;
  defaultNullObject?: string;
  defaultRequired: string;
  nullable?: string;
  enumObject?: "available" | "pending" | "sold";
  enumWithObjectDefaultObject?: "available" | "pending" | "sold";
  enumWithObjectDefaultObjectAndRequired?: "available" | "pending" | "sold";
  enumWithObjectEmptyOption?: "" | "available" | "pending" | "sold";
  enumWithObjectEmptyOptionAndEmptyDefaultObject?: "";
}) {
  return fetch(`/anything/strings`, {
    method: "POST",
    body: JSON.stringify({
      stock,
      descriptionMarkdown,
      title,
      required,
      defaultObject,
      defaultNullObject,
      defaultRequired,
      nullable,
      enumObject,
      enumWithObjectDefaultObject,
      enumWithObjectDefaultObjectAndRequired,
      enumWithObjectEmptyOption,
      enumWithObjectEmptyOptionAndEmptyDefaultObject,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function stringTopLevelUsingPOST(string: string) {
  return fetch(`/anything/strings/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify(string),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function stringTopLevelJSONUsingPATCH(string: string) {
  return fetch(`/anything/strings/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify(string),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function numberFormatSupportUsingPUT({
  integerFormatInt8,
  integerFormatUint8,
  integerFormatInt16,
  integerFormatUint16,
  integerFormatInt32,
  integerFormatInt32MultipleOf2,
  integerFormatUint32,
  integerFormatInt64,
  integerFormatUint64,
  numberFormatFloat,
  numberFormatDouble,
}: {
  integerFormatInt8?: unknown;
  integerFormatUint8?: unknown;
  integerFormatInt16?: unknown;
  integerFormatUint16?: unknown;
  integerFormatInt32?: number;
  integerFormatInt32MultipleOf2?: number;
  integerFormatUint32?: unknown;
  integerFormatInt64?: number;
  integerFormatUint64?: unknown;
  numberFormatFloat?: number;
  numberFormatDouble?: number;
}) {
  return fetch(`/anything/numbers`, {
    method: "PUT",
    body: JSON.stringify({
      integerFormatInt8,
      integerFormatUint8,
      integerFormatInt16,
      integerFormatUint16,
      integerFormatInt32,
      integerFormatInt32MultipleOf2,
      integerFormatUint32,
      integerFormatInt64,
      integerFormatUint64,
      numberFormatFloat,
      numberFormatDouble,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function numberSchemaSupportUsingPOST({
  integerStock,
  integerMarkdownDescription,
  integerTitle,
  integerRequired,
  integerDefaultObject,
  integerDefaultObjectNullObject,
  integerDefaultObjectRequired,
  integerNullable,
  integerMinimumMaximum,
  numberStock,
  numberMarkdownDescription,
  numberTitle,
  numberRequired,
  numberDefaultObject,
  numberDefaultObjectNullObject,
  numberDefaultObjectRequired,
  numberNullable,
}: {
  integerStock?: number;
  integerMarkdownDescription?: number;
  integerTitle?: number;
  integerRequired: number;
  integerDefaultObject?: number;
  integerDefaultObjectNullObject?: number;
  integerDefaultObjectRequired: number;
  integerNullable?: number;
  integerMinimumMaximum?: number;
  numberStock?: unknown;
  numberMarkdownDescription?: unknown;
  numberTitle?: unknown;
  numberRequired: unknown;
  numberDefaultObject?: unknown;
  numberDefaultObjectNullObject?: unknown;
  numberDefaultObjectRequired: unknown;
  numberNullable?: unknown;
}) {
  return fetch(`/anything/numbers`, {
    method: "POST",
    body: JSON.stringify({
      integerStock,
      integerMarkdownDescription,
      integerTitle,
      integerRequired,
      integerDefaultObject,
      integerDefaultObjectNullObject,
      integerDefaultObjectRequired,
      integerNullable,
      integerMinimumMaximum,
      numberStock,
      numberMarkdownDescription,
      numberTitle,
      numberRequired,
      numberDefaultObject,
      numberDefaultObjectNullObject,
      numberDefaultObjectRequired,
      numberNullable,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function numberTopLevelUsingPATCH(number: number) {
  return fetch(`/anything/numbers`, {
    method: "PATCH",
    body: JSON.stringify(number),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function booleanSchemaSupportUsingPOST({
  stock,
  descriptionMarkdown,
  title,
  required,
  defaultObject,
  defaultRequired,
  inferredFromObjectEnumObject,
}: {
  stock?: boolean;
  descriptionMarkdown?: boolean;
  title?: boolean;
  required: boolean;
  defaultObject?: boolean;
  defaultRequired: boolean;
  inferredFromObjectEnumObject?: "true" | "false";
}) {
  return fetch(`/anything/booleans`, {
    method: "POST",
    body: JSON.stringify({
      stock,
      descriptionMarkdown,
      title,
      required,
      defaultObject,
      defaultRequired,
      inferredFromObjectEnumObject,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function booleanTopLevelUsingPATCH(boolean: boolean) {
  return fetch(`/anything/booleans`, {
    method: "PATCH",
    body: JSON.stringify(boolean),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function arraySchemaSupportUsingPOST({
  stock,
  withMarkdownDescription,
  withTitle,
  arrayAnyObject,
  arrayAnyObjectButNoItemsProperty,
  arrayStringObject,
  arrayStringObjectWithObjectOverallNullObjectDefaultObject,
  arrayStringObjectLoadedViaARef,
  arrayInteger,
  arrayNumberObject,
  arrayBooleanObject,
  arrayObjectObject,
  arrayObjectObjectAdditionalProperties,
  arrayArrayObjectObject,
}: {
  stock?: unknown[];
  withMarkdownDescription?: unknown[];
  withTitle?: unknown[];
  arrayAnyObject?: unknown[];
  arrayAnyObjectButNoItemsProperty?: unknown[];
  arrayStringObject?: string[];
  arrayStringObjectWithObjectOverallNullObjectDefaultObject?: string[];
  arrayStringObjectLoadedViaARef?: StringObjectEnumObject[];
  arrayInteger?: number[];
  arrayNumberObject?: number[];
  arrayBooleanObject?: boolean[];
  arrayObjectObject?: {
    stringObject?: string;
    integer?: number;
    numberObject?: unknown;
    booleanObject?: boolean;
  }[];
  arrayObjectObjectAdditionalProperties?: Record<string, unknown>[];
  arrayArrayObjectObject?: {
    stringObject?: string;
  }[][];
}) {
  return fetch(`/anything/arrays`, {
    method: "POST",
    body: JSON.stringify({
      stock,
      withMarkdownDescription,
      withTitle,
      arrayAnyObject,
      arrayAnyObjectButNoItemsProperty,
      arrayStringObject,
      arrayStringObjectWithObjectOverallNullObjectDefaultObject,
      arrayStringObjectLoadedViaARef,
      arrayInteger,
      arrayNumberObject,
      arrayBooleanObject,
      arrayObjectObject,
      arrayObjectObjectAdditionalProperties,
      arrayArrayObjectObject,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function arrayTopLevelObjectsUsingPOST(
  never: {
    stringObject?: string;
    integer?: number;
    numberObject?: unknown;
    booleanObject?: boolean;
    array?: unknown[];
    objectObject?: Record<string, unknown>;
  }[],
) {
  return fetch(`/anything/arrays/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify(never),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function arrayTopLevelPrimitivesUsingPATCH(never: string[]) {
  return fetch(`/anything/arrays/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify(never),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function objectSchemaSupportUsingPOST({
  objectObject,
  objectWithObjectTitle,
  objectWithoutAnExplicitTypeObject,
  objectAdditionalProperties,
  objectWithoutProperties,
}: {
  objectObject?: {
    stringObject?: string;
    integer?: number;
    numberObject?: unknown;
    objectObject?: {
      stringObject?: string;
    };
    array?: string[];
  };
  objectWithObjectTitle?: {
    stringObject?: string;
    integer?: number;
    numberObject?: unknown;
    objectObject?: {
      stringObject?: string;
    };
    array?: string[];
  };
  objectWithoutAnExplicitTypeObject?: {
    property1?: number;
    property2?: number;
  };
  objectAdditionalProperties?: Record<string, unknown>;
  objectWithoutProperties?: Record<string, unknown>;
}) {
  return fetch(`/anything/objects`, {
    method: "POST",
    body: JSON.stringify({
      objectObject,
      objectWithObjectTitle,
      objectWithoutAnExplicitTypeObject,
      objectAdditionalProperties,
      objectWithoutProperties,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function circularHandlingUsingPOST({
  circular,
}: {
  circular?: Circular;
}) {
  return fetch(`/anything/circular`, {
    method: "POST",
    body: JSON.stringify({
      circular,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function circularTopLevelUsingPATCH(circular: Circular) {
  return fetch(`/anything/circular`, {
    method: "PATCH",
    body: JSON.stringify(circular),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function rawBodyTopLevelUsingPOST({
  RAWBODY,
}: {
  RAWBODY?: string;
}) {
  return fetch(`/anything/raw_body/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify({
      RAWBODY,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function rawBodyTopLevelJSONUsingPATCH({
  RAWBODY,
}: {
  RAWBODY?: string;
}) {
  return fetch(`/anything/raw_body/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify({
      RAWBODY,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function quirksMissingTypeUsingPOST({
  missingTypeObject,
  missingTypeObjectOnCompletelyEmptySchema,
  implicitArray,
  implicitObjectObject,
}: {
  missingTypeObject?: unknown;
  missingTypeObjectOnCompletelyEmptySchema?: unknown;
  implicitArray?: number[];
  implicitObjectObject?: {
    name?: string;
  };
}) {
  return fetch(`/anything/quirks`, {
    method: "POST",
    body: JSON.stringify({
      missingTypeObject,
      missingTypeObjectOnCompletelyEmptySchema,
      implicitArray,
      implicitObjectObject,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function quirksEntirelyIncompatibleAllOfUsingPUT(
  never: string & number,
) {
  return fetch(`/anything/quirks/polymorphism`, {
    method: "PUT",
    body: JSON.stringify(never),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function quirksIncompatibleNestedAllOfUsingPOST({
  incompatible,
  compatible,
}: {
  incompatible?: string & number;
  compatible?: {
    name?: string;
  } & {
    name?: unknown;
  };
}) {
  return fetch(`/anything/quirks/polymorphism`, {
    method: "POST",
    body: JSON.stringify({
      incompatible,
      compatible,
    }),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function quirksPartiallyUsableIncompatibleAllOfUsingPATCH(
  never: string & number,
) {
  return fetch(`/anything/quirks/polymorphism`, {
    method: "PATCH",
    body: JSON.stringify(never),
  }).then((res) => res.json() as Promise<unknown>);
}
