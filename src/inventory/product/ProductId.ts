export class ProductId {
    private readonly productId: string

    constructor(productId: string) {
        this.productId = productId
    }

    toString(): string {
        return this.productId
    }
}