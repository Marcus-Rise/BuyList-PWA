import { ProductList } from "@/models/ProductList";
import { IProductListService } from "@/services/IProductListService";
import { IProductListStoreService } from "@/services/IProductListStoreService";
import { inject, injectable } from "tsyringe";
import { IProductService } from "@/services/IProductService";

@injectable()
export class ProductListStoreService implements IProductListStoreService {
    get productListArray(): ProductList[] {
        return this._productListArray;
    }

    private _productListArray: ProductList[] = [];

    constructor(
        @inject("IProductListService")
        private readonly productListService: IProductListService,
        @inject("IProductService")
        private readonly productService: IProductService
    ) {
    }

    async updateAll(): Promise<void> {
        this._productListArray = await this.productListService.getAll();

        for (const item of this._productListArray) {
            this.productService.getByList(item.id).then(products => {
                item.productsCount = products.length;
            });
        }
    }

}
