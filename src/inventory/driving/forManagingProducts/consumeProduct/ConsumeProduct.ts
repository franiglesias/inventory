export class ConsumeProduct {
    public readonly productId: string;
    public readonly quantity: number;

    constructor(productId: string | undefined, quantity: number | undefined) {
        this.productId = productId as string;
        this.quantity = quantity as number;
    }
}