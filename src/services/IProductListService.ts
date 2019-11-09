import { ProductList } from "@/models/ProductList";
import { ICrudService } from "@/services/ICrudService";

export interface IProductListService extends ICrudService<ProductList> {
    getAll(): Promise<ProductList[]>;
    save(item: ProductList): Promise<void>;
    get(id: number): Promise<ProductList>;
}
