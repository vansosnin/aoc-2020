const fs = require('fs');
const path = require('path');

const solve1 = () => fs.readFileSync(path.join(__dirname, '..', 'input', '03.txt'), 'utf8')
    .split('\n')
    .reduce((acc, it, i, arr) => {
        const rowIndex = (i * 3) % arr[i].trim().length;
        if (arr[i][rowIndex] === "#") {
            acc++;
        }

        return acc;
    }, 0);

const solve2 = () => {
    const mountain = fs.readFileSync(path.join(__dirname, '..', 'input', '03.txt'), 'utf8').split('\n');

    const getTreesOnRoute = (right, down) => {
        let treesCount = 0;
        for (let i = down, x = 1; i < mountain.length; i = i + down, x++) {
            const rowIndex = (x * right) % mountain[i].trim().length;
            if (mountain[i][rowIndex] === "#") {
                treesCount++;
            }
        }

        return treesCount;
    };

    const routes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    return routes.reduce((acc, it) => acc * getTreesOnRoute(it[0], it[1]), 1);
};

console.log(solve1());
console.log(solve2());
