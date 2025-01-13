export const formatMapping = {
  int32: "number",
  int64: "number",
  float: "number",
  double: "number",
  integer: "number",
  password: "string",
  string: "string",
  date: "string",
  "date-time": "string",
  byte: "string",
  binary: "File",
  boolean: "boolean",
  null: "null",
  file: "File",
  uri: "string",
  uuid: "string",
  json: "string",
};

export default function format2type(type: keyof typeof formatMapping) {
  return formatMapping[type];
}
