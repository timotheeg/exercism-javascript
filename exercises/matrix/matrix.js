function toInt(v) {
	return parseInt(v, 10);
}

export class Matrix {
  constructor(conf) {
    this.data = conf.split('\n').map(row => row.split(' ').map(toInt));
  }

  get rows() {
    return this.data;
  }

  get columns() {
    const colums = this.data[0].map(v => [v]);

    for (let ridx = 1; ridx < this.data.length; ridx++) {
    	this.data[ridx].forEach((v, cidx) => colums[cidx].push(v));
    }

    return colums
  }
}
