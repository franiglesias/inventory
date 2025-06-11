import { describe, expect, it } from "vitest";
import {ShortUniqueIdProvider} from "./ShortUniqueIdProvider";


describe('ShortUniqueIdProvider', () => {
    const generator = new ShortUniqueIdProvider();
    const idLength = 8

    describe('Identifier', () => {
        it('should have a fixed length', () => {
            const id = generator.generate();
            expect(id.length).toEqual(idLength);
        });
    })
})