const os = require('os');
const fs = require('fs');
const path = require('path');

const solve1 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '06.txt'), 'utf8').split(os.EOL + os.EOL)
    .reduce((acc, it) => acc + new Set(it.replace(/\s/g, '').split('')).size, 0);

const solve2 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '06.txt'), 'utf8').split(os.EOL + os.EOL)
    .reduce((acc, it) => {
        const group = it.split(os.EOL).filter(Boolean);
        const count = group[0].split('').filter((answer) => group.every((line) => line.includes(answer))).length;

        return acc + count;
    }, 0);

console.log(solve1());
console.log(solve2());
