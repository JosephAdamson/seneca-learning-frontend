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
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

/* 
Check solved state of each answerOption element

@param  Object      answerOptions
@param  number[]    togglePositions
*/
function isAllCorrectAnswerAndOptions(
    answerOptions: { [key: string]: string[] },
    togglePositions: number[]
) {
    let index = 0;
    for (const [key, value] of Object.entries(answerOptions)) {
        if (key !== value[togglePositions[index]]) {
            return false;
        }
        index++;
    }
    return true;
}

/* 
Shuffle answerOptions data, a crude way of ensuring that answerOptions
is never shuffled to 100% correct state.

@param  Object  answerOptions
*/
function shuffleAnswerAndOptions(
    answerOptions: { [key: string]: string[] },
    togglePositions: number[]
) {
    let result: { [key: string]: string[] } = { ...answerOptions };
    const currentKeys = Object.keys(answerOptions);

    while (isAllCorrectAnswerAndOptions(result, togglePositions)) {
        currentKeys.forEach((key) => {
            result[key] = fisherYatesShuffle(result[key]);
        });

        result = Object.fromEntries(fisherYatesShuffle(Object.entries(result)))
    }

    return result;
}

/* 
Random hash function for key generation

@param  string  option
@param  index   index 
*/
function standardHash(option: string, index: number): number {
    if (option && index >= 0) {
        let sum = 0;
        for (let i = 0; i < option.length; i++) {
            sum += option.charCodeAt(i);
        }
        return sum * 5 + index - 7;
    }
    return -1;
}

/* 
For each string: string[] entry reresenting a toggle switch in 'data'
pick a random index within the range of each entry's value.

@param  Object  answerOptions    Each entry in answerOptions represents the data
for a single toggle swtich.
*/
function getTogglePositions(containerData: { [key: string]: string[] }) {
    return Object.keys(containerData).map((key) =>
        Math.floor(Math.random() * containerData[key].length)
    );
}

export {
    shuffleAnswerAndOptions,
    standardHash,
    getTogglePositions,
    isAllCorrectAnswerAndOptions,
};
