/**
 * 1.0.0
 * Common parameters
 * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#path-item-object
 */

export async function anythingIdUsingGet({
  id,
  xExtraId,
}: {
  id: unknown;
  xExtraId: string;
}) {
  return fetch(`/anything/${id}`, {
    method: "GET",

    headers: { "x-extra-id": xExtraId },
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingIdUsingPost({
  limit,
  id,
  xExtraId,
}: {
  limit?: number;
  id: unknown;
  xExtraId: string;
}) {
  return fetch(`/anything/${id}?limit=$${encodeURIComponent(String(limit))}`, {
    method: "POST",

    headers: { "x-extra-id": xExtraId },
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingIdActionUsingGet({
  id,
  action,
}: {
  id: unknown;
  action: "lists" | "statistics";
}) {
  return fetch(`/anything/${id}/${action}`, {
    method: "GET",
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingIdActionIdUsingGet({
  id,
  action,
}: {
  id: unknown;
  action: "lists" | "statistics";
}) {
  return fetch(`/anything/${id}/${action}/${id}`, {
    method: "GET",
  }).then((res) => res.json() as Promise<unknown>);
}

export async function anythingIdOverrideUsingGet({ id }: { id: string }) {
  return fetch(`/anything/${id}/override`, {
    method: "GET",
  }).then((res) => res.json() as Promise<unknown>);
}
