import { Client, ClientInfo } from "@/client/Client";

export default class AxiosClient extends Client {
  code = "";
  clientName = "axios";
  clientInfos: ClientInfo[] = [];

  constructor(clientInfos: ClientInfo[]) {
    super();
    this.clientInfos = clientInfos;
  }
}
