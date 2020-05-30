export class QueenAttack {
	constructor({ white = [0, 3], black = [7, 3] } = {}) {
		this.white = white;
		this.black = black;

		if (white[0] == black[0] && white[1] == black[1]) {
			throw new Error('Queens cannot share the same space');
		}
	}

	toString() {
		const board = Array(8).fill().map(_ => Array(8).fill('_'));

		board[this.white[0]][this.white[1]] = 'W';
		board[this.black[0]][this.black[1]] = 'B';

		return board.map(row => row.join(' ') + '\n').join('');
	}

	canAttack() {
		const dx = this.white[0] - this.black[0];
		const dy = this.white[1] - this.black[1];

		return dx == 0
			|| dy == 0
			|| Math.abs(dx) == Math.abs(dy);
	}
}
