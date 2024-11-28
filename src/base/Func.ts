import Base from "./Base";
import { MaybeTagItem } from "./Comment";
import FormData from "./FormData";
import Interface from "./Interface";
import Type, { type TypeMember } from "./Type";

export interface MaybeFunc {
  name: string;
  arguments: string | TypeMember[];
  export?: boolean;
  returnType?: string | TypeMember[];
  comments?: MaybeTagItem[];
}

export default class Func implements Base {
  #type = new Type();
  #interface = new Interface();
  #formdata = new FormData();

  from() {
    return this;
  }

  to(): string {
    return "";
  }
}
