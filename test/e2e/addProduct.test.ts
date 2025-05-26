import {beforeEach, describe, expect, it} from 'vitest'
import {InvalidProductName} from '../../src/inventory/InvalidProductName'
import {InvalidProductQuantity} from '../../src/inventory/InvalidProductQuantity'
import {ForManagingProductsTest} from './forManagingProductsTest'
import {ProductWithSameNameAlreadyExists} from '../../src/inventory/ProductWithSameNameAlreadyExists'

describe('For Managing Products Port', () => {
    let forManagingProducts: ForManagingProductsTest

    beforeEach(async () => {
        const fixtures = new Map<string, any>([
            ['identities', ['new-product-id', 'second-product-id']]
        ])
        forManagingProducts = new ForManagingProductsTest(fixtures)
    })

    describe('When we add a product that is not in our database', () => {
        it('should confirm the identifier of the added product', () => {
            const result = forManagingProducts.AddProduct('ProductName', 100)
            expect(result.unwrap()).toEqual('new-product-id')
        })

        it('should store in the database, so I can get its information', () => {
            const result = forManagingProducts.AddProduct('ProductName', 100)
            const currentStock = forManagingProducts.GetCurrentStock((result.unwrap())!)
            expect(currentStock.unwrap()).toEqual({
                id: (result.unwrap())!,
                name: 'ProductName',
                stock: 100
            })
        })
    })

    describe('When we try to register products without correct data', () => {
        it('should fail if a valid name is not provided', async () => {
            const result = forManagingProducts.AddProduct(undefined, 100)
            expect(result.error()).toBeInstanceOf(InvalidProductName)
        })

        it('should fail if a valid quantity is not provided', async () => {
            const result = forManagingProducts.AddProduct('The Product', 0)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })
    })

    describe('When we try to register a product that already exists', () => {
        it('should fail', () => {
            forManagingProducts.AddProduct('ProductName', 100)
            const result = forManagingProducts.AddProduct('ProductName', 200)
            expect(result.error()).toBeInstanceOf(ProductWithSameNameAlreadyExists)
        })

        it('should not change the stock of the existing product', () => {
            forManagingProducts.AddProduct('ProductName', 100)
            forManagingProducts.AddProduct('ProductName', 200)
            const currentStock = forManagingProducts.GetCurrentStock('new-product-id')
            expect(currentStock.unwrap()).toEqual({
                id: 'new-product-id',
                name: 'ProductName',
                stock: 100
            })
        })
    })
})

