export class AddProduct {
    public readonly productName: string
    public readonly initialQuantity: number

    constructor(productName: string, initialQuantity: number) {
        this.productName = productName
        this.initialQuantity = initialQuantity
    }
}