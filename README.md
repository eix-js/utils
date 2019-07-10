[![Build Status](https://img.shields.io/travis/eix-js/utils.svg)](https://travis-ci.com/eix-js/utils) [![License](https://img.shields.io/github/license/eix-js/utils.svg)](https://github.com/eix-js/utils/blob/master/LICENSE.md) [![Version](https://img.shields.io/github/package-json/v/eix-js/utils.svg)](https://github.com/eix-js/utils)


# Utils
Various decorators for the eix game engine

# Getting started
To get started, first install @eix-js/utils with

```
npm i @eix-js/utils
```

You also need to include `"experimentalDecorators": true` in your tsconfig.json.

## Singleton
To use the singleton pattern, you can just create a class, and use the @Singleton decorator:

```ts
import { Singleton } from "@eix-js/utils"

@Singleton //this class will have only one instance
class TestClass {
    constructor( public prop: number ) { }
}
```

The instance will be created the frst time you run the constructor:
```ts
//instance doesnt exist

const a = new TestClass( 100 ) //instance was created
const b = new TestClass( 200 ) //returns the same instance

console.log(b.prop) // 100
console.log(a == b) //true
```

## Caching

The following decorators are all used to cache results of stuff:

### CacheResults
The CacheResults decorator is used to cache the results of methods:


> Note: none of these works with default arguments


```ts
import { CacheResults } from "@eix-js/utils"

let runCount = 0

class TestClass {
    @CacheResults()
    public foo(bar: number) {
        return Math.random() + bar + runCount++
    }
}

const instance = new TestClass()

// This will always be true, no matter what's inside the function
console.log(instance.foo(1) === instance.foo(1)) // true

// The function only run once
console.log(runCount) // 1
```

### CacheInstances

```ts
@CacheInstances()
class TestClass {
    constructor(public foo: string){ }
}

const a = new TestClass('a')
const b = new TestClass('a')
const c = new TestClass('c')

console.log(a === b) // true
console.log(a === c) // false
```

### CacheInstancesByKey
This is a variation of the CacheInstances decorator. It caches instances by saving in a lru cache using a hash as the key. Overall this is more efficient, and should be always used if possible. 

> Note: This assumes the first argument is a string

```ts
@CacheInstancesByKey()
class Foo {
    public constructor(public bar: string) { }
}

const a = new Foo('goo')
const b = new Foo('goo')
const c = new Foo('foo-bar-goo)

console.log(a === b) // true
console.log(b === c) // false
```

# Playing with the source:
Run `npm test` to run the tests and `npm run build` to build.






