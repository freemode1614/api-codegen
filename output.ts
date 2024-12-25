/**
 * 1.0.0
 * File uploading support
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#considerations-for-file-uploads
 */

export async function anythingImagePngUsingPost(blob: Blob) {
  return fetch(`/anything/image-png`, {
    method: "POST",
    body: JSON.stringify(blob),
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingMultipartFormdataUsingPut({ filename }: { filename?: Blob[] }) {
  const fd = new FormData();
  filename && fd.append("filename", String(filename));
  return fetch(`/anything/multipart-formdata`, {
    method: "PUT",
    body: fd,
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingMultipartFormdataUsingPost({
  orderId,
  userId,
  documentFile,
}: {
  orderId?: number;
  userId?: number;
  documentFile?: Blob;
}) {
  const fd = new FormData();
  orderId && fd.append("orderId", String(orderId));
  userId && fd.append("userId", String(userId));
  documentFile && fd.append("documentFile", documentFile);
  return fetch(`/anything/multipart-formdata`, {
    method: "POST",
    body: fd,
  }).then((res) => res.json() as Promise<unknown>);
}
