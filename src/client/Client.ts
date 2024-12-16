import Comment from "@/generators/Comment";
import { MaybeTagItem } from "@/types/tag";

export interface ClientInfo {
  url: string;
  method: string;
  timeout?: number;
  headers?: string;
  params?: string;
  data?: unknown;
}

export abstract class Client {
  protected code = "";
  static #clientName = "axios";

  static toBanner(banner: MaybeTagItem[]) {
    return Comment.of(banner).to();
  }

  static toFunction(client: ClientInfo) {
    const { url, method, timeout } = client;
    const literal = [
      `${this.#clientName}({`,
      `  url: "${url}"`,
      `  method: "${method}"`,
      timeout ? `  timeout: ${String(timeout)}` : ``,
      `});`,
    ].filter(Boolean);
    return literal.join("\n");
  }
}
