class TicTacToeBoard {
  constructor(board) {
    this.board = board.map(row => row.split(''));

    // assert board is correct
    const numX = this.numCells('X');
    const numO = this.numCells('O');

    if (numX > numO + 1) throw new Error('Wrong turn order: X went twice');
    if (numO > numX) throw new Error('Wrong turn order: O started');

    if (this.isWinner('X') && this.isWinner('O')) {
      throw new Error('Impossible board: game should have ended after the game was won');
    }
  }

  isWinner(marker) {
    return (
      this.isWinnerRow(marker, 0) ||
      this.isWinnerRow(marker, 1) ||
      this.isWinnerRow(marker, 2) ||
      this.isWinnerCol(marker, 0) ||
      this.isWinnerCol(marker, 1) ||
      this.isWinnerCol(marker, 2) ||
      this.isWinnerDiagonal1(marker) || 
      this.isWinnerDiagonal2(marker)
    )
  }

  isWinnerRow(marker, rowIndex) {
    return this.board[rowIndex].every(v => v === marker);
  }

  isWinnerCol(marker, colIndex) {
    return this.board[0][colIndex] === marker && this.board[1][colIndex] === marker && this.board[2][colIndex] === marker;
  }

  isWinnerDiagonal1(marker) {
    return [0, 1, 2].every(idx => this.board[idx][idx] === marker);
  }

  isWinnerDiagonal2(marker) {
    return this.board[0][2] === marker && this.board[1][1] === marker && this.board[2][0] === marker;
  }

  numCells(marker) {
    return this.board.reduce((acc, row) => {
      return acc + row.reduce((acc2, cell) => acc2 + ~~(cell === marker), 0)
    }, 0);
  }
  
  isDraw() {
    return !this.isWinner('X') && !this.isWinner('O') && this.numCells(' ') === 0;
  }
}

export const gamestate = (board) => {
  board = new TicTacToeBoard(board);
  
  if (board.isWinner('X')) return 'win';
  if (board.isWinner('O')) return 'win';
  if (board.isDraw()) return 'draw';
  return 'ongoing';
};
