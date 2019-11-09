import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";

export class ProductListService implements IProductListService {
    private readonly items: ProductList[] = [new ProductList("awdwa", 1), new ProductList("awdawdawdawd", 2)];

    async getAll(): Promise<ProductList[]> {
        return this.items;
    }

    async save(item: ProductList): Promise<void> {
        this.items.push(item);
    }

    async get(id: number): Promise<ProductList> {
        return this.items.filter((item: ProductList) => item.id === id)[0];
    }
}
