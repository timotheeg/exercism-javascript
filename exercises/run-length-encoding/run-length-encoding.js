const ENCODED_TOKEN_RE = /(?<count>\d+)?(?<char>[a-z ])/ig;

function getToken(char, count) {
	return `${count > 1 ? count : ''}${char}`;
}

export const encode = (plain) => {
	if (!plain) return '';

	const tokens = [];

	let char = plain[0];
	let count = 1;

	for (let idx = 1; idx < plain.length; idx++) {
		if (plain[idx] !== char) {
			tokens.push(getToken(char, count));

			char = plain[idx];
			count = 1;
		}
		else {
			count++;
		}
	}

	tokens.push(getToken(char, count));

	return tokens.join('');
};

export const decode = (encoded) => {
	if (!encoded) return '';

	const chars = [];

	let m;

	while(m = ENCODED_TOKEN_RE.exec(encoded)) {
		const count = parseInt(m.groups.count) || 1;

		chars.push(...Array(count).fill(m.groups.char));
	}

	return chars.join('');
};
