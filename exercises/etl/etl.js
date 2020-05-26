export const transform = (old) => {
	const res = {};

	for (const [key, values] of Object.entries(old)) {
		values.forEach(letter => {
			res[letter.toLowerCase()] = parseInt(key);
		});
	}

	return res;
};
