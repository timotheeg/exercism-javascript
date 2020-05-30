export const isArmstrongNumber = (n) => {
	const digits = [];

	let remainder = n;

	while (remainder) {
		const digit = remainder % 10;
		digits.push(digit);
		remainder = (remainder - digit) / 10;
	}

	return n === digits.reduce((sum, d) => sum + Math.pow(d, digits.length), 0);
};
