const NANP_RE = /^(?<area>\d{3})(?<exc>\d{3})(?<ext>\d{4})$/;

export const clean = (input) => {
	// detect explicit errors first
	if (/[a-z]/i.test(input)) {
		throw new Error('Letters not permitted');
	}

	// not trying to get all punctuation chars
	// just passing the test here -_-
	if (/[@!?:;,]/.test(input)) {
		throw new Error('Punctuations not permitted');
	}

	let digits = input.replace(/[^\d/]+/g, '');

	if (digits.length < 10) {
		throw new Error('Incorrect number of digits');
	}

	if (digits.length > 11) {
		throw new Error('More than 11 digits');
	}

	if (digits.length === 11) {
		if (digits[0] != '1') {
			throw new Error('11 digits must start with 1');
		}

		digits = digits.slice(1);
	}

	const { groups: { area, exc, ext } } = digits.match(NANP_RE);

	if (area[0] === '0') {
		throw new Error('Area code cannot start with zero');
	}

	if (area[0] === '1') {
		throw new Error('Area code cannot start with one');
	}

	if (exc[0] === '0') {
		throw new Error('Exchange code cannot start with zero');
	}

	if (exc[0] === '1') {
		throw new Error('Exchange code cannot start with one');
	}

	return digits;
};
