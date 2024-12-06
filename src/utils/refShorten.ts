export default function refShorten(ref: string) {
  return ref.split('/').pop()!
}
