export enum StringEnum {
    "available" = "available",
    "pending" = "pending",
    "sold" = "sold"
}
export enum EnumWithEmptyOption {
    "" = "",
    "available" = "available",
    "pending" = "pending",
    "sold" = "sold"
}
export enum EnumWithEmptyOptionAndEmptyDefault {
    "" = ""
}
export type Circular = {
    "string": string;
    "children": Circular[];
};
export async function stringFormatSupportUsingPut(req: {
    "binary": File;
    "binary (with default)": File;
    "blob": File;
    "date": string;
    "date (with pattern)": string;
    "date-time": string;
    "html": string;
    "json": string;
    "string": string;
    "password": string;
    "password (minLength: 5, maxLength: 20)": string;
    "url": string;
    "unknown-format": string;
}) { return fetch(`/anything/strings`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
export async function stringSchemaSupportUsingPost(req: {
    "stock": string;
    "description (markdown)": string;
    "title": string;
    "required": string;
    "default": string;
    "default (null)": string;
    "default (required)": string;
    "nullable": string;
    "enum": StringEnum;
    "enum (with default)": StringEnum;
    "enum (with default and required)": StringEnum;
    "enum (with empty option)": EnumWithEmptyOption;
    "enum (with empty option and empty default)": EnumWithEmptyOptionAndEmptyDefault;
}) { return fetch(`/anything/strings`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function stringTopLevelUsingPost(req: string) { return fetch(`/anything/strings/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function stringTopLevelJSONUsingPatch(req: string) { return fetch(`/anything/strings/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
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
}) { return fetch(`/anything/numbers`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
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
    "number (default, required)": number;
    "number (default null)": number;
    "number (nullable)": number;
}) { return fetch(`/anything/numbers`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function numberTopLevelUsingPatch(req: number) { return fetch(`/anything/numbers`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
export async function booleanSchemaSupportUsingPost(req: {
    "stock": boolean;
    "description (markdown)": boolean;
    "title": boolean;
    "required": boolean;
    "default": boolean;
    "default (required)": boolean;
    "inferred from enum": boolean;
}) { return fetch(`/anything/booleans`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function booleanTopLevelUsingPatch(req: boolean) { return fetch(`/anything/booleans`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
export async function arraySchemaSupportUsingPost(req: {
    "stock": unknown[];
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
        "string": string;
        "integer": number;
        "number": number;
        "boolean": boolean;
    }[];
    "array<object> (additionalProperties)": Record<string, unknown>[];
    "array<array<object>>": {
        "string": string;
    }[][];
}) { return fetch(`/anything/arrays`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function arrayTopLevelObjectsUsingPost(req: {
    "string": string;
    "integer": number;
    "number": number;
    "boolean": boolean;
    "array": unknown[];
    "object": Record<string, unknown>;
}[]) { return fetch(`/anything/arrays/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function arrayTopLevelPrimitivesUsingPatch(req: string[]) { return fetch(`/anything/arrays/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
export async function objectSchemaSupportUsingPost(req: {
    "object": {
        "string": string;
        "integer": number;
        "number": number;
        "object": {
            "string": string;
        };
        "array": string[];
    };
    "object (with `title`)": {
        "string": string;
        "integer": number;
        "number": number;
        "object": {
            "string": string;
        };
        "array": string[];
    };
    "object (without an explicit `type`)": {
        "property1": number;
        "property2": number;
    };
    "object (additionalProperties)": Record<string, unknown>;
    "object (without `properties`)": Record<string, unknown>;
}) { return fetch(`/anything/objects`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function nullSchemaSupportUsingPost(req: {
    "stock": null;
}) { return fetch(`/anything/null`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function mixedSchemaSupportUsingPost(req: {
    "string and number": unknown;
    "string and boolean": unknown;
    "string and null": unknown;
    "boolean and null": unknown;
}) { return fetch(`/anything/mixed`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function circularHandlingUsingPost(req: {
    "circular": Circular;
}) { return fetch(`/anything/circular`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function circularTopLevelUsingPatch(req: {
    "string": string;
    "children": Circular[];
}) { return fetch(`/anything/circular`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
export async function rawBodyTopLevelUsingPost(req: {
    "RAW_BODY": string;
}) { return fetch(`/anything/raw_body/top-level-payloads`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function rawBodyTopLevelJSONUsingPatch(req: {
    "RAW_BODY": string;
}) { return fetch(`/anything/raw_body/top-level-payloads`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
export async function quirksMissingTypeUsingPost(req: {
    "missing type": unknown;
    "missing type (on completely empty schema)": unknown;
    "implicit array": unknown;
    "implicit object": {
        "name": string;
    };
}) { return fetch(`/anything/quirks`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function quirksEntirelyIncompatibleAllOfUsingPut(req: string & number) { return fetch(`/anything/quirks/polymorphism`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
export async function quirksIncompatibleNestedAllOfUsingPost(req: {
    "incompatible": string & number;
    "compatible": {
        "name": string;
    } & {
        "name": unknown;
    };
}) { return fetch(`/anything/quirks/polymorphism`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
export async function quirksPartiallyUsableIncompatibleAllOfUsingPatch(req: string & number) { return fetch(`/anything/quirks/polymorphism`, {
    method: "PATCH",
    body: JSON.stringify(req)
}); }
