const CODE_a = 'a'.charCodeAt(0);

export class Cipher {
  constructor(key='abcdefghijklmnopqrstuvwxyz') {
    this._plain_key = key;
    this._key = key.split('').map(c => c.charCodeAt(0) - CODE_a);
  }

  encode(plain) {
    let encoded = '';

    for (let idx=0; idx<plain.length; idx++) {
      let code = plain.charCodeAt(idx) - CODE_a;
      let offset = this._key[idx % this._key.length];

      encoded += String.fromCharCode(CODE_a + (code + offset) % 26);
    }

    return encoded;
  }

  decode(encoded) {
    let plain = '';

    for (let idx=0; idx<encoded.length; idx++) {
      let code = encoded.charCodeAt(idx) - CODE_a;
      let offset = this._key[idx % this._key.length];

      plain += String.fromCharCode(CODE_a + (26 + code - offset) % 26);
    }

    return plain;
  }

  get key() {
    return this._plain_key;
  }
}
