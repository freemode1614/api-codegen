import Base from "./Base";
import { MaybeTagItem } from "./Comment";
import { type TypeMember } from "./Type";

export interface MaybeFunc {
  name: string;
  arguments: string | TypeMember[];
  export?: boolean;
  returnType?: string | TypeMember[];
  comments?: MaybeTagItem[];
}

export default class Func implements Base {
  #fun: MaybeFunc | undefined;

  protected constructor(fun: MaybeFunc) {
    this.#fun = fun;
  }

  static of(fun: MaybeFunc) {
    return new Func(fun);
  }

  #toString() {
    if (!this.#fun) return "";
    const { name, arguments: arguments_, export: export_, returnType, comments } = this.#fun;

    const literals = [(export_ ? "export " : "") + `function ${name}() {`, `}`];
  }

  to(): string {
    return "";
  }
}
