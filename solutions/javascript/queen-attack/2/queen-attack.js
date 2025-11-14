function isValidCoordinate(x) {
  return !isNaN(x) && x >= 0 && x < 8;
}

export class QueenAttack {
	constructor(data = {}) {
		let {white, black} = data;

		white ||= [7, 3]
		black ||= [0, 3]
      
		if (!isValidCoordinate(white[0])
            || !isValidCoordinate(white[1])
            || !isValidCoordinate(black[0])
            || !isValidCoordinate(black[1])
        ) {
			throw new Error('Queen must be placed on the board');
		}
      
		if (white[0] == black[0] && white[1] == black[1]) {
			throw new Error('Queens cannot share the same space');
		}

   		this.white = white;
		this.black = black;
    }

	toString() {
		const board = Array(8).fill().map(_ => Array(8).fill('_'));

		board[this.white[0]][this.white[1]] = 'W';
		board[this.black[0]][this.black[1]] = 'B';

		return board.map(row => row.join(' ')).join('\n');
	}

	get canAttack() {
		const dx = this.white[0] - this.black[0];
		const dy = this.white[1] - this.black[1];

		return dx == 0
			|| dy == 0
			|| Math.abs(dx) == Math.abs(dy);
	}
}
