export class ProductWithSameNameAlreadyExists implements Error {
    message: string
    name: string

    constructor(productName: string) {
        this.name = 'PRODUCT_WITH_SAME_NAME_ALREADY_EXISTS'
        this.message = `Product name ${productName} is already in use.`
    }
}