import {Handler} from './Handler'
import {NoHandlerForCommandError} from './NoHandlerForCommandError'

export class MessageBus {
    private handlers: Map<string, Handler<any>> = new Map()

    registerHandler(command: any, handler: Handler<any>) {
        const key = command.name
        this.handlers.set(key, handler)
    }

    dispatch(command: any): any | void {
        const handler = this.resolveHandlerFor(command)

        return handler.handle(command)
    }

    private resolveHandlerFor(command: any): Handler<any> {
        const handler = this.handlers.get(command.constructor.name)

        if (!handler) {
            throw new NoHandlerForCommandError(command.name)
        }

        return handler
    }
}