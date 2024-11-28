export default abstract class Base {
  abstract from(...args: unknown[]): Base;
  abstract to(...args: unknown[]): string;
}
