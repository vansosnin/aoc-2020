const fs = require('fs');
const path = require('path');

const solve = () => {
    const input = fs.readFileSync(path.join(__dirname, '..', 'input', '01.txt'), 'utf8');
    const inputArray = input
        .split('\n')
        .map(Number);

    for (let i = 0; i < inputArray.length; i++) {
        const a = inputArray[i];

        for (let j = i + 1; j < inputArray.length; j++) {
            const b = inputArray[j];

            for (let k = j + 1; k < inputArray.length; k++) {
                const c = inputArray[k];

                if (a + b + c === 2020) {
                    return a * b * c;
                }
            }
        }
    }
};

console.log(solve());
