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
import {MessageBus} from './lib/message-bus/MessageBus'
import {AddProduct} from './inventory/driving/forManagingProducts/addProduct/AddProduct'
import {RestockProduct} from './inventory/driving/forManagingProducts/restockProduct/RestockProduct'
import {ConsumeProduct} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProduct'
import {GetCurrentStock} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'

export class InventoryConfigurator {
    private readonly dic: Dicky

    constructor(dic: Dicky) {
        this.dic = dic
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
        dic.registerSingleton('identity', (_dic: Dicky) => {
            return new ConfigurableIdentityProvider(
                ...fixtures.get('identities') || []
            )
        })
        dic.registerSingleton('productIdentity', (dic: Dicky) => {
            return new ProductIdentity(dic.resolve('identity'))
        })
        dic.registerSingleton(Inventory.name, (dic: Dicky) => {
            return new Inventory(dic.resolve('storage'), dic.resolve('productIdentity'))
        })
        dic.registerSingleton(AddProductHandler.name, (dic: Dicky) => {
            return new AddProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(RestockProductHandler.name, (dic: Dicky) => {
            return new RestockProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(ConsumeProductHandler.name, (dic: Dicky) => {
            return new ConsumeProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(GetCurrentStockHandler.name, (dic: Dicky) => {
            return new GetCurrentStockHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(MessageBus.name, (dic: Dicky) => {
            const bus = new MessageBus()
            bus.registerHandler(AddProduct, dic.resolve(AddProductHandler.name))
            bus.registerHandler(RestockProduct, dic.resolve(RestockProductHandler.name))
            bus.registerHandler(ConsumeProduct, dic.resolve(ConsumeProductHandler.name))
            bus.registerHandler(GetCurrentStock, dic.resolve(GetCurrentStockHandler.name))
            return bus
        })
        return new InventoryConfigurator(dic)
    }

    static forLocal(): InventoryConfigurator {
        const dic = new Dicky()
        dic.registerSingleton('storage', () => {
            return new InMemoryProductStorage(
                new Map<string, Product>()
            )
        })
        dic.registerSingleton('identity', (_dic: Dicky) => {
            return new SequentialIdProvider()
        })
        dic.registerSingleton('productIdentity', (dic: Dicky) => {
            return new ProductIdentity(dic.resolve('identity'))
        })
        dic.registerSingleton(Inventory.name, (dic: Dicky) => {
            return new Inventory(dic.resolve('storage'), dic.resolve('productIdentity'))
        })
        dic.registerSingleton(AddProductHandler.name, (dic: Dicky) => {
            return new AddProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(RestockProductHandler.name, (dic: Dicky) => {
            return new RestockProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(ConsumeProductHandler.name, (dic: Dicky) => {
            return new ConsumeProductHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(GetCurrentStockHandler.name, (dic: Dicky) => {
            return new GetCurrentStockHandler(dic.resolve(Inventory.name))
        })
        dic.registerSingleton(MessageBus.name, (dic: Dicky) => {
            const bus = new MessageBus()
            bus.registerHandler(AddProduct, dic.resolve(AddProductHandler.name))
            bus.registerHandler(RestockProduct, dic.resolve(RestockProductHandler.name))
            bus.registerHandler(ConsumeProduct, dic.resolve(ConsumeProductHandler.name))
            bus.registerHandler(GetCurrentStock, dic.resolve(GetCurrentStockHandler.name))
            return bus
        })
        return new InventoryConfigurator(dic)
    }

    getMessageBus(): MessageBus {
        return this.dic.resolve(MessageBus.name)
    }
}