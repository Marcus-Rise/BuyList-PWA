import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";

@injectable()
export class ProductListService implements IProductListService {
  private static readonly table: string = "product-list";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async getAll(): Promise<ProductList[]> {
    return this.storageService.getAll<ProductList>(ProductListService.table);
  }

  async save(item: ProductList): Promise<ProductList> {
    const length: number = await this.storageService.length(
      ProductListService.table
    );

    item.id = length + 1;

    return this.storageService.set<ProductList>(
      ProductListService.table,
      item.id.toString(),
      item
    );
  }

  async get(id: number): Promise<ProductList> {
    return this.storageService.get<ProductList>(
      ProductListService.table,
      id.toString()
    );
  }
}
