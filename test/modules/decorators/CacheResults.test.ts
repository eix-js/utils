import { expect } from 'chai'
import { CacheResults } from '../../../src'

describe('CacheResults', () => {
    it('shoud only call the method once with each set of arguments', () => {
        const values: number[] = []

        class TestClass {
            @CacheResults<number>(1)
            public foo(bar: number) {
                values.push(bar)

                return bar
            }
        }

        const instance = new TestClass()

        instance.foo(1)
        instance.foo(1)
        instance.foo(2)
        instance.foo(2)

        expect(values).to.deep.equal([1, 2])
    })

    it('should only et called once if not changing the arguments', () => {
        let callCount = 0

        class TestClass {
            @CacheResults<number>(1)
            public foo(bar: number) {
                callCount++

                return bar
            }
        }

        const instance = new TestClass()

        instance.foo(2)
        instance.foo(2)
        instance.foo(2)

        expect(callCount).to.equal(1)
    })

    it('should always return the same result when called with the same arguments', () => {
        class TestClass {
            private callCount = 0

            @CacheResults()
            public foo(bar: number) {
                return this.callCount++ + bar
            }
        }

        const instance = new TestClass()

        expect(instance.foo(7))
            .to.equal(instance.foo(7))
            .not.to.equal(instance.foo(8))
    })
})
