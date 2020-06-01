const VERSES = {
	n: [
		'{current} bottles of beer on the wall, {current} bottles of beer.',
		'Take one down and pass it around, {remaining} bottles of beer on the wall.'
	],
	2: [
		'2 bottles of beer on the wall, 2 bottles of beer.',
		'Take one down and pass it around, 1 bottle of beer on the wall.'
	],
	1: [
		'1 bottle of beer on the wall, 1 bottle of beer.',
		'Take it down and pass it around, no more bottles of beer on the wall.'
	],
	0: [
		'No more bottles of beer on the wall, no more bottles of beer.',
		'Go to the store and buy some more, 99 bottles of beer on the wall.'
	]
}

export const recite = (initialBottlesCount, takeDownCount) => {
	if (initialBottlesCount < 0) throw new Error('Invalid initial count');
	if (takeDownCount <= 0) throw new Error('Invalid takeDown count');

	const verses = [];

	let current = initialBottlesCount;

	while(takeDownCount--) {
		const verse = VERSES[current > 2 ? 'n' : current];

		verses.push(verse[0].replace(/\{current\}/g, current--));
		verses.push(verse[1].replace(/\{remaining\}/g, current));

		if (takeDownCount) {
			verses.push('');
		}
	}

	return verses;
};
