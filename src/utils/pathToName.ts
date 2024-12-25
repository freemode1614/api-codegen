import normalizeName from "./normalizeName";

export const capitalize = (text: string) => {
  text = text.trim();
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const camelCase = (text: string): string => {
  return text
    .split(/[/\-_{}]/g)
    .filter(Boolean)
    .map((text, index) => (index === 0 ? text : capitalize(text)))
    .join("");
};

export const upperCamelCase = (text: string) => {
  return text
    .split(/[/\-_{}]/g)
    .filter(Boolean)
    .map((s) => s.toLowerCase())
    .map(capitalize)
    .join("");
};

export default function pathToName(path: string, method?: string, operationId?: string) {
  const name = camelCase(path);
  const suffix = method ? capitalize(upperCamelCase(`using_${method}`)) : "";
  return (operationId ? normalizeName(operationId) : name) + suffix;
}
