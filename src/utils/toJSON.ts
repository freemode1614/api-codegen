import yaml from "yaml";

export default function toJSON(yamlString: string): unknown {
  return yaml.parse(yamlString) as unknown;
}
