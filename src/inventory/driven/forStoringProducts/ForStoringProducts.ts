export interface ForStoringProducts {
    getById(productId: string): Object | undefined

    store(productId: string, product: { id: string; name: string; quantity: number }): void
}