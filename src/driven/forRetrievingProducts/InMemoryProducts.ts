import {ForRetrievingProducts} from '../../inventory/forRetrievingProducts/ForRetrievingProducts'

export class InMemoryProducts implements ForRetrievingProducts {
    private products: Map<string, object> = new Map()

    constructor() {
        this.products = new Map()
        this.products.set('no-stock-product-id', {
            id: 'no-stock-product-id',
            name: 'No Stock Product',
            stock: 0,
        })
    }

    getProductById(productId: string) {
        return this.products.get(productId)
    }
}