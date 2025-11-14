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

const ORDER_PREFIXES = ['', 'kilo', 'mega', 'giga'];

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
        let value = 0, unit = '';
      
        for (let idx=ORDER_PREFIXES.length; idx--;) {
          const order = Math.pow(10, idx * 3)
          if (this.value >= order) {
            value = this.value / order;
            unit = ORDER_PREFIXES[idx];
            break;
          }
        }
      
        return `Resistor value: ${value} ${unit}ohms`;
	}
}
