function toInt(n) {
	return parseInt(n, 10);
}

export class Series {
  constructor(input) {
  	this._digits = input.split('').map(toInt);
  }

  get digits() {
    return [ ...this._digits ];
  }

  slices(n) {
  	if (n > this._digits.length) {
  		throw new Error('Slice size is too big.');
  	}

  	const slices = [];

  	for (let idx=0; idx<=this._digits.length - n; idx++) {
  		slices.push(this._digits.slice(idx, idx+n));
  	}

  	return slices;
  }
}
