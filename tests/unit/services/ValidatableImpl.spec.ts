import {
  AbstractValidatable,
  ValidationErrorsObject
} from "@/core/AbstractValidatable";

class ValidatableImpl extends AbstractValidatable {
  public errors: ValidationErrorsObject;

  constructor() {
    super();

    this.errors = {
      test: [],
      test2: []
    };
  }
}

describe("AbstractValidatable", () => {
  let model: ValidatableImpl;

  beforeEach(() => {
    model = new ValidatableImpl();
  });

  describe("allErrors", () => {
    test("errors", () => {
      model.errors.test = ["awd"];
      model.errors.test2 = ["awd"];

      expect(model.allErrors).toEqual(["awd", "awd"]);
    });
  });

  describe("clear", () => {
    test("test", () => {
      model.errors.test = ["awd"];
      model.errors.test2 = ["awd"];

      expect(model.isValid).toBeFalsy();

      model.clear();

      expect(model.isValid).toBeTruthy();
    });
  });
});
