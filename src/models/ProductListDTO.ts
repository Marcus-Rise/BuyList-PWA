import { IDTO } from "@/core/IDTO";
import { ProductList } from "@/models/ProductList";

export class ProductListDTO implements IDTO {
  constructor(private readonly model: ProductList) {}

  serialize(): IProductListDTOJson {
    return this.model;
  }
}

export interface IProductListDTOJson {
  readonly title: string;
  readonly id: number;
}
