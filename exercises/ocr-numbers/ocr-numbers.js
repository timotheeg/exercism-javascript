const TEMPLATES = '' +
' _     _  _     _  _  _  _  _ \n' +
'| |  | _| _||_||_ |_   ||_||_|\n' +
'|_|  ||_  _|  | _||_|  ||_| _|\n' +
'                              ';

function normalize(input) {
	const lines = input.split('\n');
	const res = [];

	for (let ridx=0; ridx<lines.length; ridx+=4) {
		const row = [];

		for (let cidx=0; cidx<lines[ridx].length; cidx+=3) {
			const d = ''
				+ lines[ridx + 0].substr(cidx, 3)
				+ lines[ridx + 1].substr(cidx, 3)
				+ lines[ridx + 2].substr(cidx, 3)
			;

			row.push(d);
		}

		res.push(row);
	}

	return res;
}

const DIGITS = normalize(TEMPLATES)[0].reduce(
	(acc, did, idx) => {
		acc.set(did, idx);
		return acc;
	},
	new Map()
);

export const convert = (input) => {
	return normalize(input)
		.map(row => row.map(did => DIGITS.has(did) ? DIGITS.get(did) : '?').join(''))
		.join(',');
};
