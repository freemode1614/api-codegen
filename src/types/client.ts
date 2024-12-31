import type { MaybeTagItem } from "@/types/tag";
import type { ArrayType } from "@/types/type";

export enum ClientTypes {
  Axios,
  Fetch,
}

export interface ClientInfo {
  name: string;
  url: string;
  method: string;
  comments: MaybeTagItem[];
  parameters?: ArrayType["elementType"];
  response?: ArrayType["elementType"];
  body?: ArrayType["elementType"];
  headers?: ArrayType["elementType"];
  timeout?: number;
  metadata: {
    useFormData?: boolean;
  };
}

export abstract class Client {
  abstract code: string;
  abstract clientName: string;
  abstract clientInfos: ClientInfo[];
}
