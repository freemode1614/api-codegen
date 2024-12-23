/**
 * 1.0.0
 * Swagger Petstore
 * This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
 */
 enum OrderStatus {
placed = "placed",approved = "approved",delivered = "delivered"
}



export type Order = {
id: number,petId: number,quantity: number,shipDate: string,status: OrderStatus,complete: boolean
};

export type Category = {
id: number,name: string
};

export type User = {
id: number,username: string,firstName: string,lastName: string,email: string,password: string,phone: string,userStatus: number
};

export type Tag = {
id: number,name: string
};

export type Pet = {
id: number,category: Category,name: string,photoUrls: (string)[],tags: (Tag)[],status: "available"|"pending"|"sold"
};

export type ApiResponse = {
code: number,type: string,message: string
};

export type UserArray = (User)[]




export async function updatePetUsingPut(Pet: Pet) {
  
  
  return fetch(`/pet`, {
  method: "PUT",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function addPetUsingPost(Pet: Pet) {
  
  
  return fetch(`/pet`, {
  method: "POST",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function findPetsByStatusUsingGet({
status
}: {
status: (string)[]
}) {
  
  
  return fetch(`/pet/findByStatus?status=${status}`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<(Pet)[]>);;
}



export async function findPetsByTagsUsingGet({
tags
}: {
tags: (string)[]
}) {
  
  
  return fetch(`/pet/findByTags?tags=${tags}`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<(Pet)[]>);;
}



export async function getPetByIdUsingGet({
petId
}: {
petId: number
}) {
  
  
  return fetch(`/pet/{petId}?`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<{
id: number,category: Category,name: string,photoUrls: (string)[],tags: (Tag)[],status: "available"|"pending"|"sold"
}>);;
}



export async function updatePetWithFormUsingPost({
name,status
}: {
name: string,status: string
}) {
  const fd = new FormData();
  fd.append("name", name + "");
fd.append("status", status + "");
  return fetch(`/pet/{petId}?`, {
  method: "POST",
  body: fd
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function deletePetUsingDelete({
api_key,petId
}: {
api_key?: string,petId: number
}) {
  
  
  return fetch(`/pet/{petId}?`, {
  method: "DELETE",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function uploadFileUsingPost({
additionalMetadata,file
}: {
additionalMetadata: string,file: Blob
}) {
  const fd = new FormData();
  fd.append("additionalMetadata", additionalMetadata + "");
fd.append("file", file + "");
  return fetch(`/pet/{petId}/uploadImage?`, {
  method: "POST",
  body: fd
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<{
code: number,type: string,message: string
}>);;
}



export async function getInventoryUsingGet({

}: {

}) {
  
  
  return fetch(`/store/inventory?`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<Record<string ,unknown>>);;
}



export async function placeOrderUsingPost({
id,petId,quantity,shipDate,status,complete
}: {
id: number,petId: number,quantity: number,shipDate: string,status: Status,complete: boolean
}) {
  const fd = new FormData();
  fd.append("id", id + "");
fd.append("petId", petId + "");
fd.append("quantity", quantity + "");
fd.append("shipDate", shipDate + "");
fd.append("status", status + "");
fd.append("complete", complete + "");
  return fetch(`/store/order?`, {
  method: "POST",
  body: fd
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<{
id: number,petId: number,quantity: number,shipDate: string,status: Status,complete: boolean
}>);;
}



export async function getOrderByIdUsingGet({
orderId
}: {
orderId: number
}) {
  
  
  return fetch(`/store/order/{orderId}?`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<{
id: number,petId: number,quantity: number,shipDate: string,status: Status,complete: boolean
}>);;
}



export async function deleteOrderUsingDelete({
orderId
}: {
orderId: number
}) {
  
  
  return fetch(`/store/order/{orderId}?`, {
  method: "DELETE",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function createUserUsingPost({
id,username,firstName,lastName,email,password,phone,userStatus
}: {
id: number,username: string,firstName: string,lastName: string,email: string,password: string,phone: string,userStatus: number
}) {
  const fd = new FormData();
  fd.append("id", id + "");
fd.append("username", username + "");
fd.append("firstName", firstName + "");
fd.append("lastName", lastName + "");
fd.append("email", email + "");
fd.append("password", password + "");
fd.append("phone", phone + "");
fd.append("userStatus", userStatus + "");
  return fetch(`/user?`, {
  method: "POST",
  body: fd
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function createUsersWithArrayInputUsingPost(UserArray: UserArray) {
  
  
  return fetch(`/user/createWithArray`, {
  method: "POST",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function createUsersWithListInputUsingPost(UserArray: UserArray) {
  
  
  return fetch(`/user/createWithList`, {
  method: "POST",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function loginUserUsingGet({
username,password
}: {
username: string,password: string
}) {
  
  
  return fetch(`/user/login?username=${username}&password=${password}`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<string>);;
}



export async function logoutUserUsingGet({

}: {

}) {
  
  
  return fetch(`/user/logout?`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function getUserByNameUsingGet({
username
}: {
username: string
}) {
  
  
  return fetch(`/user/{username}?`, {
  method: "GET",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<{
id: number,username: string,firstName: string,lastName: string,email: string,password: string,phone: string,userStatus: number
}>);;
}



export async function updateUserUsingPut({
id,username,firstName,lastName,email,password,phone,userStatus
}: {
id: number,username: string,firstName: string,lastName: string,email: string,password: string,phone: string,userStatus: number
}) {
  const fd = new FormData();
  fd.append("id", id + "");
fd.append("username", username + "");
fd.append("firstName", firstName + "");
fd.append("lastName", lastName + "");
fd.append("email", email + "");
fd.append("password", password + "");
fd.append("phone", phone + "");
fd.append("userStatus", userStatus + "");
  return fetch(`/user/{username}?`, {
  method: "PUT",
  body: fd
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}



export async function deleteUserUsingDelete({
username
}: {
username: string
}) {
  
  
  return fetch(`/user/{username}?`, {
  method: "DELETE",
  
  // headers: {
  //   {{headers}}
  // },
}).then((res) => res.json() as Promise<unknown>);;
}
