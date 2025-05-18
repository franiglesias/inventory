import {describe, expect, it} from 'vitest'
import {ProductStock} from './ProductStock'
import {Inventory} from './Inventory'
import {UnknownProduct} from './UnknownProduct'
import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'
import {Product} from './Product'
import {ForStoringProductsOneProductStub} from '../driven/forStoringProducts/ForStoringProductsOneProductStub'

class IdentityProviderDummy implements ForGettingIdentities {
    generate(): string {
        return ''
    }
}

describe('Inventory', () => {
    it('should return a ProductStock providing and id', () => {
        const aProduct = Product.rebuild(
            'existing-product-id',
            'existing-product-name',
            10,
        )
        const inventory = new Inventory(new ForStoringProductsOneProductStub(aProduct), new IdentityProviderDummy())
        let expected = new ProductStock(
            'existing-product-id',
            'existing-product-name',
            10
        )
        expect(inventory.stockById('existing-product-id')).toEqual(expected)
    })

    it('should throw Error if no product found', () => {
        const inventory = new Inventory(new ForStoringProductsOneProductStub(), new IdentityProviderDummy())
        expect(() => {
            inventory.stockById('no-existing-product-id')
        }).toThrowError(UnknownProduct)
    })
})