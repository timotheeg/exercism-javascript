function bins(arr, predicate) {
	const fits = [];
	const misfits = [];

	arr.forEach(elmt => {
		(predicate(elmt) ? fits : misfits).push(elmt);
	});

	return { fits, misfits };
}

export const keep = (arr, predicate) => {
	return bins(arr, predicate).fits;
};

export const discard = (arr, predicate) => {
	return bins(arr, predicate).misfits;
};
