import {InvalidProductId} from './InvalidProductId'

export class ProductId {
    private readonly productId: string

    constructor(productId: string) {
        this.productId = productId
    }


    static validatedFrom(productId: string): ProductId {
        if (productId.length === 0) {
            throw new InvalidProductId(productId)
        }
        return new ProductId(productId)
    }
}