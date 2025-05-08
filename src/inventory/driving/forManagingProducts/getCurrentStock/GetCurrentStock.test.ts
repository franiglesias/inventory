import {describe, expect, it} from 'vitest'
import {GetCurrentStockHandler} from './GetCurrentStockHandler'
import {GetCurrentStock} from './GetCurrentStock'
import {Inventory} from '../../../Inventory'
import {ProductStock} from '../../../ProductStock'
import {ForStoringProducts} from '../../../driven/forStoringProducts/ForStoringProducts'
import {UnknownProduct} from '../../../UnknownProduct'

class InventoryStub extends Inventory {
    constructor() {
        super({} as ForStoringProducts)
    }

    stockById(productId: string): ProductStock {
        return new ProductStock(
            'existing-product-id',
            'existing-product-name',
            10
        )
    }
}

class InventoryUnknownProductStub extends Inventory {
    constructor() {
        super({} as ForStoringProducts)
    }

    stockById(productId: string): ProductStock {
        throw new UnknownProduct(productId)
    }
}

class InventoryExhaustedProductStub extends Inventory {
    constructor() {
        super({} as ForStoringProducts)
    }

    stockById(productId: string): ProductStock {
        return new ProductStock(
            'existing-product-id',
            'existing-product-name',
            0
        )
    }
}

describe('GetCurrentStockHandler', () => {
    describe('When we ask the current stock of an existing product', () => {
        it('Should return a product stock object as response with available units', () => {
            const query = new GetCurrentStock('existing-product-id')
            const handler = new GetCurrentStockHandler(new InventoryStub())
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
            const handler = new GetCurrentStockHandler(new InventoryUnknownProductStub())
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError()
            expect(result.errorMessage()).toEqual('Product Id non-existing-product-id doesn\'t exist')
        })
    })

    describe('When we ask the current stock of an exhausted product', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('exhausted-product-id')
            const handler = new GetCurrentStockHandler(new InventoryExhaustedProductStub())
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError()
            expect(result.errorMessage()).toEqual('Product Id exhausted-product-id exhausted')
        })
    })
})