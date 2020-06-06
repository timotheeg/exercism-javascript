export const primeFactors = (n) => {
	const factors = [];
	let remainder = n;

	outer:
	while(remainder > 1) {
		// special treatment for even numbers
		if (remainder % 2 === 0) {
			factors.push(2);
			remainder /= 2;
			continue;
		}

		const sqrt = Math.ceil(Math.sqrt(remainder));


		for (let factor=3; factor<=sqrt; factor+=2) {
			if (remainder % factor === 0) {
				factors.push(factor);
				remainder /= factor;
				continue outer;
			}
		}

		// remainder is prime, push it
		factors.push(remainder);
		break;
	}

	return factors;
};