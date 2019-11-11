import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { IProductDTOJson, ProductDTO } from "@/models/ProductDTO";

@injectable()
export class ProductService implements IProductService {
  private readonly table: string = "product";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async get(id: number): Promise<Product> {
    return new Product(
      await this.storageService.get<IProductDTOJson>(this.table, id.toString())
    );
  }

  async getAll(): Promise<Product[]> {
    return (await this.storageService.getAll<IProductDTOJson>(this.table)).map(
      item => new Product(item)
    );
  }

  async save(item: Product): Promise<Product> {
    const lastId: number = (
      await this.storageService.getAll<IProductDTOJson>(this.table)
    ).reduce((latestId: number, current: Product) => {
      return current.id > latestId ? current.id : latestId;
    }, 0);

    item.id = lastId + 1;

    return new Product(
      await this.storageService.set<IProductDTOJson>(
        this.table,
        item.id.toString(),
        new ProductDTO(item).serialize()
      )
    );
  }

  async getByList(id: number): Promise<Product[]> {
    const array: Product[] = (await this.getAll()).map(
      item => new Product(item)
    );

    return array.filter(item => item.productListId === id);
  }

  async clear(): Promise<void> {
      return this.storageService.clear(this.table);
  }
}
