export enum OrderStatus {
    "approved" = "approved",
    "delivered" = "delivered",
    "placed" = "placed"
}
export enum PetStatus {
    "available" = "available",
    "pending" = "pending",
    "sold" = "sold"
}
export type Order = {
    "id": number;
    "petId": number;
    "quantity": number;
    "shipDate": string;
    "status": OrderStatus;
    "complete": boolean;
};
export type Category = {
    "id": number;
    "name": string;
};
export type User = {
    "id": number;
    "username": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "password": string;
    "phone": string;
    "userStatus": number;
};
export type Tag = {
    "id": number;
    "name": string;
};
export type Pet = {
    "id": number;
    "category": Category;
    "name": string;
    "photoUrls": string[];
    "tags": Tag[];
    "status": PetStatus;
};
export type ApiResponse = {
    "code": number;
    "type": string;
    "message": string;
};
export async function updatePetUsingPut(req: {
    "body"?: unknown;
}) { return fetch(`/pet`, {
    method: "PUT",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function addPetUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/pet`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function findPetsByStatusUsingGet({ status }: {
    status: ("available" | "pending" | "sold")[];
}) { return fetch(`/pet/findByStatus?status=${status}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet[]); }
export async function findPetsByTagsUsingGet({ tags }: {
    tags: string[];
}) { return fetch(`/pet/findByTags?tags=${tags}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet[]); }
export async function getPetByIdUsingGet({ petId }: {
    petId: number;
}) { return fetch(`/pet/${petId}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet); }
export async function updatePetWithFormUsingPost({ petId }: {
    petId: number;
}, req: {
    "name"?: string;
    "status"?: string;
}) { return fetch(`/pet/${petId}`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function deletePetUsingDelete({ apiKey, petId }: {
    apiKey?: string;
    petId: number;
}) { return fetch(`/pet/${petId}`, {
    method: "DELETE",
    headers: { "api_key": encodeURIComponent(String(apiKey)) }
}).then(async (response) => (await response.json()) as unknown); }
export async function uploadFileUsingPost({ petId }: {
    petId: number;
}, req: {
    "additionalMetadata"?: string;
    "file"?: File;
}) { const fd = new FormData(); fd.append("additionalMetadata", req.additionalMetadata); fd.append("file", String(req.file)); return fetch(`/pet/${petId}/uploadImage`, {
    method: "POST",
    body: fd
}).then(async (response) => (await response.json()) as ApiResponse); }
export async function getInventoryUsingGet() { return fetch(`/store/inventory`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Record<string, unknown>); }
export async function placeOrderUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/store/order`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as Order); }
export async function getOrderByIdUsingGet({ orderId }: {
    orderId: number;
}) { return fetch(`/store/order/${orderId}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Order); }
export async function deleteOrderUsingDelete({ orderId }: {
    orderId: number;
}) { return fetch(`/store/order/${orderId}`, {
    method: "DELETE"
}).then(async (response) => (await response.json()) as unknown); }
export async function createUserUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/user`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function createUsersWithArrayInputUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/user/createWithArray`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function createUsersWithListInputUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/user/createWithList`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function loginUserUsingGet({ username, password }: {
    username: string;
    password: string;
}) { return fetch(`/user/login?username=${username}&password=${password}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as string); }
export async function logoutUserUsingGet() { return fetch(`/user/logout`, {
    method: "GET"
}).then(async (response) => (await response.json()) as unknown); }
export async function getUserByNameUsingGet({ username }: {
    username: string;
}) { return fetch(`/user/${username}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as User); }
export async function updateUserUsingPut({ username }: {
    username: string;
}, req: {
    "body"?: unknown;
}) { return fetch(`/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
export async function deleteUserUsingDelete({ username }: {
    username: string;
}) { return fetch(`/user/${username}`, {
    method: "DELETE"
}).then(async (response) => (await response.json()) as unknown); }
