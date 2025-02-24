import axios from "axios";

export enum PetStatus {
  "available" = "available",
  "pending" = "pending",
  "sold" = "sold",
}
export type Pet = {
  id: number;
  name: string;
  status: PetStatus;
};
/**
 * Utilizes all available parameter types.
 */
export async function anythingAllParamTypesIdId2UsingPost(
  {
    id,
    id2,
    queryParam,
    queryParam2,
    xHeaderValue,
    xHeaderData,
  }: {
    id: number;
    id2: number;
    queryParam?: string;
    queryParam2?: string;
    xHeaderValue?: string;
    xHeaderData?: string;
  },
  req: {
    id: number;
    name: string;
    status: PetStatus;
  },
) {
  return axios(
    `/v1/anything/all-param-types/${id}/${id2}?queryParam=${queryParam}&queryParam2=${queryParam2}`,
    {
      method: "POST",
      headers: {
        "x-header-value": encodeURIComponent(String(xHeaderValue)),
        "x-header-data": encodeURIComponent(String(xHeaderData)),
      },
      data: req,
    },
  );
}
