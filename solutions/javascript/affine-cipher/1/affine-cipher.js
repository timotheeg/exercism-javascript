const MODULO = 26;
const CODE_A = 'a'.charCodeAt(0);

function positiveModulo(n, m) {
  return ((n % m) + m) % m;
}

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return Math.abs(a);
}

function areCoprime(a, b) {
  return gcd(a, b) === 1;
}

function modInverse(a, m) {
  let m0 = m;
  let x0 = 0;
  let x1 = 1;

  if (m === 1) return 0;

  a = positiveModulo(a, m);

  while (a > 1) {
    const q = Math.floor(a / m);
    [a, m] = [m, a % m];
    [x1, x0] = [x0, x1 - q * x0];
  }

  if (x1 < 0) x1 += m0;
  return x1;
}

function conceal(c, {a, b}) {
  const code = c.charCodeAt(0) - CODE_A;
  const newCode = (a * code + b) % MODULO;

  return String.fromCharCode(CODE_A + newCode);
}

function reveal(c, {mmiA, b}) {
  const code = c.charCodeAt(0) - CODE_A;
  const newCode = positiveModulo(mmiA * (code - b), MODULO);

  return String.fromCharCode(CODE_A + newCode);
}

export const encode = (phrase, key) => {
  if (!areCoprime(key.a, MODULO)) {
    throw new Error('a and m must be coprime.');
  }

  const coded = phrase
    .toLowerCase()
    .replace(/[^a-z123]+/g, '')
    .split('')
    .map(c => /[123]/.test(c) ? c : conceal(c, key));

  const numGroups = Math.ceil(coded.length / 5);

  return Array(numGroups)
    .fill()
    .map((_, idx) => coded.slice(idx * 5, (idx + 1) * 5).join(''))
    .join(' ');
};

export const decode = (phrase, key) => {
  if (!areCoprime(key.a, MODULO)) {
    throw new Error('a and m must be coprime.');
  }
  
  const mmiA = modInverse(key.a, MODULO);
  const deciptionKey = {mmiA, b: key.b};
  
  return phrase
    .toLowerCase()
    .replace(/[^a-z123]+/g, '')
    .split('')
    .map(c => /[123]/.test(c) ? c : reveal(c, deciptionKey))
    .join('');
};
