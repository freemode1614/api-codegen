import Generator from "@/providers/Generator";
import { MaybeType, NormalTypeItem } from "@/types/type";

export default class Type implements Generator {
  protected type!: MaybeType;

  protected constructor(type: MaybeType) {
    this.type = type;
  }

  static of(type: MaybeType) {
    return new Type(type);
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

    const { type, typeArgs } = typeDefine;
    const [type_, ...keys] = typeArgs;
    return `${type}<${this.toTypeLiteral(type_)}${keys.length > 0 ? `, ${keys.map((key) => `"${key}"`).join("|")}` : ""}>`;
  }

  protected toTypeDeclaration() {
    const { name, export: export_, type: typeDefine } = this.type;
    return [export_ ? "export" : "", "type", name, "=", Type.toTypeLiteral(typeDefine)].join(" ");
  }

  to() {
    return this.toTypeDeclaration();
  }
}
