import {describe, expect, it} from 'vitest'
import {DependencyNameInUse, DependencyNotDefined, Dicky} from './Dicky'


class Example {
    private readonly _content: string

    constructor(content: string) {
        this._content = content
    }

    content(): string {
        return this._content
    }
}

interface Collaborator {
    doSomething(): string
}

class CollaboratorExample implements Collaborator {
    doSomething(): string {
        return '1'
    }
}

class ServiceExample {
    private collaborator: Collaborator

    constructor(collaborator: Collaborator) {
        this.collaborator = collaborator
    }

    doMyThing(): string {
        return this.collaborator.doSomething()
    }
}

describe('Dicky', () => {
    describe('When managing Transient Dependencies', () => {
        it('should be able to register and resolve', () => {
                const dicky = new Dicky()
                dicky.registerTransient('example', () => 'content')

                expect(dicky.resolve('example')).toBe('content')
            }
        )

        it('should be able to register different dependencies', () => {
            const dicky = new Dicky()
            dicky.registerTransient('other', () => 'extra content')

            expect(dicky.resolve('other')).toBe('extra content')
        })

        it('should fail if a dependency was not defined', () => {
            const dicky = new Dicky()

            expect(() => {
                dicky.resolve('dependency-not-defined')
            }).toThrow(DependencyNotDefined)
        })

        it('should register and resolve dependencies of any type', () => {
            const dicky = new Dicky()
            dicky.registerTransient('example', () => new Example('content'))

            const resolved: Example = dicky.resolve('example')
            expect(resolved).toBeInstanceOf(Example)
            expect(resolved.content()).toEqual('content')
        })

        it('should resolve to a different instance each time', () => {
            const dicky = new Dicky()
            dicky.registerTransient('example', () => new Example('content'))
            const resolved1: Example = dicky.resolve('example')
            const resolved2: Example = dicky.resolve('example')
            expect(resolved1).not.toBe(resolved2)
        })

        it('should fail when registering a dependency with the same name', () => {
            const dicky = new Dicky()
            dicky.registerTransient('example', () => 'content')

            expect(() => {
                dicky.registerTransient('example', () => 'other content')
            }).toThrow(DependencyNameInUse)
        })
    })
    describe('When managing Singleton Dependencies', () => {
        it('should be able to register and resolve', () => {
                const dicky = new Dicky()
                dicky.registerSingleton('example', () => 'content')

                expect(dicky.resolve('example')).toBe('content')
            }
        )

        it('should be able to register different dependencies', () => {
            const dicky = new Dicky()
            dicky.registerSingleton('other', () => 'extra content')

            expect(dicky.resolve('other')).toBe('extra content')
        })

        it('should fail if a dependency was not defined', () => {
            const dicky = new Dicky()

            expect(() => {
                dicky.resolve('dependency-not-defined')
            }).toThrow(DependencyNotDefined)
        })

        it('should register and resolve dependencies of any type', () => {
            const dicky = new Dicky()
            dicky.registerSingleton('example', () => new Example('content'))

            const resolved: Example = dicky.resolve('example')
            expect(resolved).toBeInstanceOf(Example)
            expect(resolved.content()).toEqual('content')
        })

        it('should resolve to a different instance each time', () => {
            const dicky = new Dicky()
            dicky.registerSingleton('example', () => new Example('content'))
            const resolved1: Example = dicky.resolve('example')
            const resolved2: Example = dicky.resolve('example')
            expect(resolved1).toBe(resolved2)
        })

        it('should fail when registering a dependency with the same name', () => {
            const dicky = new Dicky()
            dicky.registerSingleton('example', () => 'content')

            expect(() => {
                dicky.registerSingleton('example', () => 'other content')
            }).toThrow(DependencyNameInUse)
        })
    })
    describe('When using the container', () => {
        it('should allow referring to registered dependencies', () => {
            const dicky = new Dicky()
            dicky.registerSingleton('collaborator', () => new CollaboratorExample())
            dicky.registerSingleton('service', (dic: Dicky) => new ServiceExample(dic.resolve('collaborator')))
            const service: ServiceExample = dicky.resolve('service')
            expect(service.doMyThing()).toEqual('1')
        })
    })
})