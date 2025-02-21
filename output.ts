export type HTTPValidationError = {
  detail: ValidationError[];
};
export type SummarizeRequestquestModel = {
  summary: string;
};
export type SummarizeResponsequestModel = {
  summary: string;
};
export type ValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};
/**
 * Summarize user giving infos.
 * Chat
 */
export async function chatAiSummarizePostUsingPost(
  req: SummarizeRequestquestModel,
) {
  return fetch(`/v1/ai/summarize`, {
    method: "POST",
    body: JSON.stringify(req),
  }).then(
    async (response) => (await response.json()) as SummarizeResponsequestModel,
  );
}
