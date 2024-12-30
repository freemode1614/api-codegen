import Generator from "@/providers/Generator";
import type { MaybeTagItem } from "@/types/tag";
import {
  ArrayType,
  Enum,
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
import normalizeName from "@/utils/normalizeName";
import { camelCase } from "@/utils/pathToName";

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

  public toCode(type: ArrayType["elementType"]) {
    if (!type) return "";
    if (typeof type === "string") {
      return type.toLowerCase();
    }

    if (isTypeParameter(type)) {
      return type.name.toLowerCase();
    }

    if (isTypeReference(type)) {
      return type.typeName.toLowerCase();
    }

    if (isUnionType(type) || isIntersectionType(type) || isArrayType(type)) {
      return "never";
    }

    const { members } = type;
    if (members.length === 0) {
      return "{}";
    }
    return [
      "{",
      members.map((t) => `${t.deprecated ? "\n/** @deprecated */\n" : ""}${camelCase(normalizeName(t.name))}`),
      "}",
    ].join("\n");
  }

  public toTypeDeclaration(type: ArrayType["elementType"]): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (type == undefined) return "unknown";
    if (typeof type === "string" || typeof type === "number") {
      return type;
    }

    if (isTypeParameter(type)) {
      return type.name;
    }

    if (isTypeReference(type)) {
      return this.toTypeReferenceDeclaration(type);
    }

    if (isUnionType(type)) {
      return this.toUnionTypeDeclaration(type);
    }

    if (isIntersectionType(type)) {
      return this.toIntersectionTypeDeclaration(type);
    }

    if (isArrayType(type)) {
      return this.toArrayTypeDeclaration(type);
    }

    const { members } = type;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!members || members.length === 0) {
      return "{}";
    }

    return [
      "{",
      members.map(
        (t) =>
          `"${camelCase(normalizeName(t.name))}"${t.require === true || t.in === "header" ? "" : "?"}: ${this.toTypeDeclaration(t.type)}`,
      ),
      "}",
    ].join("\n");
  }

  public toTypeReferenceDeclaration(typeReference: TypeReference) {
    const { typeName, typeArguments } = typeReference;

    if (!typeArguments) {
      return typeName;
    }

    return `${typeName}<${typeArguments.map((t) => this.toTypeDeclaration(t)).join(" ,")}>`;
  }

  public toUnionTypeDeclaration(type: UnionType) {
    const { types, name } = type;
    if (name !== unionType) {
      return "";
    }

    return types.map((t) => this.toTypeDeclaration(t)).join("|");
  }

  public toIntersectionTypeDeclaration(type: IntersectionType) {
    const { types, name } = type;
    if (name !== intersectionType) {
      return "";
    }

    return types.map((t) => this.toTypeDeclaration(t)).join("&");
  }

  public toArrayTypeDeclaration(type: ArrayType) {
    const { elementType } = type;
    return `(${this.toTypeDeclaration(elementType)})[]`;
  }

  public toEnumDeclaration(type: Enum) {
    const { members } = type;
    return [
      "{",
      members.map((t) => {
        if (!t.type) {
          return t.name === "" ? `"" = ""` : t.name;
        } else {
          return `${normalizeName(t.name)} = "${t.type}"`;
        }
      }),
      "}",
    ].join("\n");
  }

  public typeDeclaration(typeAlias: TypeAlias): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} type ${name} = ${this.toTypeDeclaration(type!)}`;
  }

  public interfaceDeclaration(typeAlias: TypeAlias): string {
    const { name, modifier = [], type } = typeAlias;
    return `${modifier.join(" ")} interface ${name} ${this.toTypeDeclaration(type!)}`;
  }

  public enumDeclaration(enumAlias: Enum): string {
    const { name, modifier = [] } = enumAlias;
    return `${modifier.join(" ")} enum ${name} ${this.toEnumDeclaration(enumAlias)}`;
  }
}
