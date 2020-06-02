export const convert = (in_digits, in_base=-1, out_base=-1) => {
	if (in_base <= 1 || in_base % 1) {
		throw new Error('Wrong input base')
	}

	if (out_base <= 1 || out_base % 1) {
		throw new Error('Wrong output base')
	}

	if (
		in_digits.length <= 0
		|| in_digits.some(d => d < 0 || d >= in_base)
		|| (in_digits.length > 1 && in_digits[0] == 0)
	) {
		throw new Error('Input has wrong format')
	}

	let num = in_digits
		.reverse()
		.reduce((sum, v, idx) => sum + v * Math.pow(in_base, idx), 0);

	const out_digits = [];

	do {
		out_digits.unshift(num % out_base);
		num = Math.floor(num / out_base);
	}
	while(num);

	return out_digits;
};
