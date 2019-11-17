import { ProductList } from "@/models/ProductList";
import { AbstractDTO } from "@/core/AbstractDTO";

export class ProductListDTO extends AbstractDTO {
  constructor(protected readonly model: ProductList) {
    super(model);

    this.rules = {
      title: () => !!this.model.title || ["Заполните заголовок"]
    };
  }

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
