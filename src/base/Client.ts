import Base from "./Base";

export interface ClientInfo {
  name: string;
  params: string;
  headers: string;
  method: string;
  url: string;
  data: unknown;
}

export default class Client implements Base {
  from() {
    return this;
  }

  to(): string {
    return "";
  }
}
