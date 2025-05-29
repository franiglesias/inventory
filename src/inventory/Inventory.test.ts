import {describe, expect, it} from 'vitest'
import {Inventory} from './Inventory'
import {UnknownProduct} from './UnknownProduct'
import {ForStoringProductsOneProductStub} from '../driven/forStoringProducts/ForStoringProductsOneProductStub'
import {ForGettingIdentitiesDummy} from '../driven/forGettingIdentities/ForGettingIdentitiesDummy'
import {ProductExamples} from './ProductExamples'
import {InMemoryProductStorage} from '../driven/forStoringProducts/InMemoryProductStorage'
import {Product} from './Product'

describe('Inventory', () => {
    it('should return a ProductStock providing and id', () => {
        const aProduct = ProductExamples.existingProduct()
        const inventory = new Inventory(new ForStoringProductsOneProductStub(aProduct), new ForGettingIdentitiesDummy())
        let expected = {
            id: 'existing-product-id',
            name: 'existing-product-name',
            stock: 10
        }
        expect(inventory.stockById('existing-product-id')).toEqual(expected)
    })

    it('should throw Error if no product found', () => {
        const inventory = new Inventory(new ForStoringProductsOneProductStub(), new ForGettingIdentitiesDummy())
        expect(() => {
            inventory.stockById('no-existing-product-id')
        }).toThrowError(UnknownProduct)
    })

    it('should consume product in quantity', () => {
        const aProduct = ProductExamples.existingProduct()
        const productStorage = new InMemoryProductStorage(
            new Map<string,  Product>([['existing-product-id', aProduct]])
        )
        const inventory = new Inventory(productStorage, new ForGettingIdentitiesDummy())

        inventory.consumeProduct('existing-product-id', 10)
        const updatedProduct = productStorage.getById('existing-product-id')
        expect(updatedProduct?.isExhausted()).toBe(true)
    })
})