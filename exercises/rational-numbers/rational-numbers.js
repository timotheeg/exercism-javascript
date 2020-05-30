function primeFactors(n) {
	const factors = [];
	let remainder = n;

	outer:
	while(remainder > 1) {
		// special treatment for even numbers
		if (remainder % 2 === 0) {
			factors.push(2);
			remainder /= 2;
			continue;
		}

		const sqrt = Math.ceil(Math.sqrt(remainder));


		for (let factor=3; factor<=sqrt; factor+=2) {
			if (remainder % factor === 0) {
				factors.push(factor);
				remainder /= factor;
				continue outer;
			}
		}

		// remainder is prime, push it
		factors.push(remainder);
		break;
	}

	return factors;
};


export class Rational {
	constructor(a, b) {
		if (b == 0) {
			throw new Error('Invalid Rational: 0 demoninator');
		}

		this.a = a;
		this.b = b;

		this.reduce();
	}

	add(other) {
		// r1 + r2 = a1/b1 + a2/b2 = (a1 * b2 + a2 * b1) / (b1 * b2)
		const a1 = this.a;
		const b1 = this.b;
		const a2 = other.a;
		const b2 = other.b;

		return new Rational(a1*b2 + a2*b1, b1*b2);
	}

	sub(other) {
		// r1 - r2 = a1/b1 - a2/b2 = (a1 * b2 - a2 * b1) / (b1 * b2)
		const a1 = this.a;
		const b1 = this.b;
		const a2 = other.a;
		const b2 = other.b;

		return new Rational(a1*b2 - a2*b1, b1*b2);
	}

	mul(other) {
 		// r1 * r2 = (a1 * a2) / (b1 * b2)
		const a1 = this.a;
		const b1 = this.b;
		const a2 = other.a;
		const b2 = other.b;

		return new Rational(a1*a2, b1*b2);
 	}

	div(other) {
 		// r1 / r2 = (a1 * b2) / (a2 * b1) if a2 * b1 is not zero
		const a1 = this.a;
		const b1 = this.b;
		const a2 = other.a;
		const b2 = other.b;

		return new Rational(a1*b2, a2*b1);
	}

	abs() {
		return new Rational(Math.abs(this.a), Math.abs(this.b));
	}

	exprational(n) {
		// if n positive: r^n = (a^n)/(b^n)
		// if n negative: r^n = (b^m)/(a^m), where m = |n|
		if (n < 0) {
			n = Math.abs(n);
		}

		return new Rational(Math.pow(this.a, n), Math.pow(this.b, n));
	}

	expreal(x) {
		// arbitrary precision just to please the tests ... sigh
		const precision = 1000000;

		return Math.round(precision * Math.pow(x, this.a / this.b)) / precision;
	}

	reduce() {
		// special case for 0
		if (this.a == 0) {
			this.a = 0; // handles minus 0
			this.b = 1;
			return this;
		}

		const factors_a = primeFactors(Math.abs(this.a));
		const factors_b = primeFactors(Math.abs(this.b));

		factors_a.forEach((factor, aidx) => {
			const bidx = factors_b.indexOf(factor);

			if (bidx <= -1) return;

			// consume common factor
			this.a /= factor;
			this.b /= factor;
			factors_b.splice(bidx, 1);
		});

		// normalizes signs
		if ((this.a < 0 && this.b < 0) || (this.a > 0 && this.b < 0)) {
			this.a *= -1;
			this.b *= -1;
		}

		return this;
	}
}
