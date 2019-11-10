export abstract class AbstractException {
  protected constructor(
    protected readonly name: string,
    protected readonly message: string
  ) {}

  public toString(): string {
    return `${this.name} ${this.message}`;
  }
}
