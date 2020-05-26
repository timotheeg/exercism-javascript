export const largestProduct = (input, seq_size) => {
	if (seq_size > input.length) throw new Error('Span must be smaller than string length');
	if (seq_size < 0) throw new Error('Span must be greater than zero');

	const digits = input.split('').map(d => {
		const val = parseInt(d);

		if (isNaN(val)) throw new Error('Digits input must only contain digits');

		return val;
	});

	let largest_product = 0;

	for (let idx=input.length - seq_size + 1; idx--; ) {
		const val = digits.slice(idx, idx + seq_size).reduce((p, v) => p * v, 1);

		if (val > largest_product) {
			largest_product = val;
		}
	}

	return largest_product;
};
