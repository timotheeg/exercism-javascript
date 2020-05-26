const values = {
	1: 'AEIOULNRST',
	2: 'DG',
	3: 'BCMP',
	4: 'FHVWY',
	5: 'K',
	8: 'JX',
	10: 'QZ'
}

const map = {};

for (const [key, letters] of Object.entries(values)) {
	const value = parseInt(key);

	letters.split('').forEach(letter => map[letter] = value);
}

export const score = (input) => {
	let score = 0;

	input = input.toUpperCase();

	for (let idx=input.length; idx--; ) {
		score += map[input[idx]];
	}

	return score;
};
