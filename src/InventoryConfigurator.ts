import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'
import {Product} from './inventory/Product'
import {ConfigurableIdentityProvider} from './driven/forGettingIdentities/ConfigurableIdentityProvider'
import {RestockProductHandler} from './inventory/driving/forManagingProducts/restockProduct/RestockProductHandler'
import {ConsumeProductHandler} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProductHandler'
import {ProductIdentity} from './inventory/ProductIdentity'


export class InventoryConfigurator {
    private readonly storage: InMemoryProductStorage
    private readonly inventory: Inventory

    constructor(storage: InMemoryProductStorage, inventory: Inventory) {
        this.storage = storage
        this.inventory = inventory
    }

    static forTest(fixtures: Map<string, any>): InventoryConfigurator {
        const inMemoryProductStorage = new InMemoryProductStorage(
            fixtures.get('products') || new Map<string, Product>()
        )
        let identityProvider = new ConfigurableIdentityProvider(
            ...fixtures.get('identities') || []
        )
        let productIdentity = new ProductIdentity(identityProvider)
        const inventory = new Inventory(inMemoryProductStorage, productIdentity)
        return new InventoryConfigurator(
            inMemoryProductStorage,
            inventory
        )
    }

    buildGetCurrentStockHandler(): GetCurrentStockHandler {
        return new GetCurrentStockHandler(
            this.inventory
        )
    }

    buildAddProductHandler() {
        return new AddProductHandler(this.inventory)
    }

    buildRestockProductHandler() {
        return new RestockProductHandler(this.inventory)
    }

    buildConsumeProductHandler() {
        return new ConsumeProductHandler(this.inventory)
    }
}