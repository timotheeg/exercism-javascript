const VOWEL_LIKE = /^([aeiou]|xr|yt)/
const CONSONANT_GROUP = /^(s?ch|s?qu|thr?|rh|[bcdfghjklmnpqrstvwxyz])(.*)$/

export class translator {
	static translate(phrase) {
		return phrase
			.split(' ')
			.map(translator.translateWord)
			.join(' ');
	}

	static translateWord(word) {
		if (VOWEL_LIKE.test(word)) {
			return `${word}ay`;
		}

		let m = word.match(CONSONANT_GROUP);

		if (m) {
			return `${m[2]}${m[1]}ay`;
		}
	}
}
