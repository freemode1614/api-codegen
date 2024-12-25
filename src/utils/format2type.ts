const formatMapping = {
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
  binary: "Blob",
  boolean: "boolean",
  null: "null",
  file: "File",
  uri: "string",
};

export default function format2type(type: keyof typeof formatMapping) {
  return formatMapping[type];
}
