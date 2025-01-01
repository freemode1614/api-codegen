/**
 * 1.0.0
 * Support for parameter serialization
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#style-values
 */

cookiesStandardUsingGET.displayName = "cookiesStandardUsingGET";
export async function cookiesStandardUsingGET() {
  return fetch(`/cookies`);
}

cookiesFormNonExplodedUsingGET.displayName = "cookiesFormNonExplodedUsingGET";
export async function cookiesFormNonExplodedUsingGET() {
  return fetch(`/cookies#formNonExploded`);
}

cookiesFormExplodedUsingGET.displayName = "cookiesFormExplodedUsingGET";
export async function cookiesFormExplodedUsingGET() {
  return fetch(`/cookies#formExploded`);
}

headersStandardUsingGET.displayName = "headersStandardUsingGET";
export async function headersStandardUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/headers`, {
    method: "GET",
    headers: {
      primitive: encodeURIComponent(JSON.stringify(primitive)),
      array: encodeURIComponent(JSON.stringify(array)),
      object: encodeURIComponent(JSON.stringify(object)),
    },
  });
}

headersSimpleNonExplodedUsingGET.displayName =
  "headersSimpleNonExplodedUsingGET";
export async function headersSimpleNonExplodedUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/headers/simple`, {
    method: "GET",
    headers: {
      primitive: encodeURIComponent(JSON.stringify(primitive)),
      array: encodeURIComponent(JSON.stringify(array)),
      object: encodeURIComponent(JSON.stringify(object)),
    },
  });
}

headersSimpleExplodedUsingPOST.displayName = "headersSimpleExplodedUsingPOST";
export async function headersSimpleExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/headers/simple`, {
    method: "POST",
    headers: {
      primitive: encodeURIComponent(JSON.stringify(primitive)),
      array: encodeURIComponent(JSON.stringify(array)),
      object: encodeURIComponent(JSON.stringify(object)),
    },
  });
}

pathsStandardUsingGET.displayName = "pathsStandardUsingGET";
export async function pathsStandardUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/${primitive}/${array}/${object}`, {
    method: "GET",
  });
}

pathsMatrixNonExplodedUsingGET.displayName = "pathsMatrixNonExplodedUsingGET";
export async function pathsMatrixNonExplodedUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/matrix/${primitive}/${array}/${object}`, {
    method: "GET",
  });
}

pathsMatrixExplodedUsingPOST.displayName = "pathsMatrixExplodedUsingPOST";
export async function pathsMatrixExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/matrix/${primitive}/${array}/${object}`, {
    method: "POST",
  });
}

pathsLabelNonExplodedUsingGET.displayName = "pathsLabelNonExplodedUsingGET";
export async function pathsLabelNonExplodedUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/label/${primitive}/${array}/${object}`, {
    method: "GET",
  });
}

pathsLabelExplodedUsingPOST.displayName = "pathsLabelExplodedUsingPOST";
export async function pathsLabelExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/label/${primitive}/${array}/${object}`, {
    method: "POST",
  });
}

pathsSimpleNonExplodedUsingGET.displayName = "pathsSimpleNonExplodedUsingGET";
export async function pathsSimpleNonExplodedUsingGET({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/simple/${primitive}/${array}/${object}`, {
    method: "GET",
  });
}

pathsSimpleExplodedUsingPOST.displayName = "pathsSimpleExplodedUsingPOST";
export async function pathsSimpleExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { name?: string; description?: string };
}) {
  return fetch(`/anything/path/simple/${primitive}/${array}/${object}`, {
    method: "POST",
  });
}

queryStandardUsingGET.displayName = "queryStandardUsingGET";
export async function queryStandardUsingGET({
  primitive,
  array,
  object,
}: {
  primitive?: string;
  array?: string[];
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query?primitive=${encodeURIComponent(String(primitive))}&array=${encodeURIComponent(String(array))}&object=${encodeURIComponent(String(object))}`,
    { method: "GET" },
  );
}

