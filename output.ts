/**
 * 1.0.0
 * Callback Example
 *
 */

export async function streamsUsingPost({ callbackUrl }: { callbackUrl: string }) {
  return fetch(`/streams?callbackUrl=$${encodeURIComponent(String(callbackUrl))}`, {
    method: "POST",
  }).then(
    (res) =>
      res.json() as Promise<{
        subscriptionId: string;
      }>,
  );
}
