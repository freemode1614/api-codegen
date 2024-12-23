import type { MaybeTagItem } from "@/types/tag";
import type { ArrayType, TypeReference } from "@/types/type";

export enum ClientTypes {
  Axios,
  Fetch,
}

export interface ClientInfo {
  comments: MaybeTagItem[];
  url: string;
  parameters?: ArrayType["elementType"];
  response?: ArrayType["elementType"];
  method: string;
  timeout?: number;
  headers?: TypeReference;
  data?: unknown;
  name: string;
}

export abstract class Client {
  abstract code: string;
  abstract clientName: string;
  abstract clientInfos: ClientInfo[];
}
