import { Decorable } from '../../common/lang/Decorable'

export function Singleton<T extends Decorable<{}>>(Input: T) {
    return class Output extends Input {
        public static instance: Output

        //override constructor
        constructor(...args: any[]) {
            //check if we already have an instance
            if (Output.instance) return Output.instance

            //create new instance
            super(...args)

            Output.instance = this
        }
    }
}
