export class ProductList {
    constructor(public title: string = "", public id: number = 0) {}

    toString(): string {
        return this.title;
    }
}
