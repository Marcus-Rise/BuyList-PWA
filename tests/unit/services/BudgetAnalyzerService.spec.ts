import "reflect-metadata";
import { Product } from "@/models/Product";
import { BudgetAnalyzerService } from "@/services/implementations/BudgetAnalyzerService";

describe("BudgetAnalyzerService", () => {
    let service: BudgetAnalyzerService;

    beforeAll(() => {
        service = new BudgetAnalyzerService();
    });

    test("getBestChoice", () => {
        const products: Product[] = [
            new Product("first", 0, 250),
            new Product("second", 1, 150),
            new Product("third", 2, 250),
        ];

        expect(service.getBestChoice(products, 500)).toEqual([
            new Product("second", 1, 150),
            new Product("third", 2, 250),
        ]);
    });
});
