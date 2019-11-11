import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { ProductListDTO } from "@/models/ProductListDTO";

@injectable()
export class ProductListService implements IProductListService {
  private readonly table: string = "product-list";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async getAll(): Promise<ProductList[]> {
    return (await this.storageService.getAll<ProductList>(this.table)).map(
      item => new ProductList(item)
    );
  }

  async save(item: ProductList): Promise<ProductList> {
    const lastId: number = (
      await this.storageService.getAll<ProductList>(this.table)
    ).reduce((latestId: number, current: ProductList) => {
      return current.id > latestId ? current.id : latestId;
    }, 0);

    item.id = lastId + 1;

    return this.storageService.set<ProductList>(
      this.table,
      item.id.toString(),
      new ProductListDTO(item).serialize()
    );
  }

  async get(id: number): Promise<ProductList> {
    return new ProductList(
      await this.storageService.get<ProductList>(this.table, id.toString())
    );
  }
}
