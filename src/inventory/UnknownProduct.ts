export class UnknownProduct implements Error {
    message: string
    name: string


    constructor(productId: string) {
        this.name = 'UnknownProduct'
        this.message = `Product Id ${productId} doesn't exist`
    }
}