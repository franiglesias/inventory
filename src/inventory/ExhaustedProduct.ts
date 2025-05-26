export class ExhaustedProduct implements Error {
    message: string
    name: string

    constructor(productId: string) {
        this.name = 'EXHAUSTED_PRODUCT'
        this.message = `Product Id ${productId} exhausted`
    }
}