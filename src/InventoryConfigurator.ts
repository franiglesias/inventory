import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'
import {Product} from './inventory/Product'
import {ConfigurableIdentityProvider} from './driven/forGettingIdentities/ConfigurableIdentityProvider'
import {RestockProductHandler} from './inventory/driving/forManagingProducts/restockProduct/RestockProductHandler'
import {ConsumeProductHandler} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProductHandler'
import {ProductIdentity} from './inventory/ProductIdentity'
import {SequentialIdProvider} from './driven/forGettingIdentities/SequentialIdProvider'
import {Environment} from './Environment'
import {Dicky} from './Dicky'


export class InventoryConfigurator {
    private readonly inventory: Inventory

    constructor(inventory: Inventory) {
        this.inventory = inventory
    }
    static run(fixtures?: Map<string, any>): InventoryConfigurator {
        const environment: string = new Environment().current()
        switch (environment) {
            case 'local':
                return this.forLocal()
            case 'test':
            default:
                return this.forTest(fixtures || new Map())
        }
    }

    static forTest(fixtures: Map<string, any>): InventoryConfigurator {
        const dic = new Dicky()
        dic.registerSingleton('storage', () => {
            return new InMemoryProductStorage(
                fixtures.get('products') || new Map<string, Product>()
            )
        })
        dic.registerSingleton('identity', (dic: Dicky) => {
            return new ConfigurableIdentityProvider(
                ...fixtures.get('identities') || []
            )
        })
        dic.registerSingleton('productIdentity', (dic: Dicky) => {
            return new ProductIdentity(dic.resolve('identity'))
        })
        dic.registerSingleton('inventory', (dic: Dicky) => {
            return new Inventory(dic.resolve('storage'), dic.resolve('productIdentity'))
        })
        return new InventoryConfigurator(
            dic.resolve('inventory') as Inventory,
        )
    }

    static forLocal(): InventoryConfigurator {
        const dic = new Dicky()
        dic.registerSingleton('storage', () => {
            return new InMemoryProductStorage(
                new Map<string, Product>()
            )
        })
        dic.registerSingleton('identity', (dic: Dicky) => {
            return new SequentialIdProvider()
        })
        dic.registerSingleton('productIdentity', (dic: Dicky) => {
            return new ProductIdentity(dic.resolve('identity'))
        })
        dic.registerSingleton('inventory', (dic: Dicky) => {
            return new Inventory(dic.resolve('storage'), dic.resolve('productIdentity'))
        })
        return new InventoryConfigurator(
            dic.resolve('inventory') as Inventory,
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