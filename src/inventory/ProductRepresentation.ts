export interface ProductRepresentation<T> {
    fill(key: string, value: unknown): void

    print(): T
}