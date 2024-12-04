
export interface ClientInfo {
  url: string;
  method: string;
  timeout?: number;
  headers?: string;
  params?: string;
  data?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Client {
  static #clientName = 'axios';

  static toFunction(
    client: ClientInfo
  ) {
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
