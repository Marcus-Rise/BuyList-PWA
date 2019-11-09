export class Product {
    constructor(
        public title: string = "",
        public priority: number = 0,
        public price: number = 0,
        public id: number = 0,
        public productListId: number = 0,
    ) {}

    toString(): string {
        return `${this.title} ${this.priority} ${this.price}`;
    }
}
