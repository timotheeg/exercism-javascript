function getFactors(n) {
	const sqrt = Math.sqrt(n);

	let factor = 1;

	const factors = [factor];

	while(++factor <= sqrt) {
		if (n % factor === 0) {
			factors.push(factor);

			const complement = n / factor;

			if (complement != factor) {
				factors.push(complement);
			}
		}
	}

	return factors;
}

export const classify = (num) => {
	if (num <= 0) {
		throw new Error('Classification is only possible for natural numbers.');
	}
	else if (num === 1) {
		return 'deficient';
	}

	const factors = getFactors(num);
	const sum = factors.reduce((acc, v) => acc + v, 0);

	if (sum === num) {
		return 'perfect';
	}
	else if (sum > num) {
		return 'abundant';
	}
	else if (sum < num) {
		return 'deficient';
	}
};
