import {Product} from "./product";
import {Storage} from "../forStoringData/storage";

export class Inventory {
    private storage: Storage

    constructor(storage: Storage) {
        this.storage = storage;
    }

    public inventoryOf(productName: string): number {
        const p: Product | undefined = this.storage.retrieve(productName)
        if (p == undefined) {
            return 0;
        }
        return p.inventory;
    }

    public update(productName: string, quantity: number) {
        const product: Product | undefined = this.retrieve(productName)
        if (product === undefined) {
            this.store(new Product(productName, quantity));
            return
        }
        this.store(product.addUnits(quantity))
    }

    public remove(productName: string, quantity: number) {
        const product = this.retrieve(productName);
        if (product === undefined) {
            return
        }
        this.store(product.removeUnits(quantity))
    }

    public store(product: Product): void {
        this.storage.store(product)
    }

    public retrieve(product: string): Product | undefined {
        return this.storage.retrieve(product);
    }
}