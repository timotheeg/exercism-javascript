export const isIsogram = (word) => {
	const seen = {};
	const input = word.toLowerCase().replace(/[^a-z]+/, '');

	for (let idx=input.length; idx--; ) {
		const letter = input[idx];

		if (seen[letter]) return false;

		seen[letter] = true;
	}

	return true;
};
