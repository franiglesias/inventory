import {describe, expect, it} from 'vitest'
import {ProductStock} from './ProductStock'
import {Inventory} from './Inventory'
import {UnknownProduct} from './UnknownProduct'
import {ForStoringProductsOneProductStub} from '../driven/forStoringProducts/ForStoringProductsOneProductStub'
import {ForGettingIdentitiesDummy} from '../driven/forGettingIdentities/ForGettingIdentitiesDummy'
import {ProductExamples} from './ProductExamples'

describe('Inventory', () => {
    it('should return a ProductStock providing and id', () => {
        const aProduct = ProductExamples.existingProduct()
        const inventory = new Inventory(new ForStoringProductsOneProductStub(aProduct), new ForGettingIdentitiesDummy())
        let expected = new ProductStock(
            'existing-product-id',
            'existing-product-name',
            10
        )
        expect(inventory.stockById('existing-product-id')).toEqual(expected)
    })

    it('should throw Error if no product found', () => {
        const inventory = new Inventory(new ForStoringProductsOneProductStub(), new ForGettingIdentitiesDummy())
        expect(() => {
            inventory.stockById('no-existing-product-id')
        }).toThrowError(UnknownProduct)
    })
})