const WORD_RE = /[a-z0-9']+/g;

export const countWords = (sentence) => {
	sentence = sentence.toLowerCase();

	const res = {};

	let match;

	while(match = WORD_RE.exec(sentence)) {
		const word = match[0].replace(/^'|'$/g, '');

		if (!word) continue;

		res[word] |= 0;
		res[word] += 1;
	}

	return res;
};
