import Generator from "@/providers/Generator";
import type {
  GenericityTypeItem,
  MaybeType,
  NormalTypeItem,
  TypeLiteral,
  TypeReference,
  UnionType,
} from "@/types/type";
import { intersectionType, isTypeReference, unionType } from "@/types/type";

export default class Type implements Generator {
  protected type!: MaybeType;

  protected constructor(type: MaybeType) {
    this.type = type;
  }

  static of(type: MaybeType) {
    return new Type(type);
  }

  #toTypeReference(typeReference: TypeReference) {
    const { typeName, typeArguments } = typeReference;

    if (!typeArguments) {
      return typeName;
    }

    return `${typeName}<${typeArguments.map((argument) => {}).join(" ,")}>`;
  }

  #toTypeLiteral_(typeLiteral: TypeLiteral) {
    const { members } = typeLiteral;

    return [
      "{",
      members.map((member) => {
        const { name, type } = member;

        if (typeof type === "string") {
          return `${name}: ${type}`;
        }

        if (isTypeReference(type)) {
          return `${name}: ${this.#toTypeReference(type)}`;
        }
      }),
      "}",
    ];
  }

  #toUnionType(type: UnionType) {
    const { types, name } = type;
    if (name !== unionType) {
      return "";
    }

    return types.map((type) => {});
  }

  public static toTypeLiteral(typeDefine: NormalTypeItem["type"]): string {
    if (typeof typeDefine === "string") {
      return typeDefine;
    }

    if (Array.isArray(typeDefine)) {
      const literal = ["{"];

      typeDefine.forEach(({ name, type: types, required }) => {
        literal.push(`  ${name}${!required ? "?" : ""}: ${this.toTypeLiteral(types)}`);
      });

      literal.push("}");
      return literal.join("\n");
    }

    const { type, typeArgs } = typeDefine as GenericityTypeItem;
    const [type_, ...keys] = typeArgs;

    if (type === unionType) {
      return typeArgs.map((argument) => this.toTypeLiteral(argument)).join(" |");
    }

    if (type === intersectionType) {
      return typeArgs.map((argument) => this.toTypeLiteral(argument)).join(" &");
    }

    return `${type as string}<${this.toTypeLiteral(type_)}${keys.length > 0 ? `, ${keys.map((key) => `"${key}"`).join("|")}` : ""}>`;
  }

  protected toTypeDeclaration() {
    const { name, type: typeDefine } = this.type;
    return ["export", "type", name, "=", Type.toTypeLiteral(typeDefine)].join(" ");
  }

  to() {
    return this.toTypeDeclaration();
  }
}
