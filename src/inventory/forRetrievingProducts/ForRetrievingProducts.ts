import {ProductId} from '../product/ProductId'

export interface ForRetrievingProducts {
    getProductById(productId: ProductId): Object | undefined
}