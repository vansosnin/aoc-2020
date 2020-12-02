const fs = require('fs');
const path = require('path');

const solve1 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '02.txt'), 'utf8')
    .split('\n')
    .reduce((acc, it) => {
        const match = /([\d]+)-([\d]+) ([a-z]): ([a-z]+)/.exec(it) || [];
        const min = Number(match[1]);
        const max = Number(match[2]);
        const letter = match[3];
        const password = match[4] || "";

        const charsInPassword = (password.match(new RegExp(letter, "g")) || []).length;
        if (charsInPassword >= min && charsInPassword <= max) {
            acc++;
        }

        return acc;
    }, 0);

const solve2 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '02.txt'), 'utf8')
    .split('\n')
    .reduce((acc, it) => {
        const match = /([\d]+)-([\d]+) ([a-z]): ([a-z]+)/.exec(it) || [];
        const indexA = Number(match[1]);
        const indexB = Number(match[2]);
        const letter = match[3];
        const password = match[4] || "";

        if (password.charAt(indexA - 1) === letter ^ password.charAt(indexB - 1) === letter) {
            acc++;
        }

        return acc;
    }, 0);

console.log(solve1());
console.log(solve2());
