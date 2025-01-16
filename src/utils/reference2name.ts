
export default function reference2name(ref: string) {
  // TODO: 处理多层径引用
  if (ref.includes("~")) {
    return "unknown";
  }

  return ref.split("/").pop()!;
}
