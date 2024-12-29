/**
 * 1.0.0
 * Extreme parameter cases
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#parameter-object
 */
enum PetStatus {
  available = "available",
  pending = "pending",
  sold = "sold",
}

export type Pet = {
  id?: number;
  name?: string;
  status?: PetStatus;
};

export async function anythingAllParamTypesIdId2UsingPost({
  id,
  id2,
  cookieString,
  cookieInt,
  queryParam,
  queryParam2,
  xHeaderValue,
  xHeaderData,
  pet,
}: {
  id: number;
  id2: number;
  cookieString?: string;
  cookieInt?: number;
  queryParam?: string;
  queryParam2?: string;
  xHeaderValue: string;
  xHeaderData: string;
  pet?: Pet;
}) {
  const fd = new FormData();
  pet && fd.append("pet", String(pet));
  return fetch(
    `/anything/all-param-types/${id}/${id2}?queryParam=$${encodeURIComponent(String(queryParam))}&queryParam2=$${encodeURIComponent(String(queryParam2))}`,
    {
      method: "POST",
      body: fd,
      headers: { "x-header-value": xHeaderValue, "x-header-data": xHeaderData },
    },
  ).then((res) => res.json() as Promise<unknown>);
}
