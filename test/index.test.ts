import {describe, expect, it} from 'vitest'
import {GetCurrentStock} from '../src/inventory/forManagingProducts/getCurrentStock/GetCurrentStock'
import {GetCurrentStockHandler} from '../src/inventory/forManagingProducts/getCurrentStock/GetCurrentStockHandler'

describe('For Managing Products Port', () => {
    describe('When we ask the current stock of a not existing product', () => {
        it('Should fail with Unknown Product Error', () => {
            const query = new GetCurrentStock('no-existing-product-id')
            const handler = new GetCurrentStockHandler()
            const response = handler.handle(query)
            expect(response.success()).toBeFalsy()
            expect(response.error()).toEqual('Product Id no-existing-product-id doesn\'t exist')
        })
    })

    describe('When we ask the current stock of a exhausted product', () => {
        it('Should fail with Broken Stock Error', () => {
            const query = new GetCurrentStock('no-stock-product-id')
            const handler = new GetCurrentStockHandler()
            const response = handler.handle(query)
            expect(response.success()).toBeFalsy()
            expect(response.error()).toEqual('Product Id no-stock-product-id exhausted')
        })
    })

    describe('When we ask the current stock of a product', () => {
        it('Should success with product stock information', () => {
            const query = new GetCurrentStock('existing-product-id')
            const handler = new GetCurrentStockHandler()
            const response = handler.handle(query)
            expect(response.success()).toBeTruthy()
            expect(response.payload()).toEqual(
                {
                    id: 'existing-product-id',
                    name: 'existing-product-name',
                    stock: 10
                }
            )
        })
    })
})
