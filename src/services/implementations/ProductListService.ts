import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";

@injectable()
export class ProductListService implements IProductListService {
  private readonly table: string = "product-list";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async getAll(): Promise<ProductList[]> {
    return this.storageService.getAll<ProductList>(this.table);
  }

  async save(item: ProductList): Promise<ProductList> {
    const length: number = await this.storageService.length(this.table);

    item.id = length + 1;

    return this.storageService.set<ProductList>(
      this.table,
      item.id.toString(),
      item
    );
  }

  async get(id: number): Promise<ProductList> {
    return this.storageService.get<ProductList>(this.table, id.toString());
  }
}
