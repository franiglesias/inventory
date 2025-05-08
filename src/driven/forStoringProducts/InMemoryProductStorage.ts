import {ForStoringProducts} from '../../inventory/driven/forStoringProducts/ForStoringProducts'

export class InMemoryProductStorage implements ForStoringProducts {
    private products: Map<string, Object>
    constructor(examples: Map<string, Object>) {
        this.products = examples
    }

    getById(productId: string): Object | undefined {
        return this.products.get(productId)
    }
}