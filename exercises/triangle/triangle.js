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

  isEquilateral() {
    return this.isTriangle() && this.a === this.b && this.a === this.c;
  }

  isIsosceles() {
    return this.isTriangle() && (this.a === this.b || this.a === this.c || this.b === this.c);
  }

  isScalene() {
    return this.isTriangle() && this.a != this.b && this.a != this.c && this.b != this.c;
  }
}
