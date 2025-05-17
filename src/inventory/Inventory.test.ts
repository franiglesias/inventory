import {describe, expect, it} from 'vitest'
import {ProductStock} from './ProductStock'
import {Inventory} from './Inventory'
import {ForStoringProducts} from './driven/forStoringProducts/ForStoringProducts'
import {UnknownProduct} from './UnknownProduct'
import {ForGettingIdentities} from './driven/forGettingIdentities/ForGettingIdentities'

class ProductStorageStub implements ForStoringProducts {
    constructor() {
    }

    store(productId: string, product: { id: string; name: string; quantity: number }): void {
        throw new Error('Method not implemented.')
    }

    getById(_: string): Object | undefined {
        return {
            id: 'existing-product-id',
            name: 'existing-product-name',
            stock: 10,
        }
    }
}

class ProductStorageNoProductStub implements ForStoringProducts {
    constructor() {
    }

    store(productId: string, product: { id: string; name: string; quantity: number }): void {
        throw new Error('Method not implemented.')
    }

    getById(_: string): Object | undefined {
        return undefined
    }
}

class IdentityProviderDummy implements ForGettingIdentities {
    generate(): string {
        return ''
    }
}

describe('Inventory', () => {
    it('should return a ProductStock providing and id', () => {
        const inventory = new Inventory(new ProductStorageStub(), new IdentityProviderDummy())
        let expected = new ProductStock(
            'existing-product-id',
            'existing-product-name',
            10
        )
        expect(inventory.stockById('existing-product-id')).toEqual(expected)
    })

    it('should throw Error if no product found', () => {
        const inventory = new Inventory(new ProductStorageNoProductStub(), new IdentityProviderDummy())
        expect(() => {
            inventory.stockById('no-existing-product-id')
        }).toThrowError(UnknownProduct)
    })
})