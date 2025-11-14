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
    if (this._digits.length === 0) {
      throw new Error('series cannot be empty')
    }
    
    if (n === 0) {
      throw new Error('slice length cannot be zero');
    }
    
    if (n < 0) {
      throw new Error('slice length cannot be negative');
    }
    
  	if (n > this._digits.length) {
  		throw new Error('slice length cannot be greater than series length');
  	}

  	const slices = [];

  	for (let idx=0; idx<=this._digits.length - n; idx++) {
  		slices.push(this._digits.slice(idx, idx+n));
  	}

  	return slices;
  }
}
