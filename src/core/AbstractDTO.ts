import { NullPointerException } from "@/core/Exception/NullPointerException";
import { AbstractValidatable } from "@/core/AbstractValidatable";
import { IDictionary } from "@/core/IDictionary";

abstract class AbstractDTO {
    protected rules: ValidatorDictionary;

    protected constructor(protected readonly model: AbstractValidatable) {
        this.rules = {};
    }

    public validate(isNeedToClearModel: boolean = true): boolean {
        this.initChildDTO();

        let status: boolean = true;

        if (isNeedToClearModel) {
            this.model.clear();
        }

        for (const key in this.rules) {
            if (this.rules.hasOwnProperty(key)) {
                const result: ValidationRuleResult = this.rules[key]();

                if (!this.model.errors.hasOwnProperty(key)) {
                    throw new NullPointerException(`not ${key} key in model`);
                }

                if (result !== true) {
                    this.model.errors[key] = result;
                    status = false;
                } else {
                    this.model.errors[key] = [];
                }
            }
        }

        return status;
    }

    public serialize(): object {
        this.initChildDTO();

        return {};
    }

    protected initChildDTO(): void {
    }
}

type ValidatorDictionary = IDictionary<ValidatorRule>;

type ValidationRuleResult = true | string[];

type ValidatorRule = () => ValidationRuleResult;

export { AbstractDTO, ValidatorDictionary, ValidationRuleResult };
