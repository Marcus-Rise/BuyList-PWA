import { IBudgetAnalyzerService } from "@/services/IBudgetAnalyzerService";
import { Product } from "@/models/Product";
import { injectable } from "tsyringe";

@injectable()
export class BudgetAnalyzerService implements IBudgetAnalyzerService {
  private bestChoice: Product[] | null = null;
  private bestPrioritySum = 0;
  private bestPriceSum = 0;

  getBestChoice(products: Product[], priceLimit: number): Product[] {
    this.bestChoice = null;
    this.bestPrioritySum = 0;
    this.bestPriceSum = priceLimit;

    const buf: Product[] = Array.from(products);

    this.makeAllSets(buf);

    return this.bestChoice || [];
  }

  private makeAllSets(products: Product[]): void {
    if (products.length > 0) {
      this.checkSet(products);
    }

    for (const product of products) {
      const newSet = products.filter(item => item !== product);

      this.makeAllSets(newSet);
    }
  }

  private checkSet(products: Product[]): void {
    const listPrice: number = products.reduce<number>(
      (sum: number, product: Product) => {
        sum = sum + product.price;

        return sum;
      },
      0
    );

    const listPriority: number = products.reduce<number>(
      (sum: number, product: Product) => {
        sum = sum + product.priority;

        return sum;
      },
      0
    );

    if (listPrice <= this.bestPriceSum && listPriority > this.bestPrioritySum) {
      this.bestChoice = products;
      this.bestPrioritySum = listPriority;
    }
  }
}
