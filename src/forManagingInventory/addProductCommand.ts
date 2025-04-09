export class AddProductCommand {
    public product: string;
    public quantity: number;

    constructor(product: string, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }
}