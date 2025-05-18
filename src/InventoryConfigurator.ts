import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'
import {IdentityProvider} from './driven/forGettingIdentities/IdentityProvider'
import {Product} from './inventory/Product'

export class InventoryConfigurator {
    private readonly storage: InMemoryProductStorage
    private readonly inventory: Inventory

    constructor(storage: InMemoryProductStorage, inventory: Inventory) {
        this.storage = storage
        this.inventory = inventory
    }

    static forTest(): InventoryConfigurator {
        const examples = new Map<string, Product>([
            ['existing-product-id', Product.rebuild(
                'existing-product-id',
                'existing-product-name',
                10
            )],
            ['exhausted-product-id', Product.rebuild(
                'exhausted-product-id',
                'exhausted-product-name',
                0
            )]
        ])
        const inMemoryProductStorage = new InMemoryProductStorage(
            examples
        )
        let identityProvider = new IdentityProvider()
        const inventory = new Inventory(
            inMemoryProductStorage,
            identityProvider
        )
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
}