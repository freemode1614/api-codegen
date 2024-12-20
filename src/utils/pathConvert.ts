import normalizeName from "@/utils/normalizeName";

// function pathConvert(path: string) {
//   const result = /{([a-z-_\d]{1,})}/gm.exec(path);
//   if (!result || result.length === 0) {
//     return path;
//   }
//   return pathConvert(path.replace(result[0], normalizeName(result[1])));
// }

export default function pathToStringTemplate(path: string) {
  return path.replace(/{([^}]+)}/g, (_, parameterName: string) => `\${${normalizeName(parameterName)}}`);
}
