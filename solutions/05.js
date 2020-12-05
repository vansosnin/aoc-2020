const os = require('os');
const fs = require('fs');
const path = require('path');

const calculate = ([min, max], direction) => {
    if (direction === 'lower') {
        return [min, max - Math.ceil((max - min) / 2)];
    }

    return [min + Math.ceil((max - min) / 2), max];
};

const decodeSeat = (code) => {
    let rows = [0, 127];
    let cols = [0, 7];
    for (let direction of code) {
        if (direction === 'F') {
            rows = calculate(rows, 'lower');
        }
        if (direction === 'B') {
            rows = calculate(rows, 'upper');
        }
        if (direction === 'L') {
            cols = calculate(cols, 'lower');
        }
        if (direction === 'R') {
            cols = calculate(cols, 'upper');
        }
    }

    return rows[0] * 8 + cols[0];
};

const solve1 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '05.txt'), 'utf8').split(os.EOL)
    .reduce((acc, it) => {
        const seatId = decodeSeat(it);
        return acc > seatId ? acc : seatId;
    }, 0);

const solve2 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '05.txt'), 'utf8').split(os.EOL)
    .map(decodeSeat)
    .sort((a, b) => a - b)
    .find((it, i, seats) => seats[i + 1] - it === 2) + 1;

console.log(solve1());
console.log(solve2());
