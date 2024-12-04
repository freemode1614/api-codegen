import Base from "@/generators/Base";

export interface MaybeType {
  required?: boolean;
  name: string;
  types?: string | MaybeType[];
  typeArgs?: [MaybeType, ...string[]]
  export?: boolean;
}

export default class Type implements Base {
  protected type!: MaybeType;

  protected constructor(type: MaybeType) {
    this.type = type;
  }

  static of(type: MaybeType) {
    return new Type(type);
  }

  public toTypeArguments() {
    //
  }

  public toTypeLiteral(types_?: MaybeType["types"]) {
    const types = types_ ?? this.type.types;
    const typeArgs = this.type.typeArgs;

    if (typeof types === "string") {
      //
    } else if (typeof types !== "undefined") {
      const literal = ["{"];
      types.forEach(({ name, types, required }) => {
        literal.push(`  ${name}${!required ? "?" : ""}: ${typeof types === "string" ? types : this.toTypeLiteral(types)}`);
      });

      literal.push("}");

      return literal.join("\n");
    }

    return ""
  }

  protected toDeclaration() {
    const { name, export: export_, types } = this.type;
    return [export_ ? "export" : "", "type", name, "=", this.toTypeLiteral(types)].join(" ");
  }

  to() {
    return this.toDeclaration();
  }
}
