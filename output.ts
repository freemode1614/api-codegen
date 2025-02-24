export enum ObjectWithArrayNums {
  "0_" = 0,
  "1_" = 1,
  "2_" = 2,
  "3_" = 3,
}
export type MultischemaOfEverything =
  | (
      | ArrayOfObjectsOfObjectsAndArrays
      | {
          objEverything: ObjectOfEverything;
          flatObj: FlatObject;
        }
    )
  | ArrayOfPrimitives
  | ArrayOfFlatObjects
  | FlatObject
  | ObjectOfEverything;
export type ArrayOfObjectsOfObjectsAndArrays = ObjectOfObjectsAndArrays[];
export type ObjectOfEverything = {
  objectOfObjectsAndArrays: ObjectOfObjectsAndArrays;
  arrayOfObjectsOfObjectsAndArrays: ArrayOfObjectsOfObjectsAndArrays;
  objectOfAdditionalProperties: ObjectOfAdditionalPropertiesObjectPolymorphism;
  string: string;
};
export type ArrayOfPrimitives = string[];
export type ArrayOfFlatObjects = FlatObject[];
export type ObjectOfObjectsAndArrays = {
  singleObject: FlatObject;
  arrayOfPrimitives: ArrayOfPrimitives;
  arrayOfObjects: ArrayOfFlatObjects;
  primitive: string;
};
export type ObjectOfAdditionalPropertiesObjectPolymorphism = Record<
  string,
  unknown
>;
export type FlatObject = {
  string: string;
  boolean: boolean;
  number: number;
};
export type ObjectWithArray = {
  Array: {
    inputs: {
      "input 1": string;
      "input 2": string;
    }[];
    nums: ObjectWithArrayNums[];
  }[];
};
/**
 * This payload is an array containing a complex payload of arrays, objects, and primitives.
 * Array of Everything
 */
export async function anythingTopLevelArrayUsingPut(req: ObjectOfEverything[]) {
  return fetch(`/v1/anything/top-level-array`, {
    method: "PUT",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as ObjectOfEverything[]);
}
/**
 * This payload is an array containing a simple flat object.
 * Simple Array
 */
export async function anythingTopLevelArrayUsingPost(req: FlatObject[]) {
  return fetch(`/v1/anything/top-level-array`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as ArrayOfFlatObjects);
}
/**
 * This payload is an object comprised of simple flat objects.
 * Simple Object
 */
export async function anythingTopLevelObjectSimpleUsingPost(req: {
  nestedObject_1: FlatObject;
  nestedObject_2: FlatObject;
  nestedObject_3: FlatObject;
}) {
  return fetch(`/v1/anything/top-level-object/simple`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(
    async (response) =>
      (await response.json()) as {
        nestedObject: FlatObject;
      },
  );
}
/**
 * Object of Everything
 */
export async function topLevelObjectOfEverythingUsingPost(req: {
  objectOfObjectsAndArrays: ObjectOfObjectsAndArrays;
  arrayOfObjectsOfObjectsAndArrays: ArrayOfObjectsOfObjectsAndArrays;
  objectOfAdditionalProperties: ObjectOfAdditionalPropertiesObjectPolymorphism;
  string: string;
}) {
  return fetch(`/v1/top-level-object/of-everything`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as ObjectOfEverything);
}
/**
 * Multischema of Everything
 */
export async function multischemaOfEverythingUsingPost(
  req:
    | (
        | ArrayOfObjectsOfObjectsAndArrays
        | {
            objEverything: ObjectOfEverything;
            flatObj: FlatObject;
          }
      )
    | ArrayOfPrimitives
    | ArrayOfFlatObjects
    | FlatObject
    | ObjectOfEverything,
) {
  return fetch(`/v1/multischema/of-everything`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(
    async (response) => (await response.json()) as MultischemaOfEverything,
  );
}
