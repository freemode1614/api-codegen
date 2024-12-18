export interface ClientInfo {
  url: string;
  method: string;
  timeout?: number;
  headers?: string;
  params?: string;
  data?: unknown;
}

export abstract class Client {
  abstract code: string;
  abstract clientName: string;
  abstract clientInfos: ClientInfo[];
}
