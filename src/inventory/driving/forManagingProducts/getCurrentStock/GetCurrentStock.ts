export class GetCurrentStock {
    public readonly productId: string

    constructor(productId: string) {
        this.productId = productId
    }
}