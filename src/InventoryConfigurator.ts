import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'

export class InventoryConfigurator {
    private readonly storage: InMemoryProductStorage
    private readonly inventory: Inventory

    constructor(storage: InMemoryProductStorage, inventory: Inventory) {
        this.storage = storage
        this.inventory = inventory
    }

    static forTest(): InventoryConfigurator {
        const examples = new Map<string, Object>([
            ['existing-product-id', {
                id: 'existing-product-id',
                name: 'existing-product-name',
                stock: 10
            }],
            ['exhausted-product-id', {
                id: 'exhausted-product-id',
                name: 'exhausted-product-name',
                stock: 0
            }]
        ])
        const inMemoryProductStorage = new InMemoryProductStorage(
            examples
        )
        const inventory = new Inventory(
            inMemoryProductStorage
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