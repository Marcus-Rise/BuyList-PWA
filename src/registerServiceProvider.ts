import "reflect-metadata";
import { container } from "tsyringe";
import { ProductListService } from "@/services/implementations/ProductListService";

container.register("IProductListService", {
  useClass: ProductListService
});
