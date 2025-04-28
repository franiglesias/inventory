import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'

export class GetCurrentStockHandler {
    private products: Map<string, object> = new Map()

    constructor() {
        this.products = new Map()
        this.products.set('no-stock-product-id', {
            id: 'no-stock-product-id',
            name: 'No Stock Product',
            stock: 0,
        })
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        const product = this.products.get(query.productId)
        if (!product) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} doesn't exist`)
        }

        return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
    }
}