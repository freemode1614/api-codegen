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

export type TypeParameter = {
  name: string;
};

export type TypeKeyword = TypeParameter;

export type PropertySignature = {
  name: string;
  type: string | TypeLiteral | TypeReference;
};

export type TypeLiteral = {
  members: PropertySignature[];
};

export type IntersectionType = {
  name: symbol;
  types: (TypeParameter | TypeLiteral | ExpressionWithTypeArguments)[];
};

export type UnionType = {
  name: symbol;
  types: (TypeParameter | TypeLiteral | ExpressionWithTypeArguments)[];
};

export type TypeReference = {
  typeName: string;
  typeArguments?: (TypeParameter | TypeLiteral | ExpressionWithTypeArguments | UnionType | IntersectionType)[];
};

export type ExpressionWithTypeArguments = {
  expression: string;
  typeArguments: TypeReference["typeArguments"];
};

export type ArrayType = {
  elementType: string | TypeKeyword | TypeLiteral | TypeReference | IntersectionType | UnionType;
};

export type TypeAlias = {
  name: string;
  modifier?: string[];
  typeParameters?: (TypeParameter | PropertySignature)[];
  type?: TypeLiteral | TypeReference;
};
