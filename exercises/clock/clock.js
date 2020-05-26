const DAY_IN_MINS = 24 * 60;

export class Clock {
  constructor(hours=0, minutes=0) {
    this.ts = hours * 60 + minutes;
    this.normalize();
  }

  normalize() {
    this.ts = this.ts % DAY_IN_MINS;

    if (this.ts < 0) {
      this.ts += DAY_IN_MINS;
    }
  }

  toString() {
    const hours = Math.floor(this.ts / 60);
    const minutes = this.ts % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  plus(minutes) {
    this.ts += minutes;
    this.normalize();
    return this;
  }

  minus(minutes) {
    return this.plus(-minutes);
  }

  equals(clock) {
    return this.ts == clock.ts;
  }
}
