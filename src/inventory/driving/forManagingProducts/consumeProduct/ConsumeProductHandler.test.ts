import {beforeEach, describe, expect, it} from 'vitest'
import {ConsumeProductHandler} from './ConsumeProductHandler'
import {Inventory} from '../../../Inventory'
import {ProductExamples} from '../../../ProductExamples'
import {ForGettingIdentitiesDummy} from '../../../../driven/forGettingIdentities/ForGettingIdentitiesDummy'
import {ConsumeProduct} from './ConsumeProduct'
import {ForStoringProducts} from '../../../driven/forStoringProducts/ForStoringProducts'
import {Product} from '../../../Product'
import {InMemoryProductStorage} from '../../../../driven/forStoringProducts/InMemoryProductStorage'
import {InvalidProductId} from '../../../InvalidProductId'
import {InvalidProductQuantity} from '../../../InvalidProductQuantity'
import {ProductIdentity} from '../../../ProductIdentity'

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
        const productIdentity = new ProductIdentity(new ForGettingIdentitiesDummy())
        inventory = new Inventory(forStoringProducts, productIdentity)
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

    describe('When we try to consume products without correct data', () => {
        it('should fail if a valid id is not provided', async () => {
            const result = handler.handle(new ConsumeProduct(undefined, 100))
            expect(result.error()).toBeInstanceOf(InvalidProductId)
        })

        it('should fail if a valid quantity is not provided', async () => {
            const result = handler.handle(new ConsumeProduct('existing-product-id', undefined))
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })

        // it('should fail if a negative quantity is provided', async () => {
        //     const result = forManagingProducts.ConsumeProduct('existing-product-id', -10)
        //     expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        // })

        // it('should fail if a zero quantity is provided', async () => {
        //     const result = forManagingProducts.ConsumeProduct('existing-product-id', 0)
        //     expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        // })
    })
})