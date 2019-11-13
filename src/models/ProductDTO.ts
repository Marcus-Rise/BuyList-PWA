import { IDTO } from "@/core/IDTO";
import { Product } from "@/models/Product";

export class ProductDTO implements IDTO {
  constructor(private readonly model: Product) {}

  serialize(): IProductDTOJson {
    return this.model;
  }
}

export interface IProductDTOJson {
  readonly id: number;
  readonly title: string;
  readonly priority: number;
  readonly price: number;
  readonly productListId: number;
}
