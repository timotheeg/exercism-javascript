function isPrime(n) {
	if (n <= 1) return false;

	const sqrt = Math.sqrt(n);

	if (n % 2 == 0) return false;

	for (let factor = 3; factor <= sqrt; factor += 2) {
		if (n % factor === 0) return false;
	}

	return true;
}

export class DiffieHellman {
  constructor(p, g) {
  	if (p <= 1 || g <= 1) throw new Error('Invalid range');
  	if (!isPrime(p) || !isPrime(g)) throw new Error('Constructor needs 2 primes');

  	this.p = p;
  	this.g = g;
  }

  getPublicKey(privateKey) {
  	if (privateKey <= 1) throw new Error('Invalid range');
  	if (privateKey >= this.p) throw new Error('Invalid modulus');

  	return Math.pow(this.g, privateKey) % this.p;
  }

  getSecret(theirPublicKey, myPrivateKey) {
  	return Math.pow(theirPublicKey, myPrivateKey) % this.p;
  }

  static getPrivateKey(p) {
  	// returns an integer n with 2 ≤ n < p
  	const min = 2;
  	const max = p - 1;  	 // exclusive upper bound

  	const range = max - min;
  	const random = Math.floor(Math.random() * range) + min;

  	return random;
  }
}
