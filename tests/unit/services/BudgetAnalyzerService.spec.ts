import "reflect-metadata";
import { Product } from "@/models/Product";
import { BudgetAnalyzerService } from "@/services/implementations/BudgetAnalyzerService";

describe("BudgetAnalyzerService", () => {
  let service: BudgetAnalyzerService;

  beforeAll(() => {
    service = new BudgetAnalyzerService();
  });

  describe("getBestChoice", () => {
    test("three products", () => {
      const products: Product[] = [
        new Product("first", 0, 250),
        new Product("second", 1, 150),
        new Product("third", 2, 250)
      ];

      expect(service.getBestChoice(products, 500)).toEqual([
        new Product("second", 1, 150),
        new Product("third", 2, 250)
      ]);
    });

    test("one product in limit", () => {
      const products: Product[] = [new Product("second", 1, 150)];

      expect(service.getBestChoice(products, 500)).toEqual([
        new Product("second", 1, 150)
      ]);
    });

    test("one product out of limit", () => {
      const products: Product[] = [new Product("second", 1, 150)];

      expect(service.getBestChoice(products, 100)).toEqual([]);
    });

    describe("comp building", () => {
      const motherBoard: Product = new Product("motherboard", 5, 15000);
      const cpu: Product = new Product("cpu", 10, 25000);
      const memory: Product = new Product("memory", 3, 10000);
      const gpu: Product = new Product("gpu", 7, 40000);

      const products: Product[] = [motherBoard, cpu, memory, gpu];

      test("30000", () => {
        expect(service.getBestChoice(products, 30000)).toEqual([cpu]);
      });

      test("50000", () => {
        expect(service.getBestChoice(products, 50000)).toEqual([
          motherBoard,
          cpu,
          memory
        ]);
      });

      test("90000", () => {
        expect(service.getBestChoice(products, 90000)).toEqual([
          motherBoard,
          cpu,
          memory,
          gpu
        ]);
      });
    });
  });
});
