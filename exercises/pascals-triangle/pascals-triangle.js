export const rows = (num) => {
	const res = [];

	if (num <= 0) return res;

	let prev = [1];

	res.push(prev);

	for (let row=1; row<num; row++) {
		const line = [];

		for (let idx=0; idx<=row; idx++) {
			line.push((prev[idx - 1] || 0) + (prev[idx] || 0));
		}

		res.push(line);

		prev = line;
	}

	return res;
};
