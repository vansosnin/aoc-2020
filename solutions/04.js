const os = require('os');
const fs = require('fs');
const path = require('path');

const FIELDS = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
];

const solve1 = () => {
    const passports = fs.readFileSync(path.join(__dirname, '..', 'input', '04.txt'), 'utf8').split(os.EOL + os.EOL);
    const isValid = (passport) => FIELDS.reduce((acc, it) => acc && passport.includes(`${it}:`), true);
    return passports.reduce((acc, it) => isValid(it) ? ++acc : acc, 0);
};

const solve2 = () => {
    const passports = fs.readFileSync(path.join(__dirname, '..', 'input', '04.txt'), 'utf8')
        .split(os.EOL + os.EOL)
        .map((it) => {
            const passport = {};
            it.split(/\s/)
                .filter(Boolean)
                .forEach((it) => {
                    const keyVal = it.split(':');
                    passport[keyVal[0]] = keyVal[1];
                });
            return passport;
        });

    const isValidByr = (passport) => !!passport.byr && Number(passport.byr) >= 1920 && Number(passport.byr) <= 2002;
    const isValidIyr = (passport) => !!passport.iyr && Number(passport.iyr) >= 2010 && Number(passport.iyr) <= 2020;
    const isValidEyr = (passport) => !!passport.eyr && Number(passport.eyr) >= 2020 && Number(passport.eyr) <= 2030;
    const isValidHgt = (passport) => {
        if (!passport.hgt) {
            return false;
        }
        const [, amount, units] = passport.hgt.match(/([\d]+)(cm|in)/) || [];

        if (units === 'cm') {
            return amount >= 150 && amount <= 193;
        }

        if (units === 'in') {
            return amount >= 59 && amount <= 76;
        }

        return false;
    };
    const isValidHcl = (passport) => !!passport.hcl && !!passport.hcl.match(/^#[\da-f]{6}$/);
    const isValidEcl = (passport) => !!passport.ecl &&
        (passport.ecl === 'amb'
            || passport.ecl === 'blu'
            || passport.ecl === 'brn'
            || passport.ecl === 'gry'
            || passport.ecl === 'grn'
            || passport.ecl === 'hzl'
            || passport.ecl === 'oth');
    const isValidPid = (passport) => !!passport.pid && !!passport.pid.match(/^(\d{9})$/);

    const isValid = (passport) => isValidByr(passport)
        && isValidIyr(passport)
        && isValidEyr(passport)
        && isValidHgt(passport)
        && isValidHcl(passport)
        && isValidEcl(passport)
        && isValidPid(passport);

    return passports.reduce((acc, it) => isValid(it) ? ++acc : acc, 0);
};

console.log(solve1());
console.log(solve2());
