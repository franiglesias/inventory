import {AddProduct} from '../../src/inventory/driving/forManagingProducts/addProduct/AddProduct'
import {InventoryConfigurator} from '../../src/InventoryConfigurator'
import {Result} from '../../src/inventory/driving/Result'
import {GetCurrentStock} from '../../src/inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {RestockProduct} from '../../src/inventory/driving/forManagingProducts/restockProduct/RestockProduct'
import {ConsumeProduct} from '../../src/inventory/driving/forManagingProducts/consumeProduct/ConsumeProduct'


export class ForManagingProductsTest {
    private configurator: InventoryConfigurator

    constructor(fixtures: Map<string, any>) {
        this.configurator = InventoryConfigurator.forTest(fixtures)
    }

    AddProduct(productName: string | undefined, initialQuantity: number): Result<string> {
        const command = new AddProduct(productName!, initialQuantity)
        const bus = this.configurator.getMessageBus()
        return bus.dispatch(command)
    }

    GetCurrentStock(productId: string): Result<object> {
        const query = new GetCurrentStock(productId)
        const bus = this.configurator.getMessageBus()
        return bus.dispatch(query)
    }

    RestockProduct(existingProductId: string | undefined, number: number | undefined): Result<void> {
        const command = new RestockProduct(existingProductId!, number!)
        const bus = this.configurator.getMessageBus()
        return bus.dispatch(command)
    }

    ConsumeProduct(existingProductId: string | undefined, number: number | undefined): Result<void> {
        const command = new ConsumeProduct(existingProductId!, number!)
        const bus = this.configurator.getMessageBus()
        return bus.dispatch(command)
    }
}