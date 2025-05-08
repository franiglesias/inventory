export class ProductStock {
    private readonly productId: string
    private readonly productName: string
    private readonly quantity: number

    constructor(productId: string, productName: string, quantity: number) {
        this.productId = productId
        this.productName = productName
        this.quantity = quantity
    }

    isExhausted() {
        return this.quantity === 0
    }

    print() {
        return {
            id: this.productId,
            name: this.productName,
            stock: this.quantity,
        }
    }
}