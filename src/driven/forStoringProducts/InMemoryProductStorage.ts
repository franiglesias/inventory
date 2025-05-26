import {ForStoringProducts} from '../../inventory/driven/forStoringProducts/ForStoringProducts'
import {Product} from '../../inventory/Product'

export class InMemoryProductStorage implements ForStoringProducts {
    private products: Map<string, Product>

    constructor(examples: Map<string, Product>) {
        this.products = examples
    }

    hasProductWithName(productName: string): boolean {
        return Array.from(this.products.values()).some(product => 
            product.isCalled(productName)
        );
    }

    getById(productId: string): Product | undefined {
        return this.products.get(productId)
    }

    store(productId: string, product: Product): void {
        this.products.set(productId, product)
    }
}
