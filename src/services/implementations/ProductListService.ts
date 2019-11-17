import { IProductListService } from "@/services/IProductListService";
import { ProductList } from "@/models/ProductList";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";
import { IProductListDTOJson, ProductListDTO } from "@/models/ProductListDTO";
import { NotFoundException } from "@/core/Exception/NotFoundException";
import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";

@injectable()
export class ProductListService implements IProductListService {
  private readonly table: string = "product-list";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService,
    @inject("IProductService")
    private readonly productService: IProductService
  ) {}

  async getAll(): Promise<ProductList[]> {
    return (
      await this.storageService.getAll<IProductListDTOJson>(this.table)
    ).map(item => new ProductList(item));
  }

  async save(item: ProductList): Promise<ProductList> {
    const lastId: number = (
      await this.storageService.getAll<IProductListDTOJson>(this.table)
    )
      .map(productListDTO => new ProductList(productListDTO))
      .reduce((latestId: number, current: ProductList) => {
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

  async update(item: ProductList): Promise<ProductList> {
    if (!(await this.get(item.id))) {
      throw new NotFoundException(item.toString());
    }

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

  async delete(item: ProductList): Promise<void> {
    const products: Product[] = await this.productService.getByList(item.id);

    for (const product of products) {
      await this.productService.delete(product);
    }

    return this.storageService.delete(this.table, item.id.toString());
  }
}
