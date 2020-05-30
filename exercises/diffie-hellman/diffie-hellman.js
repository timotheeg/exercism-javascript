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

  getPublicKeyFromPrivateKey(privateKey) {
  	if (privateKey <= 1) throw new Error('Invalid range');
  	if (privateKey >= this.p) throw new Error('Invalid modulus');

  	return Math.pow(this.g, privateKey) % this.p;
  }

  getSharedSecret(privateA, publicB) {
  	return Math.pow(publicB, privateA) % this.p;
  }
}
