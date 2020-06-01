export const flatten = (input) => {
	const res = [];

	input.forEach(entry => {
		if (entry == null) return;

		if (Array.isArray(entry)) {
			res.push(...flatten(entry));
		}
		else {
			res.push(entry);
		}
	});

	return res;
}
