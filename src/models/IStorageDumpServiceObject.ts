import { IProductListDTOJson } from "@/models/ProductListDTO";
import { IProductDTOJson } from "@/models/ProductDTO";

export interface IStorageDumpServiceObject {
    productListArray: IProductListDTOJson[];
    productArray: IProductDTOJson[];
}
