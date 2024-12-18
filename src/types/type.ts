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

export const isTypeParameter = (t: unknown): t is TypeParameter =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  !!((t as any).name && Object.keys(t as any).length === 1);

export type TypeKeyword = TypeParameter;

export type PropertySignature = {
  name: string;
  type: string | TypeLiteral | TypeReference;
};

export const isPropertySignature = (t: unknown): t is PropertySignature =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  !!((t as any).name && (t as any).type && Object.keys(t as any).length === 2);

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

export const isUnionType = (t: unknown): t is PropertySignature =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  !!((t as any).name && (t as any).type && Object.keys(t as any).length === 2);

export type TypeReference = {
  typeName: string;
  typeArguments?: (TypeParameter | TypeLiteral | ExpressionWithTypeArguments | UnionType | IntersectionType)[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
export const isTypeReference = (t: unknown): t is TypeReference => !!(t as any).typeName;

export type ExpressionWithTypeArguments = {
  expression: string;
  typeArguments: TypeReference["typeArguments"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
export const isExpressionWithTypeArguments = (t: unknown): t is ExpressionWithTypeArguments => !!(t as any).expression;

export type ArrayType = {
  elementType: string | TypeKeyword | TypeLiteral | TypeReference | IntersectionType | UnionType;
};

export type TypeAlias = {
  name: string;
  modifier?: string[];
  typeParameters?: (TypeParameter | PropertySignature)[];
  type?: TypeLiteral | TypeReference;
};
