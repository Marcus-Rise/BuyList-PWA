import { ProductList } from "@/models/ProductList";
import { ICrudService } from "@/services/ICrudService";

export interface IProductListService extends ICrudService<ProductList> {}
