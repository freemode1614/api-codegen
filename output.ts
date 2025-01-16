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
export type NestedOneOf_Ref = {
  config?: String1 | String2;
};
export async function petsUsingPatch(req: Cat | Dog) {
  return fetch(`/pets`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
}
export async function anythingAllOf_ObjectUsingPost(
  req: Record<string, unknown>,
) {
  return fetch(`/anything/all-of-object`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingAny_Of_ObjectUsingPost(
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
  });
}
export async function anythingAny_Of_PrimitiveUsingPost(req: string | number) {
  return fetch(`/anything/any-of-primitive`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anyOf_With_TypeUsingPost(req: { event?: string }) {
  return fetch(`/any-of-with-type`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingOneOf_ObjectUsingPost(
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
  });
}
export async function anythingOneOf_PrimitiveUsingPost(req: string | number) {
  return fetch(`/anything/one-of-primitive`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingOneOf_ObjectRefUsingPost(req: Object1 | Object2) {
  return fetch(`/anything/one-of-object-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function oneOf_ComplexUsingPost(req: Record<string, unknown>) {
  return fetch(`/one-of-complex`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingNestedOneOf_ObjectRefUsingPost(req: {
  config?: Object1 | Object2;
}) {
  return fetch(`/anything/nested-one-of-object-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingNestedOneOf_RefUsingPost(req: NestedOneOf_Ref) {
  return fetch(`/anything/nested-one-of-ref`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function anythingNestedOneOf_ObjectWith_NestedOneOf_UsingPost(req: {
  config?: Object1 | Object2 | (Cat | Dog);
}) {
  return fetch(`/anything/nested-one-of-object-with-nested-one-of`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
export async function oneOf_With_TypeUsingPost(req: { event?: string }) {
  return fetch(`/one-of-with-type`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}
