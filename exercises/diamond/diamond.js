const CODE_A = 'A'.charCodeAt(0)

export const rows = (letter) => {
	if (letter === 'A') return ['A'];

	const max_code = letter.charCodeAt(0);
	const num_half_rows = max_code - CODE_A + 1;
	const row_len = (max_code - CODE_A) * 2 + 1;
	const center_idx = Math.floor(row_len / 2);

	let upper_half = Array(num_half_rows).fill().map(_ => Array(row_len).fill(' '));

	upper_half.forEach((row, idx) => {
		const cur_letter = String.fromCharCode(CODE_A + idx);

		row[center_idx - idx] = cur_letter;
		row[center_idx + idx] = cur_letter;
	});

	upper_half = upper_half.map(row => row.join(''));

	const lower_half = [...upper_half].reverse().slice(1);

	return [
		...upper_half,
		...lower_half
	];
};
