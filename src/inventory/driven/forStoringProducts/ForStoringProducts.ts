import {Product} from '../../Product'

export interface ForStoringProducts {
    getById(productId: string): Product | undefined

    store(productId: string, product: Product): void
}