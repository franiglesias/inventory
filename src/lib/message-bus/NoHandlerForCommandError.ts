export class NoHandlerForCommandError implements Error {
    name: string
    message: string

    constructor(command: string) {
        this.name = 'NoHandlerForCommandError'
        this.message = `No handler for command ${command}`
    }
}