import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {ForRetrievingProducts} from '../../forRetrievingProducts/ForRetrievingProducts'
import {InMemoryProducts} from '../../../driven/forRetrievingProducts/InMemoryProducts'

export class GetCurrentStockHandler {
    private productRepository: ForRetrievingProducts

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