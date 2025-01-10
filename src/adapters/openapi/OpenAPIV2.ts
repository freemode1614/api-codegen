import { OpenAPI } from "openapi-types";

import Adaptor from "@/providers/Adaptor";
import Client from "@/providers/Client";

export default class OpenApiV2 implements Adaptor {
  doc: OpenAPI.Document;
  client: Client;
  // eslint-disable-next-line @typescript-eslint/require-await
  async parse() {
    return "";
  }
}
