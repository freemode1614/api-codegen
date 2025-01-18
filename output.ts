export type Pet = {
  pet_type: string;
};
export type Dog = Pet & {
  bark?: boolean;
  breed?: string;
};
export type Cat = Record<string, unknown>;
export type Object1 = {
  a?: string;
  b?: string;
};
export type Object2 = {
  c?: string;
  d?: string;
};
export type String1 = string;
export type String2 = string;
export type NestedOneOfRef = {
  config?: String1 | String2;
};
export async function petsUsingPatch(req: Cat | Dog) {
  return fetch(`/pets`, {
    method: "PATCH",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingAllOfObjectUsingPost(
  req: Record<string, unknown>,
) {
  return fetch(`/anything/all-of-object`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingAnyOfObjectUsingPost(
  req:
    | {
        a?: string;
        b?: string;
      }
    | {
        c?: string;
        d?: string;
      },
) {
  return fetch(`/anything/any-of-object`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingAnyOfPrimitiveUsingPost(req: string | number) {
  return fetch(`/anything/any-of-primitive`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
//AnyOf's with a top level type parameter should not render that type outside of their options
export async function anyOfWithTypeUsingPost(req: { event?: string }) {
  return fetch(`/any-of-with-type`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingOneOfObjectUsingPost(
  req:
    | {
        a?: string;
        b?: string;
      }
    | {
        c?: string;
        d?: string;
      },
) {
  return fetch(`/anything/one-of-object`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingOneOfPrimitiveUsingPost(req: string | number) {
  return fetch(`/anything/one-of-primitive`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingOneOfObjectRefUsingPost(req: Object1 | Object2) {
  return fetch(`/anything/one-of-object-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function oneOfComplexUsingPost(req: Record<string, unknown>) {
  return fetch(`/one-of-complex`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingNestedOneOfObjectRefUsingPost(req: {
  config?: Object1 | Object2;
}) {
  return fetch(`/anything/nested-one-of-object-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingNestedOneOfRefUsingPost(req: {
  config?: String1 | String2;
}) {
  return fetch(`/anything/nested-one-of-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
export async function anythingNestedOneOfObjectWithNestedOneOfUsingPost(req: {
  config?: Object1 | Object2 | (Cat | Dog);
}) {
  return fetch(`/anything/nested-one-of-object-with-nested-one-of`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
//OneOf's with a top level type parameter should not render that type outside of their options
export async function oneOfWithTypeUsingPost(req: { event?: string }) {
  return fetch(`/one-of-with-type`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
