import { AbstractException } from "@/core/Exception/AbstractException";

export class DBConfigException extends AbstractException {
  constructor(protected readonly message: string = "") {
    super("Invalid DB config exception", message);
  }
}
