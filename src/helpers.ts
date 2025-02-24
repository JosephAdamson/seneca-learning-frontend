/* 
Classic shuffling Fisher Yates shuffling alogrithm. 
Instead of in place, I'm returning a shuffled copy.
see: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle\

@param  T[]  targ   Target array. 
*/
function fisherYatesShuffle<T>(targ: T[]) {
    const arr = [...targ];
    const n = arr.length - 1;
    for (let i = n; i >= 0; i--) {
       const j = Math.floor(Math.random() * (i + 1))
       const temp = arr[i];
       arr[i] = arr[j];
       arr[j] = temp;
    }
    return arr;
}

/* 
Shuffle answerOptions data

@param  Object  obj
*/
function shuffleAnswerOptions(answerOptions: {[key: string]: string[]})  {
    const result: {[key: string]: string[]} = {};
    const currentKeys = Object.keys(answerOptions);

    currentKeys.forEach(key => {
        result[key] = fisherYatesShuffle(answerOptions[key]);
    });
    return Object.fromEntries(fisherYatesShuffle(Object.entries(result)));
}

/* 
Random hash function for key generation

@param  string  option
@param  index   index 
*/
function standardHash(option: string, index: number): number {
    if (option && index >= 0) {
        let sum = 0
        for (let i = 0; i < option.length; i++) {
            sum += option.charCodeAt(i)
        }
        return sum * 5 + index - 7;
    } 
    return -1;
}

export {
    shuffleAnswerOptions,
    standardHash
}