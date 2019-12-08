import { ICrudService } from "@/services/ICrudService";
import { Product } from "@/models/Product";

export interface IProductService extends ICrudService<Product> {
    getByList(id: number): Promise<Product[]>;
}
