export interface Handler<C> {
    handle(message: C): any | void
}