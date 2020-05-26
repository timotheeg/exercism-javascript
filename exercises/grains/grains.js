export const square = (n) => {
	if (n <= 0 || n > 64) {
		throw new Error('square must be between 1 and 64');
	}

	let total = BigInt(1);

	for (let idx=n-1; idx--;) {
		total *= 2n;
	}

	return `${total}`;
};

export const total = () => {
	let total = BigInt(1);
	let board_total = BigInt(1);

	for (let idx=63; idx--;) {
		total *= 2n;
		board_total += total;
	}

	return `${board_total}`;
};
