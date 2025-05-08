import {describe, expect, it} from 'vitest'
import {GetCurrentStockHandler} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {Inventory} from '../../src/inventory/Inventory'

import {InMemoryProductStorage} from '../../src/driven/forStoringProducts/InMemoryProductStorage'

function BuildGetCurrentStockHandler(): GetCurrentStockHandler {
    const examples = new Map<string, Object>([
        ['existing-product-id', {
            id: 'existing-product-id',
            name: 'existing-product-name',
            stock: 10
        }],
        ['exhausted-product-id', {
            id: 'exhausted-product-id',
            name: 'exhausted-product-name',
            stock: 0
        }]
    ])
    return new GetCurrentStockHandler(
        new Inventory(
            new InMemoryProductStorage(
                examples
            )
        )
    )
}

describe('For Managing Products Port', () => {
    describe('When we ask the current stock of an existing product', () => {
        it('Should return a product stock object as response with available units', () => {
            const query = new GetCurrentStock('existing-product-id')
            const handler = BuildGetCurrentStockHandler()
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
            const handler = BuildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError(Error)
            expect(result.errorMessage()).toEqual('Product Id non-existing-product-id doesn\'t exist')
        })
    })

    describe('When we ask the current stock of an exhausted product', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('exhausted-product-id')
            const handler = BuildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError(Error)
            expect(result.errorMessage()).toEqual('Product Id exhausted-product-id exhausted')
        })
    })

    describe('When we ask with an invalid product id', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('')
            const handler = BuildGetCurrentStockHandler()
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError(Error)
            expect(result.errorMessage()).toEqual('Invalid Product Id []')
        })
    })
})