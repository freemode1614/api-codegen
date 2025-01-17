export type Pet = {
  name?: string;
  petType?: string;
};
export type Pets = Pet[];
export type Tag = {
  id?: number;
  name?: string;
};
export type Token = {
  access_token: number;
  token_type: string;
  expires_in: number;
};
export type User = {
  id?: number;
  email?: string;
  name?: string;
};
export async function parameterExamplesParam1Param2UsingGet({
  param1,
  param2,
}: {
  param1: string;
  param2: string;
}) {
  return fetch(`/parameterExamples/${param1}/${param2}`, {
    method: "GET",
  });
}
export async function parameterExamplesParam1Param2UsingPut(
  {
    param1,
    param2,
  }: {
    param1: string;
    param2: string;
  },
  req: User,
) {
  return fetch(`/parameterExamples/${param1}/${param2}`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        email?: string;
        name?: string;
      },
  );
}
export async function parameterExamplesParam1Param2UsingPatch(
  {
    param1,
    param2,
    param3,
    param4,
    param5,
    param6,
  }: {
    param1: string;
    param2: string;
    param3?: string;
    param4?: string;
    param5: string;
    param6?: string;
  },
  req: User,
) {
  return fetch(
    `/parameterExamples/${param1}/${param2}?param3=${param3}param4=${param4}`,
    {
      method: "PATCH",
      headers: {
        param5: encodeURIComponent(JSON.stringify(param5)),
        param6: encodeURIComponent(JSON.stringify(param6)),
      },
      body: JSON.stringify(req),
    },
  ).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        email?: string;
        name?: string;
      },
  );
}
export async function requestBodyUsingPut(req: User) {
  return fetch(`/requestBody`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        email?: string;
        name?: string;
      },
  );
}
export async function requestBodyUsingPost(req: User) {
  return fetch(`/requestBody`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        email?: string;
        name?: string;
      },
  );
}
export async function requestBodyUsingPatch(req: User) {
  return fetch(`/requestBody`, {
    method: "PATCH",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        id?: number;
        email?: string;
        name?: string;
      },
  );
}
export async function requestBodyPrimitiveExampleUsingPut(req: Pets) {
  return fetch(`/requestBody-primitive-example`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as Pet[]);
}
export async function requestBodyPrimitiveExampleUsingPost(req: string) {
  return fetch(`/requestBody-primitive-example`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as string);
}
export async function requestBodyPrimitiveExampleUsingPatch(req: Pet) {
  return fetch(`/requestBody-primitive-example`, {
    method: "PATCH",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        name?: string;
        petType?: string;
      },
  );
}
export async function requestBodyMultiMediaTypesUsingPostPlain(req: unknown) {
  return fetch(`/requestBody-multi-media-types`, {
    method: "POST",
  });
}
export async function requestBodyMultiMediaTypesUsingPostJson(req: unknown) {
  return fetch(`/requestBody-multi-media-types`, {
    method: "POST",
  }).then(async (response) => (await response.json()) as unknown);
}
export async function demoFormDataUsingPost(req: {
  client_id: string;
  client_secret: string;
  scope?: number;
}) {
  const fd = new FormData();
  return fetch(`/requestBody-form-data-example`, {
    method: "POST",
    body: fd,
  });
}
