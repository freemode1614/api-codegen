import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";

export default class FetchClient extends Generator implements Client {
  code = "";
  clientName = "fetch";
  clientInfos: ClientInfo[] = [];
}
