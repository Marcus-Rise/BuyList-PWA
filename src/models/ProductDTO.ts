import { IDTO } from "@/core/IDTO";
import { Product } from "@/models/Product";

export class ProductDTO implements IDTO {
  constructor(private readonly model: Product) {}

  serialize(): IProductDTOJson {
    return {
      id: this.model.id.toString(),
      title: this.model.title.toString(),
      priority: this.model.priority.toString(),
      price: this.model.price.toString(),
      productListId: this.model.productListId.toString()
    };
  }
}

export interface IProductDTOJson {
  readonly id: string;
  readonly title: string;
  readonly priority: string;
  readonly price: string;
  readonly productListId: string;
}
