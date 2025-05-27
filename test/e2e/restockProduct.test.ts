import {beforeEach, describe, expect, it} from 'vitest'
import {ForManagingProductsTest} from './forManagingProductsTest'
import {Product} from '../../src/inventory/Product'
import {ProductExamples} from '../../src/inventory/ProductExamples'

describe('For managing products', () => {
    describe('When restocking a product that we have registered', () => {
        let forManagingProducts: ForManagingProductsTest
        beforeEach(async () => {
            const fixtures = new Map<string, any>([
                ['products', new Map<string, Product>([
                    ['existing-product-id', ProductExamples.existingProduct()],
                    ['exhausted-product-id', ProductExamples.exhaustedProduct()],
                ])],
                ['identities', ['product-id']]
            ])
            forManagingProducts = new ForManagingProductsTest(fixtures)

        })
        it('Should increase the stock of the product', async () => {
            const result = forManagingProducts.RestockProduct('existing-product-id', 5)
            expect(result.unwrap()).toBeNull()
            const currentStock = forManagingProducts.GetCurrentStock('existing-product-id')
            expect(currentStock.unwrap()).toEqual({
                id: 'existing-product-id',
                name: 'existing-product-name',
                stock: 15 // 10 initial stock + 5 restocked
            })
        })
    })
})