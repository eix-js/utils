import { Singleton } from "../src/singleton"
import { expect } from "chai"

describe("Singleton", () => {
    it("should serve the same objecct when create multiple times", () => {
        //create class
        @Singleton
        class TestClass {
            constructor() { }
        }

        //create 2 instances
        const a = new TestClass()
        const b = new TestClass()

        //should be the same
        expect(a, "Both objects should be the exact same instance").to.be.equal(b)
    })

    it("should make all instances have the same props", () => {

        //create class
        @Singleton
        class TestClass {
            //create a constructor
            constructor(public someprop: number) { }
        }

        //create 2 instances
        const a = new TestClass(100)
        const b = new TestClass(200)

        //b should be the same as a, so it needs the same props
        expect(b.someprop, "B should have the same props as a")
            .to.be.equal(100)
            .to.not.be.equal(200)
    })
})