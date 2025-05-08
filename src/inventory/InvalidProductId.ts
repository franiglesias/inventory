export class InvalidProductId implements Error {
    name: string;
    message: string;

    constructor(productId: string) {
        this.name = productId;
        this.message = `Invalid Product Id [${productId}]`
    }
}