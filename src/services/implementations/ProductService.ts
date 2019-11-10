import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";

export class ProductService implements IProductService {
  private readonly items: Product[] = [];

  async get(id: number): Promise<Product> {
    return this.items.filter(item => item.id === id)[0];
  }

  async getAll(): Promise<Product[]> {
    return this.items;
  }

  async save(item: Product): Promise<void> {
    this.items.push(item);
  }
}
