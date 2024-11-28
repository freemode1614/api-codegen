import yaml from "yaml";

export default function yaml2json(yamlString: string): unknown {
  return yaml.parse(yamlString) as unknown;
}

yaml2json.displayName = "yaml2json";
