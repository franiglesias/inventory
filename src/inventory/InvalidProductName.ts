export class InvalidProductName implements Error {
    name: string
    message: string

    constructor(productName: string) {
        this.name = 'INVALID_PRODUCT_NAME'
        this.message = `[${productName}] is not a valid name`
    }
}