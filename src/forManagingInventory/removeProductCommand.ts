export class RemoveProductCommand {
    public productName: string;
    public quantity: number;

    constructor(productName: string, quantity: number) {
        this.productName = productName;
        this.quantity = quantity;
    }

}