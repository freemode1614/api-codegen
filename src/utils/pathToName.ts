import normalizeName from "@/utils/normalizeName";

export const capitalize = (text: string) => {
  text = normalizeName(text).trim();
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const camelCase = (text: string): string => {
  return normalizeName(text)
    .split("_")
    .filter(Boolean)
    .map((text, index) => (index === 0 ? text : capitalize(text)))
    .join("");
};

export const upperCamelCase = (text: string) => {
  return normalizeName(text).replaceAll("...", "").split("_").filter(Boolean).map(capitalize).join("");
};

export default function pathToName(path: string, method?: string, operationId?: string) {
  const name = camelCase(path);
  const suffix = method ? capitalize(upperCamelCase(`using_${method}`)) : "";
  return (operationId ? camelCase(normalizeName(operationId)) : name) + suffix;
}
