import {beforeEach, describe, expect, it} from 'vitest'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {AddProduct} from '../../src/inventory/driving/forManagingProducts/addProduct/AddProduct'
import {InvalidProductName} from '../../src/inventory/InvalidProductName'
import {InvalidProductQuantity} from '../../src/inventory/InvalidProductQuantity'

describe('For Managing Products Port', () => {
    let configurator: InventoryConfigurator
    beforeEach(async () => {
        const fixtures = new Map<string, any>([
            ['identities', ['new-product-id', 'second-product-id']]
        ])
        configurator = InventoryConfigurator.forTest(fixtures)
    })

    function expectProductWasStored(newProductId: string, newProductName: string, newProductQuantity: number) {
        const query = new GetCurrentStock(newProductId)
        const handler = configurator.buildGetCurrentStockHandler()
        const result = handler.handle(query)
        const stock = result.unwrap()
        expect(stock).toEqual({
            id: newProductId,
            name: newProductName,
            stock: newProductQuantity
        })
    }

    function executeAddProduct(productName: string | undefined, initialQuantity: number) {
        const command = new AddProduct(productName!, initialQuantity)
        const handler = configurator.buildAddProductHandler()
        return handler.handle(command)
    }

    describe('When we add a product that is not in our database', () => {
        it('should confirm the identifier of the added product', () => {
            const result = executeAddProduct('ProductName', 100)
            expect(result.unwrap()).toEqual('new-product-id')
        })

        it('should store in the database, so I can get its information', () => {
            const result = executeAddProduct('ProductName', 100)
            expectProductWasStored((result.unwrap())!, 'ProductName', 100)
        })
    })

    describe('When we try to register products without correct data', () => {
        it('should fail if a valid name is not provided', async () => {
            const result = executeAddProduct(undefined, 100)
            expect(result.error()).toBeInstanceOf(InvalidProductName)
        })

        it('should fail if a valid quantity is not provided', async () => {
            const result = executeAddProduct('The Product', 0)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })
    })
})