export const primes = (n) => {
	// compute list of primes up to n,
	// using the Sieve of Eratosthenes
	// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

	const list = Array(n).fill().map((_, idx) => idx + 1);

	if (n < 2) return [];

	function getFirstNonNullAfter(idx) {
		do {
			if (list[idx++] !== null) return idx;
		}
		while(idx < list.length)
	}

	function clearMultiplesOf(n) {
		let multiplier = 2;

		while (n * multiplier <= list.length) {
			list[n * multiplier - 1] = null;
			multiplier++;
		}
	}

	let walk = 1;

	while (walk < list.length) {
		const base = getFirstNonNullAfter(walk);

		clearMultiplesOf(base);

		walk = base;
	}

	return list.filter(_ => _).slice(1);
};
