const GIFTS = [
	[ 'first',    'a Partridge in a Pear Tree' ],
	[ 'second',   'two Turtle Doves' ],
	[ 'third',    'three French Hens' ],
	[ 'fourth',   'four Calling Birds' ],
	[ 'fifth',    'five Gold Rings' ],
	[ 'sixth',    'six Geese-a-Laying' ],
	[ 'seventh',  'seven Swans-a-Swimming' ],
	[ 'eighth',   'eight Maids-a-Milking' ],
	[ 'ninth',    'nine Ladies Dancing' ],
	[ 'tenth',    'ten Lords-a-Leaping' ],
	[ 'eleventh', 'eleven Pipers Piping' ],
	[ 'twelfth',  'twelve Drummers Drumming' ],
];


export const recite = (start_day, last_day) => {
	if (start_day <= 0 || start_day > GIFTS.length) {
		throw new Error('Invalid start day');
	}

	if (last_day === undefined) {
		last_day = start_day;
	}
	else if (last_day < start_day) {
		throw new Error('Invalid last day');
	}

	const verses = [];

	for (let day = last_day; day >= start_day; day--) {
			const day_num = GIFTS[day - 1][0];
			const gifts = GIFTS.slice(0, day).map(pair => pair[1]);

			if (gifts.length > 1) gifts[0] = `and ${gifts[0]}`;

			verses.unshift(`On the ${day_num} day of Christmas my true love gave to me: ${gifts.reverse().join(', ')}.\n`);
	}

	return verses.join('\n');
};
