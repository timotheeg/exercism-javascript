const PLANTS = ['grass', 'clover', 'radishes', 'violets'];
const CHILDREN = [
	'Alice',
	'Bob',
	'Charlie',
	'David',
	'Eve',
	'Fred',
	'Ginny',
	'Harriet',
	'Ileana',
	'Joseph',
	'Kincaid',
	'Larry'
];

const PLANTS_BY_LETTER = PLANTS.reduce((acc, plant) => {
	acc[plant[0].toUpperCase()] = plant;
	return acc;
}, {});

export class Garden {
	constructor(garden_str, children=CHILDREN) {
		const cups = garden_str.split('\n').map(row => row.split(''));

		children
			.map(child => child.toLowerCase())
			.sort()
			.forEach((child, child_idx) => {
				const cup_idx = child_idx * 2;

				this[child.toLowerCase()] = [
					...cups[0].slice(cup_idx, cup_idx + 2),
					...cups[1].slice(cup_idx, cup_idx + 2)
				].map(letter => PLANTS_BY_LETTER[letter]);
			});
	}
}
