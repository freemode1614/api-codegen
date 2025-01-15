export type dataSetList = {
  total: number;
  apis: {
    apiKey: string;
    apiVersionNumber: string;
    apiUrl: string;
    apiDocumentationUrl: string;
  }[];
};
export async function listDataSetsUsingGet_() {
  return fetch(`/`, {
    method: "get",
  }).then(async (response) => (await response.json()) as dataSetList);
}
export async function listSearchableFieldsUsingGet_({
  dataset,
  version,
}: {
  dataset: string;
  version: string;
}) {
  return fetch(`/${dataset}/${version}/fields`, {
    method: "get",
  }).then(async (response) => (await response.json()) as string);
}
export async function performSearchUsingPost(
  {
    version,
    dataset,
  }: {
    version: string;
    dataset: string;
  },
  req: {
    criteria: string;
    start: number;
    rows: number;
  },
) {
  const fd = new FormData();
  fd.append("criteria", req.criteria);
  fd.append("start", String(req.start));
  fd.append("rows", String(req.rows));
  return fetch(`/${dataset}/${version}/records`, {
    method: "post",
    body: fd,
  }).then(
    async (response) => (await response.json()) as Record<string, unknown>[],
  );
}
