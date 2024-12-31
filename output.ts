/**
 * 1.0.0
 * File uploading support
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#considerations-for-file-uploads
 */

anythingImagePngUsingPOST.displayName = "anythingImagePngUsingPOST";
export async function anythingImagePngUsingPOST(file: File) {
  return fetch(`/anything/image-png`, {
    method: "POST",
    body: JSON.stringify(file),
  });
}

anythingMultipartFormdataUsingPUT.displayName =
  "anythingMultipartFormdataUsingPUT";
export async function anythingMultipartFormdataUsingPUT({
  filename,
}: {
  filename: File[];
}) {
  const fd = new FormData();

  for (const file of filename) {
    fd.append("filename[]", file, file.name);
  }

  return fetch(`/anything/multipart-formdata`, {
    method: "PUT",
    body: fd,
  });
}

anythingMultipartFormdataUsingPOST.displayName =
  "anythingMultipartFormdataUsingPOST";
export async function anythingMultipartFormdataUsingPOST({
  orderId,
  userId,
  documentFile,
}: {
  orderId: number;
  userId: number;
  documentFile: File;
}) {
  const fd = new FormData();
  orderId && fd.append("orderId", String(orderId));
  userId && fd.append("userId", String(userId));
  documentFile && fd.append("documentFile", documentFile);
  return fetch(`/anything/multipart-formdata`, {
    method: "POST",
    body: fd,
  });
}
