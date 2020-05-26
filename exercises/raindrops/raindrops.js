export const convert = (n) => {
	let res = '';

	if (n % 3 === 0) {
		res += 'Pling';
	}

	if (n % 5 === 0) {
		res += 'Plang';
	}

	if (n % 7 === 0) {
		res += 'Plong';
	}

	return res || `${n}`;
};
