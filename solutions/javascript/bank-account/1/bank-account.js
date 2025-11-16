//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class BankAccount {
  #opened = false;
  #balance = 0;
  
  constructor() {
  }

  open() {
    if (this.#opened) throw new ValueError();
    this.#balance = 0;
    this.#opened = true;
  }

  close() {
    this.#assertOpened();
    this.#opened = false;
  }

  deposit(amount) {
    this.#assertOpened();
    this.#assertPositiveAmount(amount);
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#assertOpened();
    this.#assertPositiveAmount(amount);
    if (amount > this.#balance) throw new ValueError();
    this.#balance -= amount;
  }

  get balance() {
    this.#assertOpened();
    return this.#balance;
  }

  #assertOpened() {
    if (!this.#opened) {
      throw new ValueError();
    }
  }

  #assertPositiveAmount(amount) {
    if (amount <= 0) {
      throw new ValueError();
    }
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
