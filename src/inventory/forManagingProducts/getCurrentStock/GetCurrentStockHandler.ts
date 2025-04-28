import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'

class InMemoryProducts {
    private products: Map<string, object> = new Map()

    constructor() {
        this.products = new Map()
        this.products.set('no-stock-product-id', {
            id: 'no-stock-product-id',
            name: 'No Stock Product',
            stock: 0,
        })
    }

    public getProductById(productId: string) {
        return this.products.get(productId)
    }
}

export class GetCurrentStockHandler {
    private productRepository: InMemoryProducts

    constructor() {
        this.productRepository = new InMemoryProducts
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        const product = this.getProductById(query.productId)
        if (!product) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} doesn't exist`)
        }

        return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
    }

    private getProductById(productId: string) {
        return this.productRepository.getProductById(productId)
    }
}