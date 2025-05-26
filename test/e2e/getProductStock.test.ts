import {beforeEach, describe, expect, it} from 'vitest'
import {InvalidProductId} from '../../src/inventory/InvalidProductId'
import {ExhaustedProduct} from '../../src/inventory/ExhaustedProduct'
import {UnknownProduct} from '../../src/inventory/UnknownProduct'
import {Product} from '../../src/inventory/Product'
import {ProductExamples} from '../../src/inventory/ProductExamples'
import {ForManagingProductsTest} from './forManagingProductsTest'


describe('For Managing Products Port', () => {
    let forManagingProducts: ForManagingProductsTest

    beforeEach(async () => {
        const fixtures = new Map<string, any>([
            ['products', new Map<string, Product>([
                ['existing-product-id', ProductExamples.existingProduct()],
                ['exhausted-product-id', ProductExamples.exhaustedProduct()],
            ])],
        ])
        forManagingProducts = new ForManagingProductsTest(fixtures)
    })

    describe('When we ask the current stock of an existing product', () => {
        it('Should return a product stock object as response with available units', () => {
            const result = forManagingProducts.GetCurrentStock('existing-product-id')
            expect(result.unwrap()).toEqual({
                id: 'existing-product-id',
                name: 'existing-product-name',
                stock: 10
            })
        })
    })

    describe('When we ask the current stock of a non-existing product', () => {
        it('Should return an error', () => {
            const result = forManagingProducts.GetCurrentStock('non-existing-product-id')
            expect(result.error()).toBeInstanceOf(UnknownProduct)
        })
    })

    describe('When we ask the current stock of an exhausted product', () => {
        it('Should return an error', () => {
            const result = forManagingProducts.GetCurrentStock('exhausted-product-id')
            expect(result.error()).toBeInstanceOf(ExhaustedProduct)
        })
    })

    describe('When we ask with an invalid product id', () => {
        it('Should return an error', () => {
            const result = forManagingProducts.GetCurrentStock('')
            expect(result.error()).toBeInstanceOf(InvalidProductId)
        })
    })
})