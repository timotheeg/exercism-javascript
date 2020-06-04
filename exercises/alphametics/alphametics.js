const LETTER_RE = /[A-Z]/g;
const WORD_RE = /[A-Z]+/g;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function check_correctness(words, letter_values) {
	const adders = words.slice(0, -1);
	const sum_word = words.slice(-1)[0];

	let carry = 0;

	for (let cidx=sum_word.length; cidx--;) {
		const sum = carry + adders
			.map(word => word[cidx])
			.reduce((sum, l) => sum + (letter_values[l] || 0), 0);

		if (sum % 10 !== letter_values[sum_word[cidx]]) {
			return false;
		}

		carry = Math.floor(sum / 10);
	}

	return true;
}

function solve_brute_force(words, letter_values, available_digits) {
	const available_letters = [...Object.entries(letter_values)]
		.filter(pair => pair[1] === null)
		.map(pair => pair[0]);

	if (available_letters.length === 0) {
		return check_correctness(words, letter_values);
	}
	else {
		// we handle one letter, and keep going recursively
		const letter = available_letters[0];
		const remaining_digits = new Set(available_digits);

		for (let digit of available_digits) {
			// set tentative mapping of letter to digit
			letter_values[letter] = digit;
			remaining_digits.delete(digit);

			const res = solve_brute_force(
				words,
				letter_values,
				remaining_digits
			);

			if (res) return true;

			// tentative mapping was incorrect, restore data structures to unknown
			letter_values[letter] = null;
			remaining_digits.add(digit);
		}

		return false;
	}
}

export const solve = (puzzle) => {
	let words = puzzle.match(WORD_RE);
	const sum_word = words.slice(-1)[0];
	const input_len = words.slice(0, -1).reduce((acc, w) => Math.max(acc, w.length), 0);
	const sum_len = sum_word.length;

	if (input_len > sum_len) {
		// leading zero - go away!
		return null;
	}

	const available_digits = new Set(DIGITS);
	const letter_values = puzzle
		.match(LETTER_RE)
		.reduce((m, l) => ((m[l] = null), m), {});

	if (sum_len > input_len) {
		// if sum is longer than inputs, first digit is a one
		letter_values[sum_word[0]] = 1;
		available_digits.delete(1);
	}

	words = words.map(word => word.padStart(sum_len, '_')); // make a uniform matrix

	// function modifies letter_values as side effect
	return solve_brute_force(words, letter_values, available_digits)
		? letter_values
		: null;
};
