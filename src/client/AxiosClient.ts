import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";

export default class AxiosClient extends Generator implements Client {
  code = "";
  clientName = "axios";
  clientInfos: ClientInfo[] = [];

  templates(apis: ClientInfo[]): string {
    return "";
  }
}
