const os = require('os');
const fs = require('fs');
const path = require('path');

const getInput = () => fs.readFileSync(path.join(__dirname, '..', 'input', '08.txt'), 'utf8').split(os.EOL)
    .map((it) => it.split(' '))
    .map((it) => ([it[0], Number(it[1])]));

const run = (commands) => {
    const state = {
        acc: 0,
        index: 0,
        state: 'running',
    };
    const visited = new Set();

    while (true) {
        if (visited.has(state.index)) {
            state.state = 'loop';
            return state;
        }

        if (state.index === commands.length) {
            state.state = 'terminated';
            return state;
        }

        visited.add(state.index);

        const [operation, value] = commands[state.index];

        switch (operation) {
            case 'acc':
                state.acc += value;
                break;
            case 'jmp':
                state.index += value;
                continue;
        }

        state.index++;
    }
};

const solve1 = () => {
    return run(getInput()).acc;
};

const solve2 = () => {
    const commands = getInput();

    for (let i = 0; i < commands.length; i++) {
        const [operation, value] = commands[i];

        if (operation === 'jmp') {
            const fixedCommands = [
                ...commands.slice(0, i),
                ['nop', value],
                ...commands.slice(i + 1),
            ];

            const result = run(fixedCommands);
            if (result.state === 'terminated') {
                return result.acc;
            }
        }
    }
};

console.log(solve1());
console.log(solve2());
