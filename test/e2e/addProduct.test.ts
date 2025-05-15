import {beforeAll, describe, expect, it} from 'vitest'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {AddProduct} from '../../src/inventory/driving/forManagingProducts/addProduct/AddProduct'

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
        it('should store in the database so I can get its information', () => {
            const command = new AddProduct('ProductName', 100)
            const handler = configurator.buildAddProductHandler()
            const result = handler.handle(command)
            const newProductId = result.unwrap()
            expectProductWasStored(newProductId, 'ProductName', 100)
        })
    })
})