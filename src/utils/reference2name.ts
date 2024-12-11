export default function reference2name(ref: string) {
  return ref.split("/").pop()!;
}
