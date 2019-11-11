/* eslint-disable */

import {IProductListDTOJson} from "@/models/ProductListDTO";

export class ProductList {
    public title: string;
    public id: number;

    constructor(dto?: IProductListDTOJson);
    constructor(title?: string, id?: number);
    constructor(titleOrDTO: string | IProductListDTOJson = "", id: number = 0) {
        if (typeof titleOrDTO !== "string") {
            this.title = titleOrDTO.title;
            this.id = titleOrDTO.id;
        } else {
            this.title = titleOrDTO;
            this.id = id;
        }
    }

    toString(): string {
        return `id: ${this.id}; title: ${this.title}`
    }
}
