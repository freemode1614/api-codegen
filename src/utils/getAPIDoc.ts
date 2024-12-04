import { createScopedLogger } from "@moccona/logger";

const logger = createScopedLogger("");

export default async function getAPIDoc(
  docURL: string
) {

  logger.info(`Get API Document from ${docURL}`);

  return fetch(docURL, {
    method: 'GET',
    referrerPolicy: "no-referrer",
    mode: "cors"
  }).then((resp) => {
    return resp.json()
  }).catch(
    (err: unknown) => {
      logger.error((err as Error).message)
    }
  );
}
