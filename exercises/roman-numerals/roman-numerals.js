var ROMAN_MAP = [
	['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
	['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
	['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM']
];

export const toRoman = (num) => {
	let unit = 0;
	let res = '';

	while (num && unit < 3) {
		const digit = num % 10;

		res = `${ROMAN_MAP[unit][digit]}${res}`;

		num = (num - digit) / 10;
		unit++;
	}

	if (num) {
		res = `${Array(num).fill('M').join('')}${res}`;
	}

	return res;
}
