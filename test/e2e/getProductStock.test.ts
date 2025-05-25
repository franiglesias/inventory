import {beforeEach, describe, expect, it} from 'vitest'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {InvalidProductId} from '../../src/inventory/InvalidProductId'
import {ExhaustedProduct} from '../../src/inventory/ExhaustedProduct'
import {UnknownProduct} from '../../src/inventory/UnknownProduct'
import {Product} from '../../src/inventory/Product'
import {ProductExamples} from '../../src/inventory/ProductExamples'


describe('For Managing Products Port', () => {
    let configurator: InventoryConfigurator

    beforeEach(async () => {
        const fixtures = new Map<string, any>([
            ['products', new Map<string, Product>([
                ['existing-product-id', ProductExamples.existingProduct()],
                ['exhausted-product-id', ProductExamples.exhaustedProduct()],
            ])],
        ])
        configurator = InventoryConfigurator.forTest(fixtures)
    })
    describe('When we ask the current stock of an existing product', () => {
        it('Should return a product stock object as response with available units', () => {
            const query = new GetCurrentStock('existing-product-id')
            const handler = configurator.buildGetCurrentStockHandler()
            const result = handler.handle(query)
            const stock = result.unwrap()
            expect(stock).toEqual({
                id: 'existing-product-id',
                name: 'existing-product-name',
                stock: 10
            })
        })
    })

    describe('When we ask the current stock of a non existing product', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('non-existing-product-id')
            const handler = configurator.buildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {
                result.unwrap()
            }).toThrowError(Error)
            expect(result.error()).toBeInstanceOf(UnknownProduct)
        })
    })

    describe('When we ask the current stock of an exhausted product', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('exhausted-product-id')
            const handler = configurator.buildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {
                result.unwrap()
            }).toThrowError(Error)
            expect(result.error()).toBeInstanceOf(ExhaustedProduct)
        })
    })

    describe('When we ask with an invalid product id', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('')
            const handler = configurator.buildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {
                result.unwrap()
            }).toThrowError(Error)
            expect(result.error()).toBeInstanceOf(InvalidProductId)
        })
    })
})