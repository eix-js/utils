# utils
Various decorators for the eix game engine

# Getting started
To get started, first install @eix/ui with

```
npm i <the url of this repo>
```

You also need to include `"experimentalDecorators": true` in your tsconfig.json.


## Singleton
To use the singleton pattern, you can just create a class, and use the @Singleton decorator:

```ts
import { Singleton } from "@eix/utils"

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

b.prop // 100
a == b //true
```
# Playing with the source:
Run `npm test` to run the tests and `npm run build` to build.






