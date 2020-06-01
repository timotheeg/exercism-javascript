export const primeFactors = (num) => {
	const final_factors = [];

	let remainder = num;

	do {
		const sqrt = Math.sqrt(remainder);

		const factors = [];
		let factor = 1;

		// find first factor
		while(++factor <= sqrt) {
			if (remainder % factor === 0) {
				factors.push(factor);
				remainder /= factor;
				break;
			}
		}

		if (n <= 1 || !factors.length) {
			final_factors.push(...factors)
		}



		if (n <= 1) {
			return final_factors;
		}
	}
	while(true);
};
