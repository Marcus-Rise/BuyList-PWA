/* eslint-disable */

import {IProductListDTOJson} from "@/models/ProductListDTO";
import { AbstractValidatable, ValidationErrorsObject } from "@/core/AbstractValidatable";

export class ProductList extends AbstractValidatable {
    public errors: ValidationErrorsObject;
    public title: string;
    public id: number;
    public productsCount: number;

    constructor(dto?: IProductListDTOJson);
    constructor(title?: string, id?: number);
    constructor(titleOrDTO: string | IProductListDTOJson = "", id: number = 0) {
        super();

        if (typeof titleOrDTO !== "string") {
            this.title = titleOrDTO.title;
            this.id = parseInt(titleOrDTO.id);
        } else {
            this.title = titleOrDTO;
            this.id = id;
        }

        this.productsCount = 0;

        this.errors = {
            title: [],
        };
    }

    toString(): string {
        return `id: ${this.id}; title: ${this.title}`
    }

    toStringFormatted(): string {
        return `Количество элементов в списке: ${this.productsCount}`
    }
}
