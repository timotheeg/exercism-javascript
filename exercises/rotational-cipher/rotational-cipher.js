const CODE_a = 'a'.charCodeAt(0);
const LOWERCASE_RE = /^[a-z]$/;
const CODE_A = 'A'.charCodeAt(0);
const UPPERCASE_RE = /^[A-Z]$/;


export class RotationalCipher {
  static rotate(input, offset) {
  	return input
  		.split('')
  		.map(c => {
  			let base_code;

  			if (LOWERCASE_RE.test(c)) {
  				base_code = CODE_a;
  			}
  			else if (UPPERCASE_RE.test(c)) {
  				base_code = CODE_A;
  			}
  			else {
  				return c;
  			}

  			const code = c.charCodeAt(0) - base_code;

  			return String.fromCharCode(base_code + ((code + offset) % 26));
  		})
  		.join('');
  }
}
