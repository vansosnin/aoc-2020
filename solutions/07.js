const os = require('os');
const fs = require('fs');
const path = require('path');

const solve1 = () => {
    const bagsParents = fs.readFileSync(path.join(__dirname, '..', 'input', '07.txt'), 'utf8').split('.' + os.EOL)
        .reduce((acc, rule) => {
            if (!rule) {
                return acc;
            }

            const [parent, children] = rule.split(' bags contain ');
            const rawChildren = children.split(',').map((child) => child.replace(/(\d+|bags?)/g, '').trim());

            for (const child of rawChildren) {
                acc[child] = acc[child] ? acc[child].concat(parent) : acc[child] = [parent];
            }

            return acc;
        }, {});

    const parents = new Set();
    const fillParents = (bag) => {
        if (!bagsParents[bag]) {
            return;
        }

        bagsParents[bag].forEach((it) => {
            parents.add(it);
            fillParents(it);
        });
    };

    fillParents('shiny gold');

    return parents.size;
};

const solve2 = () => {
    const parents = fs.readFileSync(path.join(__dirname, '..', 'input', '07.txt'), 'utf8').split('.' + os.EOL)
        .reduce((acc, rule) => {
            if (!rule) {
                return acc;
            }

            const [parent, children] = rule.split(' bags contain ');
            acc[parent] = children.split(',').map((child) => {
                const countMatch = child.match(/(\d+)/);
                return [
                    child.replace(/(\d+|bags?)/g, '').trim(),
                    countMatch ? Number(countMatch[1]) : 0
                ];
            });

            return acc;
        }, {});

    const getChildrenCount = (bag) => {
        if (!parents[bag]) {
            return 0;
        }

        let count = 0;

        parents[bag].forEach(([childBag, bagsCount]) => {
            count += bagsCount + (bagsCount * getChildrenCount(childBag));
        });

        return count;
    };

    return getChildrenCount('shiny gold');
};

console.log(solve1());
console.log(solve2());
