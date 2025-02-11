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
/**
* Update an existing pet
*/
export async function updatePetUsingPut(req: {
    "body"?: unknown;
}) { return fetch(`/api/pet`, {
    method: "PUT",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Add a new pet to the store
*/
export async function addPetUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/api/pet`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Multiple status values can be provided with comma separated strings
* Finds Pets by status
*/
export async function findPetsByStatusUsingGet({ status }: {
    status: ("available" | "pending" | "sold")[];
}) { return fetch(`/api/pet/findByStatus?status=${status}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet[]); }
/**
* Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
* Finds Pets by tags
* @deprecated
*/
export async function findPetsByTagsUsingGet({ tags }: {
    tags: string[];
}) { return fetch(`/api/pet/findByTags?tags=${tags}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet[]); }
/**
* Returns a single pet
* Find pet by ID
*/
export async function getPetByIdUsingGet({ petId }: {
    petId: number;
}) { return fetch(`/api/pet/${petId}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Pet); }
/**
* Updates a pet in the store with form data
*/
export async function updatePetWithFormUsingPost({ petId }: {
    petId: number;
}, req: {
    "name"?: string;
    "status"?: string;
}) { return fetch(`/api/pet/${petId}`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Deletes a pet
*/
export async function deletePetUsingDelete({ apiKey, petId }: {
    apiKey?: string;
    petId: number;
}) { return fetch(`/api/pet/${petId}`, {
    method: "DELETE",
    headers: { "api_key": encodeURIComponent(String(apiKey)) }
}).then(async (response) => (await response.json()) as unknown); }
/**
* uploads an image
*/
export async function uploadFileUsingPost({ petId }: {
    petId: number;
}, req: {
    "additionalMetadata"?: string;
    "file"?: File;
}) { const fd = new FormData(); req.additionalMetadata && fd.append("additionalMetadata", req.additionalMetadata); req.file && fd.append("file", String(req.file)); return fetch(`/api/pet/${petId}/uploadImage`, {
    method: "POST",
    body: fd
}).then(async (response) => (await response.json()) as ApiResponse); }
/**
* Returns a map of status codes to quantities
* Returns pet inventories by status
*/
export async function getInventoryUsingGet() { return fetch(`/api/store/inventory`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Record<string, unknown>); }
/**
* Place an order for a pet
*/
export async function placeOrderUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/api/store/order`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as Order); }
/**
* For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
* Find purchase order by ID
*/
export async function getOrderByIdUsingGet({ orderId }: {
    orderId: number;
}) { return fetch(`/api/store/order/${orderId}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Order); }
/**
* For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
* Delete purchase order by ID
*/
export async function deleteOrderUsingDelete({ orderId }: {
    orderId: number;
}) { return fetch(`/api/store/order/${orderId}`, {
    method: "DELETE"
}).then(async (response) => (await response.json()) as unknown); }
/**
* This can only be done by the logged in user.
* Create user
*/
export async function createUserUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Creates list of users with given input array
*/
export async function createUsersWithArrayInputUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/api/user/createWithArray`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Creates list of users with given input array
*/
export async function createUsersWithListInputUsingPost(req: {
    "body"?: unknown;
}) { return fetch(`/api/user/createWithList`, {
    method: "POST",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* Logs user into the system
*/
export async function loginUserUsingGet({ username, password }: {
    username: string;
    password: string;
}) { return fetch(`/api/user/login?username=${username}&password=${password}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as string); }
/**
* Logs out current logged in user session
*/
export async function logoutUserUsingGet() { return fetch(`/api/user/logout`, {
    method: "GET"
}).then(async (response) => (await response.json()) as unknown); }
/**
* Get user by user name
*/
export async function getUserByNameUsingGet({ username }: {
    username: string;
}) { return fetch(`/api/user/${username}`, {
    method: "GET"
}).then(async (response) => (await response.json()) as User); }
/**
* This can only be done by the logged in user.
* Updated user
*/
export async function updateUserUsingPut({ username }: {
    username: string;
}, req: {
    "body"?: unknown;
}) { return fetch(`/api/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(req)
}).then(async (response) => (await response.json()) as unknown); }
/**
* This can only be done by the logged in user.
* Delete user
*/
export async function deleteUserUsingDelete({ username }: {
    username: string;
}) { return fetch(`/api/user/${username}`, {
    method: "DELETE"
}).then(async (response) => (await response.json()) as unknown); }
