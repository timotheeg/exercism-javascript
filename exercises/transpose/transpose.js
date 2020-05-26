export const transpose = (m) => {
	const nrows = m.length;

	if (nrows <= 0) return [];

	const ncols = Math.max(...m.map(row => row.length));

	const res = Array(ncols).fill(0).map(_ => []);

	let pad_to = -1;

	for (let ridx=m.length; ridx--; ) {
		let row = m[ridx];

		pad_to = Math.max(row.length, pad_to);

		for (let cidx=pad_to; cidx--; ) {
			res[cidx][ridx] = row[cidx] || ' ';
		}
	}

	return res.map(row => row.join(''));
};
