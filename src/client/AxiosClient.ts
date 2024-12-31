import Generator from "@/generators/Generator";
import Client from "@/providers/Client";
import type { ClientInfo } from "@/types/client";

export default class AxiosClient extends Generator implements Client {
  fnBody(apis: ClientInfo): string {
    throw new Error("Method not implemented.");
  }
  code = "";
  clientName = "axios";
  clientInfos: ClientInfo[] = [];

  templates(apis: ClientInfo[]): string {
    return "";
  }
}
