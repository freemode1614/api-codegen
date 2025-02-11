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
/** Update an existing pet*/ export async function updatePetUsingPutJson(req: {
    "id": number;
    "category": Category;
    "name": string;
    "photoUrls": string[];
    "tags": Tag[];
    "status": PetStatus;
}) { return fetch(`/pet`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
/** Update an existing pet*/ export async function updatePetUsingPutXml(req: {
    "id": number;
    "category": Category;
    "name": string;
    "photoUrls": string[];
    "tags": Tag[];
    "status": PetStatus;
}) { return fetch(`/pet`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
/** Add a new pet to the store*/ export async function addPetUsingPostJson(req: {
    "id": number;
    "category": Category;
    "name": string;
    "photoUrls": string[];
    "tags": Tag[];
    "status": PetStatus;
}) { return fetch(`/pet`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** Add a new pet to the store*/ export async function addPetUsingPostXml(req: {
    "id": number;
    "category": Category;
    "name": string;
    "photoUrls": string[];
    "tags": Tag[];
    "status": PetStatus;
}) { return fetch(`/pet`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** Multiple status values can be provided with comma separated strings
* Finds Pets by status*/ export async function findPetsByStatusUsingGet({ status }: {
    status: PetStatus[];
}) { return fetch(`/pet/findByStatus?status=${status}`, {
    method: "GET"
}); }
/** Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
* Finds Pets by tags
*  @deprecated undefined*/ export async function findPetsByTagsUsingGet({ tags }: {
    tags: string[];
}) { return fetch(`/pet/findByTags?tags=${tags}`, {
    method: "GET"
}); }
/** Returns a single pet
* Find pet by ID*/ export async function getPetByIdUsingGet({ petId }: {
    petId: number;
}) { return fetch(`/pet/${petId}`, {
    method: "GET"
}); }
/** Updates a pet in the store with form data*/ export async function updatePetWithFormUsingPost({ petId }: {
    petId: number;
}, req: {
    "name": string;
    "status": string;
}) { const fd = new FormData(); fd.append("name", req.name); fd.append("status", req.status); return fetch(`/pet/${petId}`, {
    method: "POST",
    body: fd
}); }
/** Deletes a pet*/ export async function deletePetUsingDelete({ apiKey, petId }: {
    apiKey?: string;
    petId: number;
}) { return fetch(`/pet/${petId}`, {
    method: "DELETE",
    headers: { "api_key": encodeURIComponent(String(apiKey)) }
}); }
/** uploads an image*/ export async function uploadFileUsingPost({ petId }: {
    petId: number;
}, req: File) { return fetch(`/pet/${petId}/uploadImage`, {
    method: "POST",
    body: req
}).then(async (response) => (await response.json()) as ApiResponse); }
/** Returns a map of status codes to quantities
* Returns pet inventories by status*/ export async function getInventoryUsingGet() { return fetch(`/store/inventory`, {
    method: "GET"
}).then(async (response) => (await response.json()) as Record<string, unknown>); }
/** Place an order for a pet*/ export async function placeOrderUsingPost(req: {
    "id": number;
    "petId": number;
    "quantity": number;
    "shipDate": string;
    "status": OrderStatus;
    "complete": boolean;
}) { return fetch(`/store/order`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
* Find purchase order by ID*/ export async function getOrderByIdUsingGet({ orderId }: {
    orderId: number;
}) { return fetch(`/store/order/${orderId}`, {
    method: "GET"
}); }
/** For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
* Delete purchase order by ID*/ export async function deleteOrderUsingDelete({ orderId }: {
    orderId: number;
}) { return fetch(`/store/order/${orderId}`, {
    method: "DELETE"
}); }
/** This can only be done by the logged in user.
* Create user*/ export async function createUserUsingPost(req: {
    "id": number;
    "username": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "password": string;
    "phone": string;
    "userStatus": number;
}) { return fetch(`/user`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** Creates list of users with given input array*/ export async function createUsersWithArrayInputUsingPost(req: User[]) { return fetch(`/user/createWithArray`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** Creates list of users with given input array*/ export async function createUsersWithListInputUsingPost(req: User[]) { return fetch(`/user/createWithList`, {
    method: "POST",
    body: JSON.stringify(req)
}); }
/** Logs user into the system*/ export async function loginUserUsingGet({ username, password }: {
    username: string;
    password: string;
}) { return fetch(`/user/login?username=${username}&password=${password}`, {
    method: "GET"
}); }
/** Logs out current logged in user session*/ export async function logoutUserUsingGet() { return fetch(`/user/logout`, {
    method: "GET"
}); }
/** Get user by user name*/ export async function getUserByNameUsingGet({ username }: {
    username: string;
}) { return fetch(`/user/${username}`, {
    method: "GET"
}); }
/** This can only be done by the logged in user.
* Updated user*/ export async function updateUserUsingPut({ username }: {
    username: string;
}, req: {
    "id": number;
    "username": string;
    "firstName": string;
    "lastName": string;
    "email": string;
    "password": string;
    "phone": string;
    "userStatus": number;
}) { return fetch(`/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(req)
}); }
/** This can only be done by the logged in user.
* Delete user*/ export async function deleteUserUsingDelete({ username }: {
    username: string;
}) { return fetch(`/user/${username}`, {
    method: "DELETE"
}); }
