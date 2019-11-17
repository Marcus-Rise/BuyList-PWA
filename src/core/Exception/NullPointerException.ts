import { AbstractException } from "@/core/Exception/AbstractException";

export class NullPointerException extends AbstractException {
  constructor(protected readonly message: string = "") {
    super("Null pointer exception", message);
  }
}
