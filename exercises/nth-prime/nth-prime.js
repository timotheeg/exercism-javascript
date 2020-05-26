
// A few hardcoded known primes
// List will grow with calls
const PRIMES = [2, 3, 5, 7, 11, 13];

export const prime = (n) => {
	if (n <= 0) throw new Error('there is no zeroth prime');

	if (n <= PRIMES.length) {
		return PRIMES[n - 1];
	}

	let cur = PRIMES[PRIMES.length - 1];

	outer:
	do {
		cur += 2;

		const sqrt = Math.sqrt(cur);

		for (let idx = 0; PRIMES[idx] <= sqrt; idx++) {
			if (cur % PRIMES[idx] === 0) {
				continue outer;
			}
		}

		PRIMES.push(cur);
	}
	while(n > PRIMES.length);

	return PRIMES[n - 1];
}
