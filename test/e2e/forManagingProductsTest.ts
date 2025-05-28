import { AddProduct } from '../../src/inventory/driving/forManagingProducts/addProduct/AddProduct'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {Result} from '../../src/inventory/driving/Result'
import { GetCurrentStock } from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {RestockProduct} from '../../src/inventory/driving/forManagingProducts/restockProduct/RestockProduct'


export class ForManagingProductsTest {
    private configurator: InventoryConfigurator

    constructor(fixtures: Map<string, any>) {
        this.configurator = InventoryConfigurator.forTest(fixtures)
    }

    AddProduct(productName: string | undefined, initialQuantity: number): Result<string> {
        const command = new AddProduct(productName!, initialQuantity)
        const handler = this.configurator.buildAddProductHandler()
        return handler.handle(command)
    }

    GetCurrentStock(productId: string): Result<object> {
        const query = new GetCurrentStock(productId)
        const handler = this.configurator.buildGetCurrentStockHandler()
        return handler.handle(query)
    }

    RestockProduct(existingProductId: string | undefined, number: number | undefined): Result<void> {
        const command = new RestockProduct(existingProductId!, number!)
        const handler = this.configurator.buildRestockProductHandler()
        return handler.handle(command)
    }
}