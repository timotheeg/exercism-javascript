export const isLeap = (year) => {
	const by4 = year % 4 === 0;
	const by100 = year % 100 === 0;
	const by400 = year % 400 === 0;

	return by4 && (!by100 || by400);
};
