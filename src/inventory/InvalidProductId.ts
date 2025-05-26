export class InvalidProductId implements Error {
    name: string
    message: string

    constructor(productId: string) {
        this.name = 'INVALID_PRODUCT_ID'
        this.message = `Invalid Product Id [${productId}]`
    }
}