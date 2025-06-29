import {describe, expect, it} from 'vitest'
import {Result, SuccessResult} from '../../inventory/driving/Result'
import {Handler} from './Handler'
import {MessageBus} from './MessageBus'
import {NoHandlerForCommandError} from './NoHandlerForCommandError'

class MyCommand {
    public readonly payload: string

    constructor(payload: string) {
        this.payload = payload
    }
}

class MyHandler<MyCommand> implements Handler<any> {
    public handle(command: MyCommand): Result<any> {
        return new SuccessResult(null)
    }
}

describe('A message bus', () => {
    describe('Manages Commands', () => {
        it('should pass the command to the right handler', () => {
            const bus = new MessageBus()
            const handler = new MyHandler()
            bus.registerHandler(MyCommand, handler)

            const command = new MyCommand('example')

            const result = bus.dispatch(command)
            if (result) {
                expect(result.successful()).toEqual(true)
                expect(result.unwrap()).toEqual(null)
            }
        })

        it('should fail if not handler supports Message', () => {
            const bus = new MessageBus()
            const command = new MyCommand('example')

            expect(() => bus.dispatch(command)).toThrow(NoHandlerForCommandError)
        })
    })
})