export const unionType = Symbol("union");

export const intersectionType = Symbol("intersection");

export type TypeParameter = {
  name: string;
};

export const isTypeParameter = (t: unknown): t is TypeParameter => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return !!((t as any).name && Object.keys(t as any).length === 1);
  } catch {
    return false;
  }
};

export type TypeKeyword = TypeParameter;

export type PropertySignature = {
  name: string;
  required?: boolean;
  deprecated?: boolean;
  description?: string;
  in?: string;
  type: ArrayType["elementType"];
  format?: string;
  dotdotdot?: boolean;
  initializer?: string | TypeLiteral;
};

export const isPropertySignature = (t: unknown): t is PropertySignature => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return !!((t as any).name && (t as any).type && Object.keys(t as any).length === 2);
  } catch {
    return false;
  }
};

export type TypeLiteral = {
  members: PropertySignature[];
};

export const isTypeLiteral = (t: unknown): t is TypeLiteral => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return !!((t as any).members && Object.keys(t as any).length === 1);
  } catch {
    return false;
  }
};

export type IntersectionType = {
  name: symbol;
  types: (string | TypeParameter | TypeLiteral | TypeReference)[];
};

export const isIntersectionType = (t: unknown): t is IntersectionType => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return !!((t as any).name && (t as any).name === intersectionType && Object.keys(t as any).length === 2);
  } catch {
    return false;
  }
};

export type UnionType = {
  name: symbol;
  types: ArrayType["elementType"][];
};

export const isUnionType = (t: unknown): t is UnionType => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    return !!((t as any).name && (t as any).name === unionType && Object.keys(t as any).length === 2);
  } catch {
    return false;
  }
};

export type TypeReference = {
  typeName: string;
  typeArguments?: ArrayType["elementType"][];
};

export const isTypeReference = (t: unknown): t is TypeReference => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    return !!(t as any).typeName;
  } catch {
    return false;
  }
};

export type ArrayType = {
  elementType: string | TypeParameter | TypeLiteral | TypeReference | IntersectionType | UnionType | ArrayType;
};

export const isArrayType = (t: unknown): t is ArrayType => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return !!("elementType" in (t as any));
  } catch {
    return false;
  }
};

export type TypeAlias = {
  name: string;
  modifier?: string[];
  typeParameters?: ArrayType["elementType"][];
  type?: ArrayType["elementType"];
};

export type Enum = {
  name: string;
  modifier?: string[];
  members: (Omit<PropertySignature, "require" | "deprecated"> & { type?: string })[];
};
