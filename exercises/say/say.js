var TOKENS = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion'
};

var blocks = [
  1000000000,
  1000000,
  1000
];


// get english tokens for a number below 1000
function getNumTokens(n) {
	const res = [];

	if (n >= 100) {
		const hundreds = Math.floor(n / 100);
		res.push(TOKENS[hundreds], TOKENS[100]);
		n %= 100;
	}

	if (n >= 20) {
		const tens = Math.floor(n / 10) * 10;
		let token = TOKENS[tens];

		n -= tens;

		if (n > 0) {
			token += `-${TOKENS[n]}`;
		}

		res.push(token);
	}
	else if (n > 0) {
		// 1-19
		res.push(TOKENS[n]);
	}

	return res;
}


export class Say {
	inEnglish(n) {
		if (n < 0 || n > 999999999999) {
			throw new Error('Number must be between 0 and 999,999,999,999.');
		}

		if (n === 0) {
			return 'zero';
		}

		const res = [];

		blocks.forEach(limit => {
			if (n >= limit) {
				var above = Math.floor(n / limit);
				res.push(...getNumTokens(above), TOKENS[limit]);
				n %= limit;
			}
		});

		// lastly get amount below 1000
		res.push(...getNumTokens	(n));

		return res.join(' ');
	}
}
