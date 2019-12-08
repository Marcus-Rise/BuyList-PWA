import { IDictionary } from "@/core/IDictionary";

abstract class AbstractValidatable {
    get allErrors(): string[] {
        return Object.values(this.errors).flat();
    }

    get isValid(): boolean {
        return this.allErrors.length === 0;
    }

    public abstract errors: ValidationErrorsObject;

    public clear(): void {
        for (const error in this.errors) {
            if (this.errors.hasOwnProperty(error)) {
                this.errors[error] = [];
            }
        }
    }
}

type ValidationErrorsObject = IDictionary<string[]>;

export { AbstractValidatable, ValidationErrorsObject };
