const os = require('os');
const fs = require('fs');
const path = require('path');

let input = null;
const getInput = () => {
    if (!input) {
        input = fs.readFileSync(path.join(__dirname, '..', 'input', '09.txt'), 'utf8').split(os.EOL)
            .filter(Boolean)
            .map(Number);
    }

    return input;
};

const getWrongNumber = (numbers) => {
    const PREAMBLE = 25;
    const cache = {};
    const isInCache = (number, index) => !!cache[number]
        && cache[number][0] >= (index - PREAMBLE) && cache[number][0] < index
        && cache[number][1] >= (index - PREAMBLE) && cache[number][1] < index;

    for (let i = PREAMBLE; i < numbers.length; i++) {
        const currentNumber = numbers[i];

        if (!isInCache(currentNumber, i)) {
            for (let j = i - PREAMBLE; j < i - 1; j++) {
                for (let k = j + 1; k < i; k++) {
                    const sum = numbers[j] + numbers[k];
                    cache[sum] = [j, k];
                }
            }
        }

        if (!isInCache(currentNumber, i)) {
            return [currentNumber, i];
        }
    }
};

const solve1 = () => {
    const numbers = getInput();

    return getWrongNumber(numbers)[0];
};

const solve2 = () => {
    const numbers = getInput();
    const [wrongNumber, wrongNumberIndex] = getWrongNumber(numbers);

    outer: for (let i = 0; i < wrongNumberIndex - 1; i++) {
        let sum = numbers[i];

        for (let j = i + 1; j < wrongNumberIndex; j++) {
            if (sum < wrongNumber) {
                sum += numbers[j];
            }

            if (sum === wrongNumber) {
                const range = numbers.slice(i, j);
                return Math.min(...range) + Math.max(...range);
            }

            if (sum > wrongNumber) {
                continue outer;
            }
        }
    }
};

console.log(solve1());
console.log(solve2());
