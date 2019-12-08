import { AbstractException } from "@/core/Exception/AbstractException";

export class NullPointerException extends AbstractException {
    constructor(public readonly message: string = "") {
        super("Null pointer exception", message);
    }
}
