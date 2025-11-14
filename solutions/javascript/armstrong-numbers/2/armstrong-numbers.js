export const isArmstrongNumber = (n) => {
	const source = BigInt(n)    
	const digits = [];

	let remainder = source;

	while (remainder) {
		const digit = remainder % 10n;
		digits.push(digit);
		remainder = (remainder - digit) / 10n;
	}

	return source === digits.reduce((sum, d) => sum + d ** BigInt(digits.length), 0n);
};
