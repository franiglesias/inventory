export class RestockProduct {
    public readonly productId: string;
    public readonly quantity: number;

    constructor(productId: string, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}