import Type, { type MaybeType, type TypeMember } from "./Type";

export type InterfaceMember = TypeMember;
export type MaybeInterface = MaybeType;

export default class Interface extends Type {
  // Override
  protected toDeclaration() {
    if (!this.type) return "";
    const { name, export: export_, types } = this.type;
    return [export_ ? "export" : "", "interface", name, this.toTypeLiteral(types)].join(" ");
  }
}
