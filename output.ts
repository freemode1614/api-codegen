export type Category = {
  id?: number;
  name?: string;
};
export type Tag = {
  id?: number;
  name?: string;
};
export type TagDeprecated = {
  id?: number;
  name?: string;
};
export type Pet = {
  id?: number;
  category?: Category;
  category_alt?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  tags_alt?: TagDeprecated[];
  status?: Status;
  polymorphism?: {
    oneOf?: StatusWrapper | StatusWrapper;
    allOf?: StatusWrapper & StatusWrapper;
    anyOf?: StatusWrapper | StatusWrapper;
  };
};
export type Status = string;
export type StatusWrapper = {
  status?: Status;
};
/*
 * https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#operationObject
 * @deprecated
 */
export async function anythingUsingPost(
  {
    filter,
    filterLegacy,
    status,
  }: {
    filter?: string;
    filterLegacy?: string;
    status: string[];
  },
  req: Pet,
) {
  return fetch(
    `/anything?filter=${filter}filterLegacy=${filterLegacy}status=${status}`,
    {
      method: "POST",
      body: JSON.stringify(req),
    },
  ).then(async (response) => (await response.json()) as Pet[]);
}
