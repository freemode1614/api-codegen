import crypto from "node:crypto";

/**
 *
 *根据内容生成 MD5 值
 * @param content 需要计算的内容文本
 * @returns 返回 MD5 值
 */
export default function md5(content: string): string {
  return crypto.createHash("md5").update(content, "utf8").digest("hex").toString();
}
