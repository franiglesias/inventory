import {ForRetrievingProducts} from '../../inventory/forRetrievingProducts/ForRetrievingProducts'
import {ProductId} from '../../inventory/product/ProductId'

export class InMemoryProducts implements ForRetrievingProducts {
    private products: Map<string, object> = new Map()

    constructor() {
        this.products = new Map()
        this.products.set('no-stock-product-id', {
            id: 'no-stock-product-id',
            name: 'No Stock Product',
            stock: 0,
        })
        this.products.set('existing-product-id', {
            id: 'existing-product-id',
            name: 'existing-product-name',
            stock: 10,
        })
    }

    getProductById(productId: ProductId) {
        return this.products.get(productId.toString())
    }
}