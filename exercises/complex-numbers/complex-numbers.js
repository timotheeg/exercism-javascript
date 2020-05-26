export class ComplexNumber {
  constructor(real, imag) {
    this.r = real;
    this.i = imag;

    // fixes issue with -0
    // see https://stackoverflow.com/a/53135516/361295
    if (this.r == 0) this.r = 0;
    if (this.i == 0) this.i = 0;
  }

  get real() {
    return this.r;
  }

  get imag() {
    return this.i;
  }

  add(cpx) {
    // (a + i * b) + (c + i * d) = (a + c) + (b + d) * i
    return new ComplexNumber(this.r + cpx.r, this.i + cpx.i);
  }

  sub(cpx) {
    // (a + i * b) - (c + i * d) = (a - c) + (b - d) * i
    return new ComplexNumber(this.r - cpx.r, this.i - cpx.i);
  }

  recip() {
    // 1 / (a + i * b) = a/(a^2 + b^2) - b/(a^2 + b^2) * i
    const a = this.r;
    const b = this.i;

    const a2b2 = a*a + b*b;

    return new ComplexNumber(a / a2b2, -b / a2b2);
  }

  mul(cpx) {
    // (a + i * b) * (c + i * d) = (a * c - b * d) + (b * c + a * d) * i
    const a = this.r;
    const b = this.i;
    const c = cpx.r;
    const d = cpx.i;

    return new ComplexNumber(a*c - b*d, b*c + a*d);
  }

  div(cpx) {
    // (a + i * b) / (c + i * d) = (a * c + b * d)/(c^2 + d^2) + (b * c - a * d)/(c^2 + d^2) * i
    const a = this.r;
    const b = this.i;
    const c = cpx.r;
    const d = cpx.i;

    const c2d2 = c*c + d*d

    return new ComplexNumber((a*c + b*d) / c2d2, (b*c - a*d) / c2d2);
  }

  get abs() {
    // a + b * i => sqrt(a^2 + b^2)
    const a = this.r;
    const b = this.i;

    return Math.sqrt(a*a + b*b);
  }

  get conj() {
    // a + b * i => a - b * i

    return new ComplexNumber(this.r, -this.i);
  }

  get exp() {
    // e^(a + i * b) = e^a * e^(i * b) = e^a * (cos(b) + i * sin(b))
    const a = this.r;
    const b = this.i;

    const ea = Math.exp(a);
    const cosb = Math.cos(b)
    const sinb = Math.sin(b)

    return new ComplexNumber(ea * cosb, ea * sinb);
  }
}
