import { IStorageDumpService } from "@/services/IStorageDumpService";
import { IStorageDumpServiceObject } from "@/models/IStorageDumpServiceObject";
import { inject, injectable } from "tsyringe";
import { IProductService } from "@/services/IProductService";
import { IProductListService } from "@/services/IProductListService";
import { IProductDTOJson, ProductDTO } from "@/models/ProductDTO";
import { IProductListDTOJson, ProductListDTO } from "@/models/ProductListDTO";
import { ProductList } from "@/models/ProductList";
import { Product } from "@/models/Product";

@injectable()
export class StorageDumpService implements IStorageDumpService {
  constructor(
    @inject("IProductService")
    private readonly productService: IProductService,
    @inject("IProductListService")
    private readonly productListService: IProductListService
  ) {}

  async clear(): Promise<void> {
    await this.productListService.clear();
    await this.productService.clear();
  }

  async export(): Promise<IStorageDumpServiceObject> {
    const productArray: IProductDTOJson[] = (
      await this.productService.getAll()
    ).map(item => new ProductDTO(item).serialize());
    const productListArray: IProductListDTOJson[] = (
      await this.productListService.getAll()
    ).map(item => new ProductListDTO(item).serialize());

    return {
      productArray,
      productListArray
    };
  }

  async import(
    obj: IStorageDumpServiceObject,
    append: boolean = true
  ): Promise<void> {
    if (!append) {
      await this.productService.clear();
      await this.productListService.clear();
    }

    for (const item of obj.productListArray) {
      const itemProducts: Product[] = obj.productArray.filter(
        product => product.productListId === item.id
      );

      const list: ProductList = await this.productListService.save(
        new ProductList(item)
      );

      for (const item of itemProducts) {
        item.productListId = list.id;
        await this.productService.save(new Product(item));
      }
    }
  }
}