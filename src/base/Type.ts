import Base from "./Base";

export interface TypeMember {
  required?: boolean;
  name: string;
  type: string | TypeMember[];
}

export interface MaybeType {
  name: string;
  types: TypeMember[];
  export?: boolean;
}

export default class Type implements Base {
  protected type: MaybeType | undefined;

  from(type: MaybeType): Base {
    this.type = type;
    return this;
  }

  protected toTypeLiteral(types: TypeMember[]) {
    const literal = ["{"];

    types.forEach(({ name, type, required }) => {
      literal.push(`  ${name}${!required ? "?" : ""}: ${typeof type === "string" ? type : this.toTypeLiteral(type)}`);
    });

    literal.push("}");

    return literal.join("\n");
  }

  protected toDeclaration() {
    if (!this.type) return "";
    const { name, export: export_, types } = this.type;
    return [export_ ? "export" : "", "type =", name, this.toTypeLiteral(types)].join(" ");
  }

  to(): string {
    return this.toDeclaration();
  }
}
