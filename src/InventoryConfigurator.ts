import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'
import {Product} from './inventory/Product'
import {ConfigurableIdentityProvider} from './driven/forGettingIdentities/ConfigurableIdentityProvider'
import {RestockProductHandler} from './inventory/driving/forManagingProducts/restockProduct/RestockProductHandler'
import {ConsumeProductHandler} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProductHandler'
import {ProductIdentity} from './inventory/ProductIdentity'
import {Environment} from './Environment'
import {Dicky} from './Dicky'
import {MessageBus} from './lib/message-bus/MessageBus'
import {AddProduct} from './inventory/driving/forManagingProducts/addProduct/AddProduct'
import {RestockProduct} from './inventory/driving/forManagingProducts/restockProduct/RestockProduct'
import {ConsumeProduct} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProduct'
import {GetCurrentStock} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStock'
import {SequentialIdProvider} from './driven/forGettingIdentities/SequentialIdProvider'

function configuredMessageBus(dic: Dicky): MessageBus {
    const bus = new MessageBus()
    bus.registerHandler(AddProduct, dic.resolve(AddProductHandler.name))
    bus.registerHandler(RestockProduct, dic.resolve(RestockProductHandler.name))
    bus.registerHandler(ConsumeProduct, dic.resolve(ConsumeProductHandler.name))
    bus.registerHandler(GetCurrentStock, dic.resolve(GetCurrentStockHandler.name))
    return bus
}

function storageWithFixtures(dic: Dicky) {
    const fixtures = dic.resolve('productFixtures') as Map<string, any>
    return new InMemoryProductStorage(
        fixtures || new Map<string, Product>()
    )
}

function identityProviderWithFixtures(dic: Dicky) {
    const fixtures = dic.resolve('identityFixtures') as string[]
    if (!fixtures) {
        return new ConfigurableIdentityProvider()
    }
    return new ConfigurableIdentityProvider(
        ...fixtures
    )
}

function configureContainer(env: string, fixtures?: Map<string, any>) {
    const dic = new Dicky()

    if (fixtures) {
        dic.registerSingleton('productFixtures', () => fixtures.get('products'))
        dic.registerSingleton('identityFixtures', () => fixtures.get('identities'))
    }

    if (env === 'test') {
        dic.registerSingleton('ForStoringProducts', storageWithFixtures)
        dic.registerSingleton('ForGettingIdentities', identityProviderWithFixtures)
    } else {
        dic.registerSingleton('ForStoringProducts', (dic: Dicky) => {
            return new InMemoryProductStorage(new Map<string, Product>())
        })
        dic.registerSingleton('ForGettingIdentities', (dic: Dicky) => {
            return new SequentialIdProvider()
        })
    }

    dic.registerSingleton('productIdentity', (dic: Dicky) => {
        return new ProductIdentity(dic.resolve('ForGettingIdentities'))
    })
    dic.registerSingleton(Inventory.name, (dic: Dicky) => {
        return new Inventory(dic.resolve('ForStoringProducts'), dic.resolve('productIdentity'))
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
    dic.registerSingleton(MessageBus.name, configuredMessageBus)
    return dic
}

export class InventoryConfigurator {
    private readonly dic: Dicky

    constructor(dic: Dicky) {
        this.dic = dic
    }

    static run(fixtures?: Map<string, any>): InventoryConfigurator {
        const environment: string = new Environment().current()
        const dic = configureContainer(environment, fixtures)
        return new InventoryConfigurator(dic)
    }

    static forTest(fixtures: Map<string, any>): InventoryConfigurator {
        return this.run(fixtures)
    }

    getMessageBus(): MessageBus {
        return this.dic.resolve(MessageBus.name)
    }
}