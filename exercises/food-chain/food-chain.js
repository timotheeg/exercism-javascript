const FIRST_LINE = 'I know an old lady who swallowed a {1}.';
const BETWEEN_LINE = 'She swallowed the {1} to catch the {2}';

const LINES = [
	[ 'fly',    'I don\'t know why she swallowed the fly. Perhaps she\'ll die.', '.' ],
	[ 'spider', 'It wriggled and jiggled and tickled inside her.', ' that wriggled and jiggled and tickled inside her.' ],
	[ 'bird',   'How absurd to swallow a bird!', '.' ],
	[ 'cat',    'Imagine that, to swallow a cat!', '.' ],
	[ 'dog',    'What a hog, to swallow a dog!', '.' ],
	[ 'goat',   'Just opened her throat and swallowed a goat!', '.' ],
	[ 'cow',    'I don\'t know how she swallowed a cow!', '.' ],
	[ 'horse',  'She\'s dead, of course!', '.' ]
];

export class Song {
	verse(n) {
		const lines = [
			FIRST_LINE.replace('{1}', LINES[n-1][0]),
			LINES[n-1][1]
		];

		if (n < LINES.length && n > 1) {
			for (let idx=n; --idx;) {
				let line = BETWEEN_LINE
					.replace('{1}', LINES[idx][0])    // animal
					.replace('{2}', LINES[idx-1][0]); // previous animal

				lines.push(line + LINES[idx-1][2]);
			}

			lines.push(LINES[0][1]);
		}

		return lines.join('\n') + '\n';
	}

	verses(start, end) {
		return Array(end - start + 1)
			.fill()
			.map((_, idx) => this.verse(start+idx))
			.join('\n') + '\n';
	}
}
