export type Token = {
  access_token: number;
  token_type: string;
  expires_in: number;
};
export async function demoFormDataUsingPost(req: {
  client_id: string;
  client_secret: string;
  scope?: number;
}) {
  const fd = new FormData();
  fd.append("client_id", req.client_id);
  fd.append("client_secret", req.client_secret);
  req.scope && fd.append("scope", String(req.scope));
  return fetch(`/anything`, {
    method: "POST",
    body: fd,
  });
}
