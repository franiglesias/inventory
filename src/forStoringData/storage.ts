import {Product} from "../domain/product";

export class Storage {
    private products: Map<string, Product> = new Map()

    public store(product: Product): void {
        this.products.set(product.name(), product)
    }

    public retrieve(product: string): Product | undefined {
        return this.products.get(product);
    }
}