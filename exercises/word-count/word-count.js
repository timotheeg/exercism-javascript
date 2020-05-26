export const countWords = (sentence) => {
	sentence = sentence.toLowerCase();

	const word_re = /[a-z0-9']+/g;
	const res = {};

	let match;

	while(match = word_re.exec(sentence)) {
		let word = match[0];

		// drop wrapper quotes
		const m = word.match(/^'(.+)'$/);

		if (m) {
			word = m[1];
		}

		res[word] |= 0;
		res[word] += 1;
	}

	return res;
};
