export async function anythingImagePngUsingPost(req: File) {
  return fetch(`/anything/image-png`, {
    method: "post",
    body: JSON.stringify(req),
  });
}
export async function anythingMultipartFormdataUsingPut(req: {
  filename?: File[];
}) {
  const fd = new FormData();
  fd.append("filename", String(req.filename));
  return fetch(`/anything/multipart-formdata`, {
    method: "put",
    body: fd,
  });
}
export async function anythingMultipartFormdataUsingPost(req: {
  orderId?: number;
  userId?: number;
  documentFile: File;
}) {
  const fd = new FormData();
  fd.append("orderId", String(req.orderId));
  fd.append("userId", String(req.userId));
  fd.append("documentFile", req.documentFile);
  return fetch(`/anything/multipart-formdata`, {
    method: "post",
    body: fd,
  });
}
