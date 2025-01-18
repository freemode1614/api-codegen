export type Order = {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: string;
  complete?: boolean;
};
export type Category = {
  id?: number;
  name?: string;
};
export type User = {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
};
export type Tag = {
  id?: number;
  name?: string;
};
export type Pet = {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: string;
};
export type ApiResponse = {
  code?: number;
  type?: string;
  message?: string;
};
export type UserArray = User[];
export async function updatePetUsingPutJson(req: Pet) {
  return fetch(`/pet`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function updatePetUsingPutXml(req: Pet) {
  return fetch(`/pet`, {
    method: "PUT",
    body: JSON.stringify(req),
  });
}
export async function addPetUsingPostJson(req: Pet) {
  return fetch(`/pet`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function addPetUsingPostXml(req: Pet) {
  return fetch(`/pet`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function findPetsByStatusUsingGet({
  status,
}: {
  status: string[];
}) {
  return fetch(`/pet/findByStatus?status=${status}`, {
    method: "GET",
  });
}
export async function findPetsByTagsUsingGet({ tags }: { tags: string[] }) {
  return fetch(`/pet/findByTags?tags=${tags}`, {
    method: "GET",
  });
}
export async function getPetByIdUsingGet({ petId }: { petId: number }) {
  return fetch(`/pet/${petId}`, {
    method: "GET",
  });
}
export async function updatePetWithFormUsingPost(
  {
    petId,
  }: {
    petId: number;
  },
  req: {
    name?: string;
    status?: string;
  },
) {
  const fd = new FormData();
  req.name && fd.append("name", req.name);
  req.status && fd.append("status", req.status);
  return fetch(`/pet/${petId}`, {
    method: "POST",
    body: fd,
  });
}
export async function deletePetUsingDelete({
  apiKey,
  petId,
}: {
  apiKey?: string;
  petId: number;
}) {
  return fetch(`/pet/${petId}`, {
    method: "DELETE",
    headers: { api_key: encodeURIComponent(JSON.stringify(apiKey)) },
  });
}
export async function uploadFileUsingPost(
  {
    petId,
  }: {
    petId: number;
  },
  req: {
    additionalMetadata?: string;
    file: File;
  },
) {
  const fd = new FormData();
  req.additionalMetadata &&
    fd.append("additionalMetadata", req.additionalMetadata);
  req.file && fd.append("file", req.file);
  return fetch(`/pet/${petId}/uploadImage`, {
    method: "POST",
    body: fd,
  });
}
export async function getInventoryUsingGet() {
  return fetch(`/store/inventory`, {
    method: "GET",
  });
}
export async function placeOrderUsingPost(req: Order) {
  return fetch(`/store/order`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        petId?: number;
        quantity?: number;
        shipDate?: string;
        status?: string;
        complete?: boolean;
      },
  );
}
export async function getOrderByIdUsingGet({ orderId }: { orderId: number }) {
  return fetch(`/store/order/${orderId}`, {
    method: "GET",
  });
}
export async function deleteOrderUsingDelete({ orderId }: { orderId: number }) {
  return fetch(`/store/order/${orderId}`, {
    method: "DELETE",
  });
}
export async function createUserUsingPost(req: User) {
  return fetch(`/user`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function createUsersWithArrayInputUsingPost(req: User[]) {
  return fetch(`/user/createWithArray`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function createUsersWithListInputUsingPost(req: User[]) {
  return fetch(`/user/createWithList`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function loginUserUsingGet({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return fetch(`/user/login?username=${username}password=${password}`, {
    method: "GET",
  });
}
export async function logoutUserUsingGet() {
  return fetch(`/user/logout`, {
    method: "GET",
  });
}
export async function getUserByNameUsingGet({
  username,
}: {
  username: string;
}) {
  return fetch(`/user/${username}`, {
    method: "GET",
  });
}
export async function updateUserUsingPut(
  {
    username,
  }: {
    username: string;
  },
  req: User,
) {
  return fetch(`/user/${username}`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function deleteUserUsingDelete({
  username,
}: {
  username: string;
}) {
  return fetch(`/user/${username}`, {
    method: "DELETE",
  });
}
