import normalizeName from "@/utils/normalizeName";

export default function pathConvert(path: string) {
  const result = /{([a-z-_\d]{1,})}/gm.exec(path);

  if (!result || result.length === 0) {
    return path;
  }

  return pathConvert(path.replace(result[0], normalizeName(result[1])));
}
