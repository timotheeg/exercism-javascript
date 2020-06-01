export const sum = (factors, limit) => {
	let sum = 0;

	for (let num=0; num<limit; num++) {
		for (let factor of factors) {
			if (num % factor === 0) {
				sum += num;
				break;
			}
		}
	}

	return sum;
};
