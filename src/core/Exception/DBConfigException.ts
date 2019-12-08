import { AbstractException } from "@/core/Exception/AbstractException";

export class DBConfigException extends AbstractException {
    constructor(public readonly message: string = "") {
        super("Invalid DB config exception", message);
    }
}
