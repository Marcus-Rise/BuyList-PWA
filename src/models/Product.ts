/* eslint-disable */
import { IProductDTOJson } from "@/models/ProductDTO";

export class Product {
  public title: string;
  public priority: number;
  public price: number;
  public id: number;
  public productListId: number;

  constructor(dto?: IProductDTOJson);
  constructor(
    title?: string,
    priority?: number,
    price?: number,
    id?: number,
    productListId?: number
  );
  constructor(
    titleOrDTO: string | IProductDTOJson = "",
    priority: number = 0,
    price: number = 0,
    id: number = 0,
    productListId: number = 0
  ) {
    if (typeof titleOrDTO !== "string") {
      this.title = titleOrDTO.title;
      this.priority = parseInt(titleOrDTO.priority);
      this.price = parseFloat(titleOrDTO.price);
      this.id = parseInt(titleOrDTO.id);
      this.productListId = parseInt(titleOrDTO.productListId);
    } else {
      this.title = titleOrDTO;
      this.priority = priority;
      this.price = price;
      this.id = id;
      this.productListId = productListId;
    }
  }

  toString(): string {
    return `id: ${this.id}; title: ${this.title}; priority: ${this.priority}; price: ${this.price}`;
  }
}
