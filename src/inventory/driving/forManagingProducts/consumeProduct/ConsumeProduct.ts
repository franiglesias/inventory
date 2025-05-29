export class ConsumeProduct {
    public readonly productId: string;
    public readonly quantity: number;

    constructor(productId: string, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }
}