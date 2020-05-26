export class Squares {
  constructor(n) {
    this.n = n;
  }

  get sumOfSquares() {
    const n = this.n;

    return (n * (n + 1) * (2*n + 1)) / 6;
  }

  get squareOfSum() {
    const sum = (this.n + 1) * this.n * 0.5;

    return sum * sum;
  }

  get difference() {
    return this.squareOfSum - this.sumOfSquares;
  }
}
