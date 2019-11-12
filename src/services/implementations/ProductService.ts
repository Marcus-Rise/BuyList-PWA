import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { IProductDTOJson, ProductDTO } from "@/models/ProductDTO";
import { NotFoundException } from "@/core/Exception/NotFoundException";

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
    const products = await this.storageService.getAll<IProductDTOJson>(
      this.table
    );

    return products.map(item => new Product(item));
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

  async update(item: Product): Promise<Product> {
    if (!(await this.get(item.id))) {
      throw new NotFoundException(item.toString());
    }

    return new Product(
      await this.storageService.set<IProductDTOJson>(
        this.table,
        item.id.toString(),
        new ProductDTO(item).serialize()
      )
    );
  }

  async getByList(id: number): Promise<Product[]> {
    const array: Product[] = await this.getAll();

    return array.filter(item => item.productListId === id);
  }

  async clear(): Promise<void> {
    return this.storageService.clear(this.table);
  }

  async delete(item: Product): Promise<void> {
    return this.storageService.delete(this.table, item.id.toString());
  }
}
