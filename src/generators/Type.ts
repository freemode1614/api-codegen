import Base from "@/generators/Base";

/**
 *    |1 | |   2  |  |     3       |
 * -> Omit<SomeType, "Key1" | "Key2">
 */
export interface GenericityTypeItem {
  /* 1 */
  type: string;
  typeArgs: [
    /* 2 */
    string | GenericityTypeItem,
    /* 3 */
    ...string[],
  ];
}

/**
 *            string       GenericityTypeItem                        NormalTypeItems
 *            |            |                                         |
 *           \|/          \|/                                       \|/
 * -> { name: string; age: Omit<SomeType, "Key1" | "Key2">; address: { code: string; location: string } }
 */
export type NormalTypeItem = {
  name?: string;
  required?: boolean;
  type: string | GenericityTypeItem | NormalTypeItems;
};

export type NormalTypeItems = NormalTypeItem[];

export interface NormalType extends Omit<NormalTypeItem, "required"> {
  export?: boolean;
}

export type MaybeType = NormalType;

export default class Type implements Base {
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
