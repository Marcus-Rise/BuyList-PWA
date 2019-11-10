import "reflect-metadata";
import { container } from "tsyringe";
import { ProductListService } from "@/services/implementations/ProductListService";
import { ProductService } from "@/services/implementations/ProductService";
import { BudgetAnalyzerService } from "@/services/implementations/BudgetAnalyzerService";

container
  .register("IProductListService", {
    useClass: ProductListService
  })
  .register("IProductService", {
    useClass: ProductService
  })
  .register("IBudgetAnalyzerService.ts", {
    useClass: BudgetAnalyzerService
  });
