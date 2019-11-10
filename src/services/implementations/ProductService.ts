import { IProductService } from "@/services/IProductService";
import { Product } from "@/models/Product";
import { inject, injectable } from "tsyringe";
import { IStorageService } from "@/services/IStorageService";

@injectable()
export class ProductService implements IProductService {
  private static readonly table: string = "product";

  constructor(
    @inject("IStorageService")
    private readonly storageService: IStorageService
  ) {}

  async get(id: number): Promise<Product> {
    return this.storageService.get<Product>(
      ProductService.table,
      id.toString()
    );
  }

  async getAll(): Promise<Product[]> {
    return this.storageService.getAll<Product>(ProductService.table);
  }

  async save(item: Product): Promise<Product> {
    const length: number = await this.storageService.length(
      ProductService.table
    );

    item.id = length + 1;

    return this.storageService.set<Product>(
      ProductService.table,
      item.id.toString(),
      item
    );
  }
}
