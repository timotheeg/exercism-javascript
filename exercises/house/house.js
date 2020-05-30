const FIRST_PREFIX = 'This is';

const LYRICS = [
	['',                 'the horse and the hound and the horn'],
	['that belonged to', 'the farmer sowing his corn'],
	['that kept',        'the rooster that crowed in the morn'],
	['that woke',        'the priest all shaven and shorn'],
	['that married',     'the man all tattered and torn'],
	['that kissed',      'the maiden all forlorn'],
	['that milked',      'the cow with the crumpled horn'],
	['that tossed',      'the dog'],
	['that worried',     'the cat'],
	['that killed',      'the rat'],
	['that ate',         'the malt'],
	['that lay in',      'the house that Jack built.'],
];


export class House {
	static verse(n) {
		return LYRICS
			.slice(-n)
			.map(([prefix, line], idx) => {
				return `${idx === 0 ? FIRST_PREFIX : prefix} ${line}`;
			});
	}

	static verses(start, end) {
		const res = [];

		for (let idx=start; idx<=end; idx++) {
			if (idx > start) res.push('');

			res.push(...House.verse(idx));
		}

		return res;
	}
}
