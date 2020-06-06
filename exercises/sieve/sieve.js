export const primes = (n) => {
	// compute list of primes up to n,
	// using the Sieve of Eratosthenes
	// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

	if (n < 2) return [];

	const list = Array(n).fill().map((_, idx) => idx + 1);

	function getFirstNonNullAfter(idx) {
		do {
			if (list[idx++]) return idx;
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
		const prime = getFirstNonNullAfter(walk);

		clearMultiplesOf(prime);

		walk = prime;
	}

	return list.filter(_ => _).slice(1);
};
