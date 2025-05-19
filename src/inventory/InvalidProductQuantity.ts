export class InvalidProductQuantity implements Error {
    name: string
    message: string

    constructor(quantity: number) {
        this.name = 'INVALID_PRODUCT_QUANTITY'
        this.message = `Quantity should be greater than 0. [${quantity}] provided.`
    }
}