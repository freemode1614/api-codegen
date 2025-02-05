export async function cachedUsingGet({
  IfModifiedSince,
  IfNoneMatch,
}: {
  IfModifiedSince?: string;
  IfNoneMatch?: string;
}) {
  return fetch(`/cache`, {
    method: "GET",
    headers: {
      "If-Modified-Since": encodeURIComponent(String(IfModifiedSince)),
      "If-None-Match": encodeURIComponent(String(IfNoneMatch)),
    },
  });
}
export async function redirectUsingGet() {
  return fetch(`/status/302`, {
    method: "GET",
  });
}
export async function nocontentUsingGet() {
  return fetch(`/status/204`, {
    method: "GET",
  });
}
