import type { NormalTypeItem, NormalTypeItems } from "@/types/type";

export interface ApiObject {
  url: string;
  parametersInUrl: (Omit<NormalTypeItem, 'required'> & { required: boolean })[];
  parameters: NormalTypeItems;
}

