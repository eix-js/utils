import { decorable } from "./interfaces";

export function Singleton<T extends decorable>(target: T) {
    //keep instance
    let instance: any

    return class extends target {
        
        //override constructor
        constructor(...args: any[]) {
            
            //check if we already have an instance
            if (instance)
                return instance

            //create new instance
            super(...args)

            //save the instance
            instance = this
        }
    }
}