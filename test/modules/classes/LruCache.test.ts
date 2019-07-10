import { expect } from 'chai'
import { LruCache } from '../../../src'

describe('The LruCache instance', () => {
    it('should be avle to store and retrive a value', () => {
        const cache = new LruCache<number>()

        for (let index = 0; index < 100; index++) {
            const foo = Math.random()
            const bar = Math.random()

            cache.set(foo, bar)
            expect(cache.get(foo)).to.equal(bar)
        }
    })

    it('should start deleting items when hitting the limit', () => {
        const cache = new LruCache<number>(3)

        cache.set(1, 1)
        cache.set(2, 2)
        cache.set(3, 3)
        cache.set(4, 4)
        cache.set(2, 2)
        cache.set(5, 5)

        expect(cache.get(2)).to.equal(2)
        expect(cache.get(4)).to.equal(4)
        expect(cache.get(5)).to.equal(5)

        expect(cache.get(1)).to.be.null
        expect(cache.get(3)).to.be.null
    })
})
