export class Triangle {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  isTriangle() {
    return (this.a + this.b + this.c > 0
      && this.a + this.b >= this.c
      && this.a + this.c >= this.b
      && this.b + this.c >= this.a
    );
  }

  get isEquilateral() {
    return this.isTriangle() && this.a === this.b && this.a === this.c;
  }

  get isIsosceles() {
    return this.isTriangle() && (this.a === this.b || this.a === this.c || this.b === this.c);
  }

  get isScalene() {
    return this.isTriangle() && this.a != this.b && this.a != this.c && this.b != this.c;
  }
}
