export class Triplet {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  sum() {
    return this.a + this.b + this.c;
  }

  product() {
    return this.a * this.b * this.c;
  }

  isPythagorean() {
    const a = this.a;
    const b = this.b;
    const c = this.c;

    return (a*a + b*b === c*c);
  }

  static where({minFactor=1, maxFactor=1, sum=0}) {
    const triplets = [];
    let c = 3; // a=1, b=2

    do {
      for ()


      c++;
    }
    while(true)

    // compute all possible triplets such that a < b < c

  }
}
