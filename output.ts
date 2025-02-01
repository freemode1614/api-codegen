export enum Status {
  "available" = "available",
  "pending" = "pending",
  "sold" = "sold",
}
export type Pet = {
  id: number;
  name: string;
  status: keyof typeof Status;
};
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
    status: keyof typeof Status;
  },
) {
  return fetch(
    `/anything/all-param-types/${id}/${id2}?queryParam=${queryParam}&queryParam2=${queryParam2}`,
    {
      method: "POST",
      headers: {
        "x-header-value": encodeURIComponent(String(xHeaderValue)),
        "x-header-data": encodeURIComponent(String(xHeaderData)),
      },
      body: JSON.stringify(req),
    },
  );
}
