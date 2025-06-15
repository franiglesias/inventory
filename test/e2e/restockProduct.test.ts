import {beforeEach, describe, expect, it} from 'vitest'
import {ForManagingProductsTest} from './forManagingProductsTest'
import {Product} from '../../src/inventory/Product'
import {ProductExamples} from '../../src/inventory/ProductExamples'
import {InvalidProductQuantity} from '../../src/inventory/InvalidProductQuantity'
import {InvalidProductId} from '../../src/inventory/InvalidProductId'

describe('For managing products', () => {
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

    describe('When restocking a product that we have registered', () => {
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

    describe('When we try to restock products without correct data', () => {
        it('should fail if a valid id is not provided', async () => {
            const result = forManagingProducts.RestockProduct(undefined, 100)
            expect(result.error()).toBeInstanceOf(InvalidProductId)
        })

        it('should fail if a valid quantity is not provided', async () => {
            const result = forManagingProducts.RestockProduct('existing-product-id', undefined)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })

        it('should fail if a negative quantity is provided', async () => {
            const result = forManagingProducts.RestockProduct('existing-product-id', -10)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })

        it('should fail if a zero quantity is provided', async () => {
            const result = forManagingProducts.RestockProduct('existing-product-id', 0)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })
    })
})