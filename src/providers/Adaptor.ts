export default abstract class Adaptor {
  abstract parse(): Promise<string>;
}
