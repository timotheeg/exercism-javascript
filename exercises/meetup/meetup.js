const QUALIFIERS = {
	'first':  1,
	'second': 2,
	'third':  3,
	'fourth': 4,
	'fifth':  5,
};
const DAY = {
	'Monday':    1,
	'Tuesday':   2,
	'Wednesday': 3,
	'Thursday':  4,
	'Friday':    5,
	'Saturday':  6,
	'Sunday':    0,
}

export const meetup = (year, month, qualifier, day) =>  {
	const dow = DAY[day];
	let d;

	if (qualifier == 'last') {
		d = new Date(year, month, 1);

		do {
			d.setDate(d.getDate() - 1);
		}
		while(d.getDay() != dow);
	}
	else if (qualifier == 'teenth') {
		d = new Date(year, month - 1, 13);

		while(d.getDay() != dow) {
			d.setDate(d.getDate() + 1);
		}

		return d;
	}
	else {
		d = new Date(year, month - 1, 1);

		while(d.getDay() != dow) {
			d.setDate(d.getDate() + 1);
		}

		d.setDate(d.getDate() + 7 * (QUALIFIERS[qualifier] - 1));
	}

	return d;
}