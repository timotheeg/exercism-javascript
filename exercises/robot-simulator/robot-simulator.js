const BEARINGS = ['east', 'south', 'west', 'north'];
const MOVES = {
	east:  [ 1,  0],
	west:  [-1,  0],
	north: [ 0,  1],
	south: [ 0, -1],
};
const INSTRUCTIONS = {
	R: 'turnRight',
	L: 'turnLeft',
	A: 'advance',
};

export class InvalidInputError extends Error {}

export class Robot {
	orient(bearing) {
		if (!BEARINGS.includes(bearing)) {
			throw new InvalidInputError();
		}

		this.setBearingIndex(BEARINGS.indexOf(bearing));
	}

	get bearing() {
		return this._bearing;
	}

	get coordinates() {
		return this._coordinates;
	}

	setBearingIndex(idx) {
		this._bearing_idx = (idx + BEARINGS.length) % BEARINGS.length;
		this._bearing = BEARINGS[this._bearing_idx];
		this._move = MOVES[this._bearing];
	}

	turnRight() {
		this.setBearingIndex(this._bearing_idx + 1);
	}

	turnLeft() {
		this.setBearingIndex(this._bearing_idx - 1);
	}

	at(x, y) {
		this._coordinates = [x, y];
	}

	advance() {
		this.at(
			this._coordinates[0] + this._move[0],
			this._coordinates[1] + this._move[1]
		)
	}

	static instructions(sequence) {
		return sequence.split('').map(I => INSTRUCTIONS[I]);
	}

	place({x=0, y=0, direction='east'}) {
		this.at(x, y);
		this.orient(direction);
	}

	evaluate(sequence) {
		Robot.instructions(sequence).forEach(method => this[method]());
	}
}
