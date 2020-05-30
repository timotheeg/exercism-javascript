const VALID_ISBN_RE = /^\d{9}[X\d]$/;

export const isValid = (isbn10) => {
	const normalised = isbn10.replace(/[^\dX]/g, '');

	if (!VALID_ISBN_RE.test(normalised)) {
		return false;
	}

	const digits = normalised.split('').reverse();

	if (digits[0] === 'X') {
		digits[0] = 10;
	}

	const sum = digits.reduce((sum, val, idx) => sum + val * (idx + 1), 0);

	return sum % 11 === 0;
};
