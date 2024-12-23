export async function getA({ a }: { a: string }) {
  return fetch(`/api/v1/${a}`, {
    mode: "same-origin",
    headers: {
      Authorization: "bearer token",
      ContentType: "application/json",
    },
    body: JSON.stringify({ a: 1 }),
  }).then<{ a: string }>((res) => res.json() as Promise<{ a: string }>);
}
