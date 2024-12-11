import type { MaybeTagItem } from "@/types/tag";
import type { NormalTypeItem, NormalTypeItems } from "@/types/type";

export interface ApiObject {
  comments: MaybeTagItem[];
  url: string;
  method: string;
  parametersInUrl: (Omit<NormalTypeItem, "required"> & { required: true })[];
  parameters: NormalTypeItems;
  response: NormalTypeItem["type"];
}
