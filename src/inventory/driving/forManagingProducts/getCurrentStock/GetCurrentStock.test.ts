import {describe, expect, it} from 'vitest'
import {GetCurrentStockHandler} from './GetCurrentStockHandler'
import {GetCurrentStock} from './GetCurrentStock'
import {Inventory} from '../../../Inventory'
import {Product} from '../../../Product'
import {ForStoringProductsOneProductStub} from '../../../../driven/forStoringProducts/ForStoringProductsOneProductStub'
import {ForGettingIdentitiesDummy} from '../../../../driven/forGettingIdentities/ForGettingIdentitiesDummy'
import {ProductExamples} from '../../../ProductExamples'

describe('GetCurrentStockHandler', () => {
    describe('When we ask the current stock of an existing product', () => {
        it('Should return a product stock object as response with available units', () => {
            const query = new GetCurrentStock('existing-product-id')
            const aProduct = ProductExamples.existingProduct()

            const handler = new GetCurrentStockHandler(new Inventory(new ForStoringProductsOneProductStub(aProduct), new ForGettingIdentitiesDummy()))
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
            const handler = new GetCurrentStockHandler(new Inventory(new ForStoringProductsOneProductStub(), new ForGettingIdentitiesDummy()))
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError()
            expect(result.errorMessage()).toEqual('Product Id non-existing-product-id doesn\'t exist')
        })
    })

    describe('When we ask the current stock of an exhausted product', () => {
        it('Should return an error', () => {
            const query = new GetCurrentStock('exhausted-product-id')
            const aProduct = ProductExamples.exhaustedProduct()
            const handler = new GetCurrentStockHandler(new Inventory(new ForStoringProductsOneProductStub(aProduct), new ForGettingIdentitiesDummy()))
            const result = handler.handle(query)
            expect(() => {result.unwrap()}).toThrowError()
            expect(result.errorMessage()).toEqual('Product Id exhausted-product-id exhausted')
        })
    })
})