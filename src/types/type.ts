/**
 *    |1 | |   2  |  |     3       |
 * -> Omit<SomeType, "Key1" | "Key2">
 */
export interface GenericityTypeItem {
  /* 1 */
  type: string | symbol;
  typeArgs: [
    /* 2 */
    string | GenericityTypeItem | NormalTypeItems,
    /* 3 */
    ...string[],
  ];
}

export const unionType = Symbol("union");

/**
 *
 * A | B | C
 *
 */
export type UnionTypeItem = {
  typeArgs: (string | GenericityTypeItem | NormalTypeItems)[];
};

export const intersectionType = Symbol("intersection");

/**
 *
 * A & B & C
 *
 */
export type IntersectionTypeItem = {
  typeArgs: (string | GenericityTypeItem | NormalTypeItems)[];
};

/**
 *          string       GenericityTypeItem                        NormalTypeItems
 *            |            |                                         |
 *           \|/          \|/                                       \|/
 * -> { name: string; age: Omit<SomeType, "Key1" | "Key2">; address: { code: string; location: string } }
 */
export type NormalTypeItem = {
  // in: string;
  name: string;
  required?: boolean;
  deprecated?: boolean;
  type: string | GenericityTypeItem | NormalTypeItems | UnionTypeItem;
};

export type NormalTypeItems = NormalTypeItem[];

export interface NormalType extends Omit<NormalTypeItem, "required"> {
  modifier?: string[];
}

export type MaybeType = NormalType;

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
export const isUnionType = (t: any): t is UnionTypeItem => !!t?.type;
