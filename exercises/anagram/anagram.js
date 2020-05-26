function getLetterCounts(word) {
	return word
		.split('')
		.reduce((acc, letter) => {
			acc[letter] |= 0;
			acc[letter] += 1;
			return acc;
		}, {});
}

function areAnagrams(letter_counts_1, letter_counts_2) {
	const letter_union = new Set([
		...Object.keys(letter_counts_1),
		...Object.keys(letter_counts_2)
	]);

	for (const letter of letter_union) {
		if (letter_counts_1[letter] != letter_counts_2[letter]) return false;
	}

	return true;
}

export const findAnagrams = (word, candidates) => {
	const ref = word.toLowerCase();
	const ref_counts = getLetterCounts(ref);
	const anagrams = [];

	candidates.forEach(candidate => {
		const ref2 = candidate.toLowerCase();

		if (ref === ref2) return;

		const counts = getLetterCounts(ref2);

		if (areAnagrams(ref_counts, counts)) {
			anagrams.push(candidate);
		}
	});

	return anagrams;
}
