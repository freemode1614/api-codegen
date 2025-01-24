/* eslint-disable @typescript-eslint/no-extraneous-class */
/**
 *
 * 主要功能：
 *
 *  1. 远程数据获取
 *  2. 数据缓存
 *
 */
import { createScopedLogger } from "@moccona/logger";
import { Agent, setGlobalDispatcher } from "undici";

const logger = createScopedLogger("APIDocProvider");

const agent = new Agent({
  connect: {
    rejectUnauthorized: false,
  },
});

setGlobalDispatcher(agent);

export class APIDocProvider {
  static async fetch<T = unknown>(docURL: string) {
    logger.info(`Get API Document from ${docURL}`);
    return fetch(docURL, { method: "GET" }).then(async (resp) => {
      return (await resp.json()) as T;
    });
  }
}
