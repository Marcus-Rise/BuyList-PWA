import { ProductList } from "@/models/ProductList";

export interface IProductListStoreService {
    readonly productListArray: ProductList[];

    updateAll(): Promise<void>;
}

