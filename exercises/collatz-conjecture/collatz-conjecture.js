export const steps = (n) => {
	if (n <= 0) {
		throw new Error('Only positive numbers are allowed');
	}

	let iterations = 0;

	while (n != 1) {
		iterations++;

		if (n % 2) {
			n = n * 3 + 1;
		}
		else {
			n /= 2;
		}
	}

	return iterations;
};
