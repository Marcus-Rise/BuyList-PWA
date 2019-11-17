import { Product } from "@/models/Product";
import { AbstractDTO } from "@/core/AbstractDTO";

export class ProductDTO extends AbstractDTO {
  constructor(protected readonly model: Product) {
    super(model);

    this.rules = {
      title: () => !!this.model.title || ["Заполните заголовок"],
      priority: () =>
        this.model.priority > 0 || ["Приоритет должен быть больше нуля"],
      price: () => this.model.price > 0 || ["Цена должна быть больше нуля"]
    };
  }

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
