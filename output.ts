/**
 * 1.0.0
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
export enum OrderStatus {
  placed = "placed",
  approved = "approved",
  delivered = "delivered",
}

export enum PetStatus {
  available = "available",
  pending = "pending",
  sold = "sold",
}

export type Order = {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: OrderStatus;
  complete?: boolean;
};

export type Category = { id?: number; name?: string };

export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  /** @description User Status */
  userStatus?: number;
};

export type Tag = { id?: number; name?: string };

export type Pet = {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
};

export type ApiResponse = {
  code?: number;
  typeObject?: string;
  message?: string;
};

export type UserArray = User[];

updatePetUsingPUT.displayName = "updatePetUsingPUT";
export async function updatePetUsingPUT(pet: Pet) {
  return fetch(`/pet`, { method: "PUT", body: JSON.stringify(pet) });
}

addPetUsingPOST.displayName = "addPetUsingPOST";
export async function addPetUsingPOST(pet: Pet) {
  return fetch(`/pet`, { method: "POST", body: JSON.stringify(pet) });
}

findPetsByStatusUsingGET.displayName = "findPetsByStatusUsingGET";
export async function findPetsByStatusUsingGET({
  status,
}: {
  status: ("available" | "pending" | "sold")[];
}) {
  return fetch(
    `/pet/findByStatus?status=${encodeURIComponent(String(status))}`,
    { method: "GET" },
  ).then(async (resp) => (await resp.json()) as Pet[]);
}

findPetsByTagsUsingGET.displayName = "findPetsByTagsUsingGET";
export async function findPetsByTagsUsingGET({ tags }: { tags: string[] }) {
  return fetch(`/pet/findByTags?tags=${encodeURIComponent(String(tags))}`, {
    method: "GET",
  }).then(async (resp) => (await resp.json()) as Pet[]);
}

getPetByIdUsingGET.displayName = "getPetByIdUsingGET";
export async function getPetByIdUsingGET({ petId }: { petId: number }) {
  return fetch(`/pet/${petId}`, { method: "GET" }).then(
    async (resp) => (await resp.json()) as Pet,
  );
}

updatePetWithFormUsingPOST.displayName = "updatePetWithFormUsingPOST";
export async function updatePetWithFormUsingPOST(
  { petId }: { petId: number },
  { name, status }: { name: string; status: string },
) {
  const fd = new FormData();
  fd.append("name", String(name));
  fd.append("status", String(status));
  return fetch(`/pet/${petId}`, { method: "POST", body: fd });
}

deletePetUsingDELETE.displayName = "deletePetUsingDELETE";
export async function deletePetUsingDELETE({
  apiKey,
  petId,
}: {
  apiKey: string;
  petId: number;
}) {
  return fetch(`/pet/${petId}`, {
    method: "DELETE",
    headers: { api_key: encodeURIComponent(JSON.stringify(apiKey)) },
  });
}

uploadFileUsingPOST.displayName = "uploadFileUsingPOST";
export async function uploadFileUsingPOST(
  { petId }: { petId: number },
  file: File,
) {
  return fetch(`/pet/${petId}/uploadImage`, {
    method: "POST",
    body: JSON.stringify(file),
  }).then(async (resp) => (await resp.json()) as ApiResponse);
}

getInventoryUsingGET.displayName = "getInventoryUsingGET";
export async function getInventoryUsingGET() {
  return fetch(`/store/inventory`).then(
    async (resp) => (await resp.json()) as Record<string, unknown>,
  );
}

placeOrderUsingPOST.displayName = "placeOrderUsingPOST";
export async function placeOrderUsingPOST(order: Order) {
  return fetch(`/store/order`, {
    method: "POST",
    body: JSON.stringify(order),
  }).then(async (resp) => (await resp.json()) as Order);
}

getOrderByIdUsingGET.displayName = "getOrderByIdUsingGET";
export async function getOrderByIdUsingGET({ orderId }: { orderId: number }) {
  return fetch(`/store/order/${orderId}`, { method: "GET" }).then(
    async (resp) => (await resp.json()) as Order,
  );
}

deleteOrderUsingDELETE.displayName = "deleteOrderUsingDELETE";
export async function deleteOrderUsingDELETE({ orderId }: { orderId: number }) {
  return fetch(`/store/order/${orderId}`, { method: "DELETE" });
}

createUserUsingPOST.displayName = "createUserUsingPOST";
export async function createUserUsingPOST(user: User) {
  return fetch(`/user`, { method: "POST", body: JSON.stringify(user) });
}

createUsersWithArrayInputUsingPOST.displayName =
  "createUsersWithArrayInputUsingPOST";
export async function createUsersWithArrayInputUsingPOST(userarray: UserArray) {
  return fetch(`/user/createWithArray`, {
    method: "POST",
    body: JSON.stringify(userarray),
  });
}

createUsersWithListInputUsingPOST.displayName =
  "createUsersWithListInputUsingPOST";
export async function createUsersWithListInputUsingPOST(userarray: UserArray) {
  return fetch(`/user/createWithList`, {
    method: "POST",
    body: JSON.stringify(userarray),
  });
}

loginUserUsingGET.displayName = "loginUserUsingGET";
export async function loginUserUsingGET({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return fetch(
    `/user/login?username=${encodeURIComponent(String(username))}&password=${encodeURIComponent(String(password))}`,
    { method: "GET" },
  ).then(async (resp) => (await resp.json()) as string);
}

logoutUserUsingGET.displayName = "logoutUserUsingGET";
export async function logoutUserUsingGET() {
  return fetch(`/user/logout`);
}

getUserByNameUsingGET.displayName = "getUserByNameUsingGET";
export async function getUserByNameUsingGET({
  username,
}: {
  username: string;
}) {
  return fetch(`/user/${username}`, { method: "GET" }).then(
    async (resp) => (await resp.json()) as User,
  );
}

updateUserUsingPUT.displayName = "updateUserUsingPUT";
export async function updateUserUsingPUT(
  { username }: { username: string },
  user: User,
) {
  return fetch(`/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(user),
  });
}

deleteUserUsingDELETE.displayName = "deleteUserUsingDELETE";
export async function deleteUserUsingDELETE({
  username,
}: {
  username: string;
}) {
  return fetch(`/user/${username}`, { method: "DELETE" });
}
