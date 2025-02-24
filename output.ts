export type Node = {
  children: Node[];
};
export async function postUsingPost(req: { body?: unknown }) {
  return fetch(`/post`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(async (response) => (await response.json()) as unknown);
}
