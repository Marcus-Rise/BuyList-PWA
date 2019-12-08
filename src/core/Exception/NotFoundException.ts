import { AbstractException } from "@/core/Exception/AbstractException";

export class NotFoundException extends AbstractException {
    constructor(public readonly message: string = "") {
        super("Item not found exception", message);
    }
}
