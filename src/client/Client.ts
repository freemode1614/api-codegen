import Base from "@/generators/Base";

export interface ClientInfo {
  name: string;
  url: string;
  method: string;
  timeout?: number;
  headers?: string;
  params?: string;
  data?: unknown;
}

export default class Client implements Base {
  #client: ClientInfo | undefined;

  protected constructor(client: ClientInfo) {
    this.#client = client;
  }

  static of(client: ClientInfo) {
    return new Client(client);
  }

  #toString() {
    if (!this.#client) return "";
    const { name, url, method, timeout } = this.#client;
    const literal = [
      `${name}({`,
      `  url: "${url}"`,
      `  method: "${method}"`,
      timeout ? `  timeout: ${String(timeout)}` : ``,
      `});`,
    ].filter(Boolean);
    return literal.join("\n");
  }

  /**
   *
   * name({ url, method, headers, params, data })
   *
   * @returns
   *
   */
  to(): string {
    return this.#toString();
  }
}
