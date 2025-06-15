export class DependencyNotDefined implements Error {
    message: string
    name: string

    constructor(name: string) {
        this.message = `Dependency ${name} not found`
        this.name = 'DependencyNotDefined'
    }
}

export class DependencyNameInUse implements Error {
    message: string
    name: string

    constructor(name: string) {
        this.message = `Dependency name ${name} is already in use`
        this.name = 'DependencyNameInUse'
    }
}

type factory<T> = (dic: Dicky) => T


abstract class Dependency<T> {
    protected readonly factory: factory<T>
    protected readonly dic: Dicky

    constructor(factory: factory<T>, dic: Dicky) {
        this.factory = factory
        this.dic = dic
    }

    resolve(): T {
        return this.getInstance()
    }

    protected abstract getInstance(): T
}

class Transient<T> extends Dependency<T> {
    protected getInstance() {
        return this.factory(this.dic)
    }

}

class Singleton<T> extends Dependency<T> {
    private instance: T | undefined

    protected getInstance(): T {
        if (!this.instance) {
            this.instance = this.factory(this.dic)
        }
        return this.instance
    }
}


export class Dicky {
    private dependencies: Map<string, Dependency<unknown>>

    constructor() {
        this.dependencies = new Map<string, Dependency<unknown>>()
    }

    registerTransient<T>(name: string, factory: factory<T>) {
        this.registerDependency(name, new Transient(factory, this))
    }

    registerSingleton<T>(name: string, factory: factory<T>) {
        this.registerDependency(name, new Singleton(factory, this))
    }

    private registerDependency<T>(name: string, dependency: Dependency<T>) {
        if (this.dependencies.has(name)) {
            throw new DependencyNameInUse(name)
        }
        this.dependencies.set(name, dependency)
    }

    resolve<T>(name: string): T {
        const factory: Dependency<T> = this.obtainDependency(name)
        return factory.resolve() as T
    }

    private obtainDependency<T>(name: string): Dependency<T> {
        const dependency = this.dependencies.get(name)
        if (!dependency) {
            throw new DependencyNotDefined(name)
        }
        return dependency as Dependency<T>
    }
}