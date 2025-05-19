import {beforeAll, describe, expect, it} from 'vitest'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {AddProduct} from '../../src/inventory/driving/forManagingProducts/addProduct/AddProduct'
import {InvalidProductName} from '../../src/inventory/InvalidProductName'
import {InvalidProductQuantity} from '../../src/inventory/InvalidProductQuantity'
import {Result} from '../../src/inventory/driving/Result'

describe('For Managing Products Port', () => {
    let configurator: InventoryConfigurator
    beforeAll(async () => {
        configurator = InventoryConfigurator.forTest()
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

    describe('When we add a product that is not in our database', () => {
        let result: Result<string>
        beforeAll(async () => {
            const command = new AddProduct('ProductName', 100)
            const handler = configurator.buildAddProductHandler()
            result = handler.handle(command)
        })
        it('should confirm the identifier of the added product', () => {
            expect(result.unwrap()).toEqual('new-product-id')
        })

        it('should store in the database so I can get its information', () => {
            const newProductId = result.unwrap()
            expectProductWasStored(newProductId!, 'ProductName', 100)
        })
    })

    describe('When we try to register products without correct data', () => {
        it('should fail if a valid name is not provided', async () => {
            const command = new AddProduct(undefined, 100)
            const handler = configurator.buildAddProductHandler()
            const result = handler.handle(command)
            expect(result.error()).toBeInstanceOf(InvalidProductName)
        })

        it('should fail if a valid quantity is not provided', async () => {
            const command = new AddProduct('The Product', 0)
            const handler = configurator.buildAddProductHandler()
            const result = handler.handle(command)
            expect(result.error()).toBeInstanceOf(InvalidProductQuantity)
        })
    })
})