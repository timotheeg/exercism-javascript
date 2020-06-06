const OFFSETS = [
	[-1, -1],
	[-1,  0],
	[-1,  1],
	[ 0, -1],
	[ 0,  1],
	[ 1, -1],
	[ 1,  0],
	[ 1,  1],
];

export const annotate = (input) =>  {
	input = input.map(row => row.split(''));

	const output = input.map(row => [...row]);

	input.forEach((row, ridx) => {
		row.forEach((cell, cidx) => {
			if (cell != ' ') return;

			const count = OFFSETS.reduce((sum, o) => {
				const check_row = input[ridx + o[0]];

				if (!check_row) return sum;

				return sum + (check_row[cidx + o[1]] === '*');
			}, 0);

			if (count > 0) {
				output[ridx][cidx] = count;
			}
		});
	});

	return output.map(row => row.join(''));
}
