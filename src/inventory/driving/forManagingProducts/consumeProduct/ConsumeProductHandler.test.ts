import {beforeEach, describe, expect, it} from 'vitest'
import {ConsumeProductHandler} from './ConsumeProductHandler'
import {Inventory} from '../../../Inventory'
import {ProductExamples} from '../../../ProductExamples'
import {ForGettingIdentitiesDummy} from '../../../../driven/forGettingIdentities/ForGettingIdentitiesDummy'
import {ConsumeProduct} from './ConsumeProduct'
import {ForStoringProducts} from '../../../driven/forStoringProducts/ForStoringProducts'
import {Product} from '../../../Product'
import {InMemoryProductStorage} from '../../../../driven/forStoringProducts/InMemoryProductStorage'

class ForStoringProductsOneProductFake implements ForStoringProducts {
    private product: Product

    constructor(product: Product) {
        this.product = product
    }

    store(id: string, product: Product): void {
        this.product = product
    }

    getById(productId: string): Product | undefined {
        return this.product
    }

    hasProductWithName(productName: string): boolean {
        return false
    }
}

describe('ConsumeProductHandler', () => {
    let handler: ConsumeProductHandler
    let forStoringProducts: ForStoringProducts

    beforeEach(() => {
        forStoringProducts = new InMemoryProductStorage(new Map<string, Product>([
            ['existing-product-id', ProductExamples.existingProduct()],
        ]))
        let inventory: Inventory
        inventory = new Inventory(forStoringProducts, new ForGettingIdentitiesDummy())
        handler = new ConsumeProductHandler(inventory)
    })

    describe('When we consume all stock of a product', () => {
        it('should success', () => {
            const result = handler.handle(new ConsumeProduct('existing-product-id', 10))
            expect(result.successful()).toBe(true)
        })

        it('should exhaust the product', () => {
            handler.handle(new ConsumeProduct('existing-product-id', 10))
            const consumedProduct = forStoringProducts.getById('existing-product-id')
            expect(consumedProduct?.isExhausted()).toEqual(true)
        })
    })
})