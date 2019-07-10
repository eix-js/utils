import { expect } from 'chai'
import { CacheInstances } from '../../../src'

describe('CacheInstances', () => {
    it('shoud only create one instance when passing the same arguments', () => {
        @CacheInstances(1)
        class TestClass {
            constructor(public bar: number) {}
        }

        const foo = new TestClass(7)
        const goo = new TestClass(7)

        expect(foo).to.equal(goo)
    })

    it('should return an instance for each set of arguments', () => {
        @CacheInstances()
        class TestClass {
            constructor(public foo = 1, public bar = 2, public buzz = 3) {}
        }

        const a = new TestClass(1, 2, 3)
        const b = new TestClass(1, 2, 3)
        const c = new TestClass(1, 2, 1)
        const d = new TestClass(1, 2, 1)
        const e = new TestClass(3, 2, 1)
        const f = new TestClass(3, 2, 1)

        expect(a).to.equal(b)
        expect(c).to.equal(d)
        expect(e).to.equal(f)

        expect(a)
            .not.to.equal(c)
            .to.equal(e)
        expect(d)
            .not.to.equal(b)
            .to.equal(f)
        expect(f)
            .not.to.equal(a)
            .to.equal(d)
    })
})
