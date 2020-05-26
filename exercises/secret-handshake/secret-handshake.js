export const commands = (n) => {
	let shift = 0
	const res = [];

	if (n & 1 << shift++) {
		res.push('wink');
	}

	if (n & 1 << shift++) {
		res.push('double blink');
	}

	if (n & 1 << shift++) {
		res.push('close your eyes');
	}

	if (n & 1 << shift++) {
		res.push('jump');
	}

	if (n & 1 << shift++) {
		res.reverse();
	}

	return res;
};
