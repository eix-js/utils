export const compareArrays = <T extends unknown[]>(first: T, last: T) => {
    for (let index = 0; index < first.length; index++) {
        if (first[index] !== last[index]) {
            return false
        }
    }

    return true
}
