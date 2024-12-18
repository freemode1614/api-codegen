import Generator from "@/providers/Generator";
import type { MaybeTagItem } from "@/types/tag";
import {
  ArrayType,
  IntersectionType,
  intersectionType,
  isArrayType,
  isIntersectionType,
  isTypeParameter,
  isTypeReference,
  isUnionType,
  TypeAlias,
  TypeReference,
  UnionType,
  unionType,
} from "@/types/type";

export default class CodeGen implements Generator {
  public comment(comments: MaybeTagItem[]): string {
    const strs = ["/**"];

    const maxLength = comments
      .map(({ tag, name }) => {
        return tag && name ? `@${tag} ${name}  `.length : 0;
      })
      .sort((a, b) => (a > b ? -1 : 0))[0];

    comments.forEach(({ tag, name, comment }) => {
      if (!tag || !name) {
        strs.push(` * ${comment}`);
      } else {
        const comment_ = `@${tag} ${name}`;
        const extraSpace = maxLength - comment_.length;
        strs.push(` * @${tag} ${name + Array(extraSpace).fill("").join(" ")} - ${comment}`);
      }
    });

    strs.push(" */");

    return strs.join("\n");
  }

  toType(type: ArrayType["elementType"]): string {
    if (typeof type === "string") {
      return type;
    }

    if (isTypeParameter(type)) {
      return type.name;
    }

    if (isTypeReference(type)) {
      return this.toTypeReference(type);
    }

    if (isUnionType(type)) {
      return this.toUnionType(type);
    }

    if (isIntersectionType(type)) {
      return this.toIntersectionType(type);
    }

    if (isArrayType(type)) {
      return this.toArrayType(type);
    }

    const { members } = type;

    return ["{", members.map(this.toType), "}"].join("\n");
  }

  toTypeReference(typeReference: TypeReference) {
    const { typeName, typeArguments } = typeReference;

    if (!typeArguments) {
      return typeName;
    }

    return `${typeName}<${typeArguments.map(this.toType).join(" ,")}>`;
  }

  toUnionType(type: UnionType) {
    const { types, name } = type;
    if (name !== unionType) {
      return "";
    }

    return types.map((type) => this.toType(type)).join("|");
  }

  toIntersectionType(type: IntersectionType) {
    const { types, name } = type;
    if (name !== intersectionType) {
      return "";
    }

    return types.map((type) => this.toType(type)).join("&");
  }

  toArrayType(type: ArrayType) {
    const { elementType } = type;
    return `(${this.toType(elementType)})[]`;
  }

  public typeDeclaration(typeAlias: TypeAlias): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} ${name} = ${this.toType(type!)}`;
  }

  public interfaceDeclaration(typeAlias: TypeAlias): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} ${name} = ${this.toType(type!)}`;
  }

  public enum(): string {
    throw new Error("Method not implemented.");
  }
}
