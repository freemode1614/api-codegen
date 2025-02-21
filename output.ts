export type DateTime = string;
export type Offset = {
    "id": string;
    "rules": Rules;
};
export type OffsetTransition = {
    "dateTime": string;
    "offsetAfter": Offset;
    "offsetBefore": Offset;
};
export type Rules = {
    "transitions": OffsetTransition[];
};
export type SalesLine = {
    "stock": ProductStock;
};
export type ProductStock = {
    "test_param": SalesLine[];
};
/**

*/
export async function anythingUsingGet() { return fetch(`/anything`, {
    method: "GET"
}).then(async (response) => (await response.json()) as {
    "dateTime": string;
    "offsetAfter": Offset;
    "offsetBefore": Offset;
}); }
/**
* This operation is different because it has a circular ref array as a parameter and in its response, but not its request body.
*/
export async function anythingUsingPut({ content }: {
    content?: SalesLine[];
}) { return fetch(`/anything`, {
    method: "PUT",
    headers: { "content": encodeURIComponent(String(content)) }
}).then(async (response) => (await response.json()) as SalesLine[]); }
/**

*/
export async function anythingUsingPost(req: {
    "circular": Offset;
}) { return fetch(`/anything`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
