const WORD_RE = /[a-z']+/ig;

export const parse = (input) => {
	return input
		.match(WORD_RE)
		.map(w => w[0].toUpperCase())
		.join('');
};
