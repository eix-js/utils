import { expect } from 'chai'
import { CacheInstancesByKey } from '../../../src'

describe('CacheInstancesByKey', () => {
    const getFoo = (limit = Infinity) => {
        @CacheInstancesByKey(limit)
        class Foo {
            constructor(public bar: string) {}
        }

        return Foo
    }

    it('should return the same instance when passing the same key', () => {
        const Foo = getFoo()

        const a = new Foo('goo')
        const b = new Foo('goo')

        expect(a).to.equal(b)
    })

    it('should return an instanc for each key', () => {
        const Foo = getFoo()

        const a = new Foo('goo')
        const b = new Foo('goo')
        const c = new Foo('buzz')
        const d = new Foo('buzz')

        expect(a).to.equal(b)
        expect(c).to.equal(d)
        expect(b).not.equal(c)
    })

    it('should delete old instances from the cache when crossing the limit', () => {
        const Foo = getFoo(2)

        const fuzz = new Foo('goo')
        new Foo('foo')
        new Foo('oof')
        const buzz = new Foo('goo')

        expect(fuzz).not.to.equal(buzz)
    })
})
