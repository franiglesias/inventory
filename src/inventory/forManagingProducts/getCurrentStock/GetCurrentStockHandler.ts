import {GetCurrentStock} from './GetCurrentStock'
import {GetCurrentStockResponse} from './GetCurrentStockResponse'
import {ForRetrievingProducts} from '../../forRetrievingProducts/ForRetrievingProducts'
import {InMemoryProducts} from '../../../driven/forRetrievingProducts/InMemoryProducts'
import {ProductId} from '../../product/ProductId'
import {ProductStock} from '../../ProductStock'

export class GetCurrentStockHandler {
    private productRepository: ForRetrievingProducts

    constructor() {
        this.productRepository = new InMemoryProducts
    }

    handle(query: GetCurrentStock): GetCurrentStockResponse {
        try {
            const product = this.obtainProductStockInfo(query.productId)

            if (product.isExhausted()) {
                return GetCurrentStockResponse.withError(`Product Id ${query.productId} exhausted`)
            }

            return GetCurrentStockResponse.withResult(product.print())
        } catch (e: unknown) {
            return GetCurrentStockResponse.withError((e as Error).message)
        }
    }

    private obtainProductStockInfo(rawProductId: string): ProductStock {
        const productId = ProductId.ensureValid(rawProductId)
        const product = this.getProductById(productId) as ProductStock | undefined
        if (!product) {
            throw new Error(`Product Id ${rawProductId} doesn't exist`)
        }
        return product
    }

    private getProductById(productId: ProductId) {
        const productData = this.productRepository.getProductById(productId)
        if (!productData) {
            throw new Error(`Product Id ${productId} doesn't exist`)
        }
        return new ProductStock(productId, productData.name, productData.stock)
    }
}