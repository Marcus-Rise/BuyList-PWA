import { Product } from "@/models/Product";

export interface IBudgetAnalyzerService {
  getBestChoice(products: Product[], priceLimit: number): Product[];
}
