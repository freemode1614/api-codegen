import { Client, ClientInfo } from "@/client/Client";

export default class AxiosClient extends Client {
  code = "";
  clientName = "axios";
  clientInfos: ClientInfo[] = [];
}
