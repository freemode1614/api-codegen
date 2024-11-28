/**
 *
 * Abstract Adapter Class
 *
 */
export default abstract class Adapter {
  protected toType(): string {
    return "";
  }

  protected toTypeLitral(): string {
    return "";
  }

  protected toInterface(): string {
    return "";
  }

  protected toEnum(): string {
    return "";
  }

  /**
   *
   */
  protected toFunction(): string {
    return "";
  }

  /**
   *
   */
  protected toExpression(): string {
    return "";
  }

  /**
   *
   */
  protected toStatement(): string {
    return "";
  }

  /**
   *
   */
  protected toComments(): string {
    return "";
  }
}
