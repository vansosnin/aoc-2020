const os = require('os');
const fs = require('fs');
const path = require('path');

let input = null;
const getInput = () => {
    if (!input) {
        input = fs.readFileSync(path.join(__dirname, '..', 'input', '10.txt'), 'utf8').split(os.EOL)
            .filter(Boolean)
            .map(Number)
            .sort((a, b) => a - b);
        input = [0].concat(input).concat(input[input.length - 1] + 3);
    }

    return input;
};

const adaptersJolts = getInput();

const solve1 = () => {
    let diffOne = 0;
    let diffThree = 0;

    adaptersJolts.forEach((it, i) => {
        const diff = adaptersJolts[i] - adaptersJolts[i - 1];
        if (diff === 1) {
            diffOne++;
        }
        if (diff === 3) {
            diffThree++;
        }
    });

    return diffOne * diffThree;
};

const solve2 = (index = 0, cache = new Map()) => {
    if (!cache.has(index)) {
        let count = 0;
        for (let n of [1, 2, 3]) {
            const diff = adaptersJolts[index + n] - adaptersJolts[index];
            if (diff >= 1 && diff <= 3) {
                count += solve2(index + n, cache);
            }
        }

        cache.set(index, count);
    }

    return cache.get(index) || 1;
};

console.log(solve1());
console.log(solve2());
