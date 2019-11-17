import { IDTO } from "@/core/IDTO";
import { ProductList } from "@/models/ProductList";

export class ProductListDTO implements IDTO {
  constructor(private readonly model: ProductList) {}

  serialize(): IProductListDTOJson {
    return {
      id: this.model.id.toString(),
      title: this.model.title
    };
  }
}

export interface IProductListDTOJson {
  readonly title: string;
  readonly id: string;
}
