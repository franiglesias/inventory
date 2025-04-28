import {describe, expect, it} from 'vitest'

class GetCurrentStock {
    public productId: string
    constructor(productId: string) {
        this.productId = productId
    }
}

class GetCurrentStockResponse {
}

class GetCurrentStockHandler {
    handle(query: GetCurrentStock):GetCurrentStockResponse {
        throw UnknownProduct.withId(query.productId);
    }
}

class UnknownProduct implements Error {
    message: string
    name: string

    constructor(name: string, message: string) {
        this.name = name
        this.message = message
    }

    static withId(productId: string) {
        return new UnknownProduct('UnknownProduct', `Product Id ${productId} doesn't exist`)
    }
}

describe('For Managing Products Port', () => {
    describe('When we ask the current stock of a not existing product', () => {
        it('Should fail with Unknown Product Error', () => {
            const query = new GetCurrentStock('no-existing-product-id')
            const handler = new GetCurrentStockHandler()
            expect(() => handler.handle(query)).toThrow(UnknownProduct)
        })
    })
})
