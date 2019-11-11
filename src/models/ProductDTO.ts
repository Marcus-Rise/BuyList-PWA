import { IDTO } from "@/core/IDTO";
import { Product } from "@/models/Product";

export class ProductDTO implements IDTO {
  constructor(private readonly model: Product) {}

  serialize(): IProductDTOJson {
    return this.model;
  }
}

export interface IProductDTOJson {
    id: number;
    title: string;
    priority: number;
    price: number;
    productListId: number;
}