queryFormNonExplodedUsingGET.displayName = "queryFormNonExplodedUsingGET";
export async function queryFormNonExplodedUsingGET({
  primitive,
  array,
  object,
}: {
  primitive?: string;
  array?: string[];
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query/form?primitive=${encodeURIComponent(String(primitive))}&array=${encodeURIComponent(String(array))}&object=${encodeURIComponent(String(object))}`,
    { method: "GET" },
  );
}

queryFormExplodedUsingPOST.displayName = "queryFormExplodedUsingPOST";
export async function queryFormExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive?: string;
  array?: string[];
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query/form?primitive=${encodeURIComponent(String(primitive))}&array=${encodeURIComponent(String(array))}&object=${encodeURIComponent(String(object))}`,
    { method: "POST" },
  );
}

querySpaceDelimitedNonExplodedUsingGET.displayName =
  "querySpaceDelimitedNonExplodedUsingGET";
export async function querySpaceDelimitedNonExplodedUsingGET({
  array,
  object,
}: {
  array?: string[];
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query/spaceDelimited?array=${encodeURIComponent(String(array))}&object=${encodeURIComponent(String(object))}`,
    { method: "GET" },
  );
}

queryPipeDelimitedNonExplodedUsingGET.displayName =
  "queryPipeDelimitedNonExplodedUsingGET";
export async function queryPipeDelimitedNonExplodedUsingGET({
  array,
  object,
}: {
  array?: string[];
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query/pipeDelimited?array=${encodeURIComponent(String(array))}&object=${encodeURIComponent(String(object))}`,
    { method: "GET" },
  );
}

queryDeepObjectNonExplodedUsingGET.displayName =
  "queryDeepObjectNonExplodedUsingGET";
export async function queryDeepObjectNonExplodedUsingGET({
  object,
}: {
  object?: { name?: string; description?: string };
}) {
  return fetch(
    `/anything/query/deepObject?object=${encodeURIComponent(String(object))}`,
    { method: "GET" },
  );
}

formDataStandardUsingPOST.displayName = "formDataStandardUsingPOST";
export async function formDataStandardUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("primitive", String(primitive));
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data`, { method: "POST", body: fd });
}

formDataFormExplodedUsingPUT.displayName = "formDataFormExplodedUsingPUT";
export async function formDataFormExplodedUsingPUT({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("primitive", String(primitive));
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data/form`, { method: "PUT", body: fd });
}

formDataFormNonExplodedUsingPOST.displayName =
  "formDataFormNonExplodedUsingPOST";
export async function formDataFormNonExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("primitive", String(primitive));
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data/form`, { method: "POST", body: fd });
}

formDataSpaceDelimitedNonExplodedUsingGET.displayName =
  "formDataSpaceDelimitedNonExplodedUsingGET";
export async function formDataSpaceDelimitedNonExplodedUsingGET({
  array,
  object,
}: {
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data/spaceDelimited`, {
    method: "GET",
    body: fd,
  });
}

formDataPipeDelimitedNonExplodedUsingPOST.displayName =
  "formDataPipeDelimitedNonExplodedUsingPOST";
export async function formDataPipeDelimitedNonExplodedUsingPOST({
  array,
  object,
}: {
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data/pipeDelimited`, {
    method: "POST",
    body: fd,
  });
}

formDataDeepObjectExplodedUsingPOST.displayName =
  "formDataDeepObjectExplodedUsingPOST";
export async function formDataDeepObjectExplodedUsingPOST({
  primitive,
  array,
  object,
}: {
  primitive: string;
  array: string[];
  object: { foo: string; bar: string };
}) {
  const fd = new FormData();
  fd.append("primitive", String(primitive));
  fd.append("array", String(array));
  fd.append("object", String(object));
  return fetch(`/anything/form-data/deepObject`, { method: "POST", body: fd });
}
