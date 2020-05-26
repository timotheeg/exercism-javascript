const GIGA_SECOND = Math.pow(10, 9);

export const gigasecond = (date) => {
	const d = new Date(date.getTime());

	d.setSeconds(d.getSeconds() + GIGA_SECOND);

	return d;
};
