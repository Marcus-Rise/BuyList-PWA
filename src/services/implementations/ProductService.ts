import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";

@injectable()
export class ProductService implements IProductService {
  private readonly table: string = "product";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async get(id: number): Promise<Product> {
    return this.storageService.get<Product>(this.table, id.toString());
  }

  async getAll(): Promise<Product[]> {
    return this.storageService.getAll<Product>(this.table);
  }

  async save(item: Product): Promise<Product> {
    const lastId: number = (
      await this.storageService.getAll<Product>(this.table)
    ).reduce((latestId: number, current: Product) => {
      return current.id > latestId ? current.id : latestId;
    }, 0);

    item.id = lastId + 1;

    return this.storageService.set<Product>(
      this.table,
      item.id.toString(),
      item
    );
  }

  async getByList(id: number): Promise<Product[]> {
    const array: Product[] = await this.getAll();

    return array.filter(item => item.productListId === id);
  }
}
