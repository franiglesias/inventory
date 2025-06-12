import {GetCurrentStockHandler} from './inventory/driving/forManagingProducts/getCurrentStock/GetCurrentStockHandler'
import {InMemoryProductStorage} from './driven/forStoringProducts/InMemoryProductStorage'
import {Inventory} from './inventory/Inventory'
import {AddProductHandler} from './inventory/driving/forManagingProducts/addProduct/AddProductHandler'
import {Product} from './inventory/Product'
import {ConfigurableIdentityProvider} from './driven/forGettingIdentities/ConfigurableIdentityProvider'
import {RestockProductHandler} from './inventory/driving/forManagingProducts/restockProduct/RestockProductHandler'
import {ConsumeProductHandler} from './inventory/driving/forManagingProducts/consumeProduct/ConsumeProductHandler'
import {ProductIdentity} from './inventory/ProductIdentity'
import * as process from 'process'
import {SequentialIdProvider} from './driven/forGettingIdentities/SequentialIdProvider'


export class InventoryConfigurator {
    private readonly storage: InMemoryProductStorage
    private readonly inventory: Inventory

    constructor(storage: InMemoryProductStorage, inventory: Inventory) {
        this.storage = storage
        this.inventory = inventory
    }

    private static getEnvironment(): string {
        if (!process.env) {
            throw new Error('Variables de entorno no disponibles');
        }

        const env = process.env.APP_ENV || process.env.REACT_APP_ENV;

        if (!env) {
            console.warn('Variable de entorno no definida, usando "test" por defecto');
            return 'test';
        }

        const validEnvs = ['test', 'local', 'production'];
        if (!validEnvs.includes(env)) {
            console.warn(`Ambiente "${env}" no reconocido, usando "test" por defecto`);
            return 'test';
        }

        return env;
    }

    static run(fixtures?: Map<string, any>): InventoryConfigurator {
        const environment: string = this.getEnvironment()
        switch (environment) {
            case 'local':
                return this.forLocal()
            case 'test':
            default:
                return this.forTest(fixtures || new Map())
        }
    }

    static forTest(fixtures: Map<string, any>): InventoryConfigurator {
        const inMemoryProductStorage = new InMemoryProductStorage(
            fixtures.get('products') || new Map<string, Product>()
        )
        const identityProvider = new ConfigurableIdentityProvider(
            ...fixtures.get('identities') || []
        )
        const productIdentity = new ProductIdentity(identityProvider)
        const inventory = new Inventory(inMemoryProductStorage, productIdentity)
        return new InventoryConfigurator(
            inMemoryProductStorage,
            inventory
        )
    }

    static forLocal(): InventoryConfigurator {
        const inMemoryProductStorage = new InMemoryProductStorage(
            new Map<string, Product>()
        )
        const identityProvider = new SequentialIdProvider()
        const productIdentity = new ProductIdentity(identityProvider)
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