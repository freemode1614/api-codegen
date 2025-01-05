import type { OpenAPI } from "openapi-types";

import Client from "@/providers/Client";

export default abstract class Adaptor<D = OpenAPI.Document> {
  readonly doc: D;
  readonly client: Client;
  abstract parse(): Promise<string>;
  constructor(doc: D, client: Client) {
    this.doc = doc;
    this.client = client;
  }
}
