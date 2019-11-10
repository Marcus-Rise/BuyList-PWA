import "reflect-metadata";
import { container } from "tsyringe";
import { ProductListService } from "@/services/implementations/ProductListService";
import { ProductService } from "@/services/implementations/ProductService";
import { BudgetAnalyzerService } from "@/services/implementations/BudgetAnalyzerService";
import { StorageService } from "@/services/implementations/StorageService";

container
  .register("IStorageService", {
    useClass: StorageService
  })
  .register("IProductListService", {
    useClass: ProductListService
  })
  .register("IProductService", {
    useClass: ProductService
  })
  .register("IBudgetAnalyzerService.ts", {
    useClass: BudgetAnalyzerService
  });
