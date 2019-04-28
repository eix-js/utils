import { decorable } from "./interfaces";
import { debugKey } from "./keys";

export function Singleton<T extends decorable>(target: T) {
    //keep instance
    let instance: any

    return class extends target {

        [debugKey]: boolean

        //override constructor
        constructor(...args: any[]) {

            //check if we already have an instance
            if (instance)
                return instance

            //create new instance
            super(...args)

            if (!this[debugKey])
                //save the instance
                instance = this
        }
    }
}