const COLORS = [
	'black',
	'brown',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'violet',
	'grey',
	'white',
];

const COL_MAP = COLORS.reduce(
	(acc, col, idx) => { acc.set(col, idx); return acc; },
	new Map()
);

export class ResistorColorTrio {
	constructor(colors) {
		const values = colors.map(col => {
			const val = COL_MAP.get(col);

			if (val === undefined) throw new Error('invalid color');

			return val;
		});

		this.value = (values[0] * 10 + values[1]) * Math.pow(10, values[2]);
	}

	get label() {
		let value, unit;

		if (this.value > 1000) {
			unit = 'kiloohms';
			value = this.value /= 1000;
		}
		else {
			unit = 'ohms';
			value = this.value;
		}

		return `Resistor value: ${value} ${unit}`;
	}
}
