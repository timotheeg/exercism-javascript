const ALIAS_RE = /^: ([^\s]+) (.+) ;$/;

const OPS = {
	'+': (n1, n2) => n1 + n2,
	'-': (n1, n2) => n1 - n2,
	'*': (n1, n2) => n1 * n2,
	'/': (n1, n2) => {
		if (n2 == 0) throw new Error('Division by zero');

		return Math.floor(n1 / n2);
	},
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export class Forth {
	constructor() {
		this._stack = [];
		this._aliases = new Map();
		this._alias_search = null;
	}

	addAlias(alias, actual) {
		this._aliases.set(alias, actual);
		this._alias_search = new RegExp(
			[...this._aliases.keys()].map(escapeRegExp).join('|'),
			'g'
		);
	}

	processAliases(input) {
		// One alias may not be replaced by another
		// because it would imply a dependency on replacement order
		// The following does a single pass replacement for all aliases
		return input.replace(
			this._alias_search,
			alias => this._aliases.get(alias)
		)
	}

	evaluate(input) {
		// input is an alias definition
		if (input[0] === ':') {
			const m = input.toLowerCase().match(ALIAS_RE);

			if (!m || !isNaN(parseInt(m[1]))) {
				throw new Error('Invalid definition');
			}

			this.addAlias(m[1], this.processAliases(m[2].trim()));

			return;
		}

		// input is an expression
		this
			.processAliases(input.trim().toLowerCase())
			.split(/\s+/)
			.forEach(token => {
				const n = parseInt(token);

				if (!isNaN(n)) {
					this._stack.push(n);
					return;
				}

				// token is an operator or function
				switch (token) {
					case '+':
					case '-':
					case '*':
					case '/': {
						this.assertStackSize(2);
						const n2 = this.pop();
						const n1 = this.pop();
						this._stack.push(OPS[token](n1, n2));
						break;
					}

					case 'swap': {
						this.assertStackSize(2);
						const n2 = this.pop();
						const n1 = this.pop();
						this._stack.push(n2, n1);
						break;
					}

					case 'drop': {
						this.assertStackSize(1);
						this.pop();
						break;
					}

					case 'over': {
						this.assertStackSize(2);
						this._stack.push(this.peek(1));
						break;
					}

					case 'dup': {
						this.assertStackSize(1);
						this._stack.push(this.peek());
						break;
					}

					default:
						throw new Error('Unknown command');
				}
			});
	}

	assertStackSize(n) {
    	if (this._stack.length >= n) return true;
    	if (this._stack.length === 1) throw new Error('Only one value on the stack');
    	throw new Error('Stack empty');
    }
	  
	peek(n = 0) {
		return this._stack[this._stack.length - 1 - n];
	}

	pop() {
		return this._stack.pop();
	}

	get stack() {
		return [...this._stack];
	}
}
