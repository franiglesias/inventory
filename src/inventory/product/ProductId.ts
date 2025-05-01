export class InvalidIdentifierError implements Error {
    message: string
    name: string


    constructor(message: string) {
        this.message = message
        this.name = 'InvalidIdentifierError'
    }
}

export class ProductId {
    private readonly productId: string

    constructor(productId: string) {
        this.productId = productId
    }

    toString(): string {
        return this.productId
    }

    static ensureValid(s: string) {
        if (s.trim().length === 0) throw new InvalidIdentifierError('Invalid ProductId')
        return new ProductId(s)
    }
}