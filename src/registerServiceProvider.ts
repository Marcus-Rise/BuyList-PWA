import "reflect-metadata";
import { container } from "tsyringe";
import { ProductListService } from "@/services/implementations/ProductListService";
import { ProductService } from "@/services/implementations/ProductService";
import { BudgetAnalyzerService } from "@/services/implementations/BudgetAnalyzerService";
import { StorageService } from "@/services/implementations/StorageService";
import { StorageDumpService } from "@/services/implementations/StorageDumpService";
import { AppService } from "@/services/implementations/AppService";

container
    .registerSingleton("IAppService", AppService)
    .registerSingleton("IStorageService", StorageService)
    .register("IProductListService", {
        useClass: ProductListService
    })
    .register("IStorageDumpService", {
        useClass: StorageDumpService
    })
    .register("IProductService", {
        useClass: ProductService
    })
    .register("IBudgetAnalyzerService", {
        useClass: BudgetAnalyzerService
    });
