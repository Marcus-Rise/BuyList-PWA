import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { IProductListDTOJson, ProductListDTO } from "@/models/ProductListDTO";

@injectable()
export class ProductListService implements IProductListService {
  private readonly table: string = "product-list";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async getAll(): Promise<ProductList[]> {
    return (
      await this.storageService.getAll<IProductListDTOJson>(this.table)
    ).map(item => new ProductList(item));
  }

  async save(item: ProductList): Promise<ProductList> {
    const lastId: number = (
      await this.storageService.getAll<IProductListDTOJson>(this.table)
    ).reduce((latestId: number, current: ProductList) => {
      return current.id > latestId ? current.id : latestId;
    }, 0);

    item.id = lastId + 1;

    return new ProductList(
      await this.storageService.set<IProductListDTOJson>(
        this.table,
        item.id.toString(),
        new ProductListDTO(item).serialize()
      )
    );
  }

  async get(id: number): Promise<ProductList> {
    return new ProductList(
      await this.storageService.get<IProductListDTOJson>(
        this.table,
        id.toString()
      )
    );
  }

  async clear(): Promise<void> {
    return this.storageService.clear(this.table);
  }
}
