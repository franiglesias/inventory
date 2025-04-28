import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {ForRetrievingProducts} from '../../forRetrievingProducts/ForRetrievingProducts'
import {InMemoryProducts} from '../../../driven/forRetrievingProducts/InMemoryProducts'
import {ProductId} from '../../product/ProductId'

export class GetCurrentStockHandler {
    private productRepository: ForRetrievingProducts

    constructor() {
        this.productRepository = new InMemoryProducts
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        const productId = new ProductId(query.productId)
        const product = this.getProductById(productId)
        if (!product) {
            return GetCurrentStockResponse.withError(`Product Id ${query.productId} doesn't exist`)
        }

        return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
    }

    private getProductById(productId: ProductId) {
        return this.productRepository.getProductById(productId)
    }
}