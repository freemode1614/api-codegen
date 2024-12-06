import Base from "@/generators/Base";
import Comment from "@/generators/Comment";
import Type from "@/generators/Type";
import { MaybeTagItem } from "@/types/tag";
import { MaybeType } from "@/types/type";

export interface MaybeFunc {
  name: string;
  export?: boolean;
  comments?: MaybeTagItem[];
  arguments: MaybeType["type"];
  returnType?: MaybeType["type"];
}

export default class Func implements Base {
  #fun!: MaybeFunc;

  protected constructor(fun: MaybeFunc) {
    this.#fun = fun;
  }

  static of(fun: MaybeFunc) {
    return new Func(fun);
  }

  #toString() {
    const { name, arguments: arguments_, export: export_, comments, returnType } = this.#fun;
    const literals = [
      comments && comments.length > 0 ? Comment.of(comments).to() : "",
      (export_ ? "export " : "") +
      `function ${name}(req: ${Type.toTypeLiteral(
        arguments_,
      )})${returnType ? ":" + Type.toTypeLiteral(returnType) : ""} {`,
      `}`,
    ];
    return literals.join("\n");
  }

  to() {
    return this.#toString();
  }
}
