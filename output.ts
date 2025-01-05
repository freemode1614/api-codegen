/**
 * 1.0.0
 * USPTO Data Set API
 * The Data Set API (DSAPI) allows the public users to discover and search USPTO exported data sets. This is a generic API that allows USPTO users to make any CSV based data files searchable through API. With the help of GET call, it returns the list of data fields that are searchable. With the help of POST call, data can be fetched based on the filters on the field names. Please note that POST call is used to search the actual data. The reason for the POST call is that it allows users to specify any complex search criteria without worry about the GET size limitations as well as encoding of the input parameters.
 */

export type DataSetList = {
  total?: number;
  apis?: {
    apiKey?: string;
    apiVersionNumber?: string;
    apiUrl?: unknown;
    apiDocumentationUrl?: unknown;
  }[];
};

listDataSetsUsingGET.displayName = "listDataSetsUsingGET";
export async function listDataSetsUsingGET() {
  return fetch(`/`).then(async (resp) => (await resp.json()) as DataSetList);
}

listSearchableFieldsUsingGET.displayName = "listSearchableFieldsUsingGET";
export async function listSearchableFieldsUsingGET({
  dataset,
  version,
}: {
  dataset: string;
  version: string;
}) {
  return fetch(`/${dataset}/${version}/fields`, { method: "GET" }).then(
    async (resp) => (await resp.json()) as string,
  );
}

performSearchUsingPOST.displayName = "performSearchUsingPOST";
export async function performSearchUsingPOST(
  { version, dataset }: { version: string; dataset: string },
  { criteria, start, rows }: { criteria: string; start: number; rows: number },
) {
  const fd = new FormData();
  fd.append("criteria", String(criteria));
  fd.append("start", String(start));
  fd.append("rows", String(rows));
  return fetch(`/${dataset}/${version}/records`, {
    method: "POST",
    body: fd,
  }).then(async (resp) => (await resp.json()) as Record<string, unknown>[]);
}
