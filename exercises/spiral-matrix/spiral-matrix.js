export class SpiralMatrix {
	static ofSize(n=0) {
		const matrix = Array(n).fill().map(_ => Array(n).fill(0));

		const bounds = {l:-1, t:-1, r:n, b:n};
		const pos = [0, 0]; // (x, y)
		let shift = [1, 0]; // (dx, dy)

		for (let num=1; num<=n*n; num++) {
			matrix[pos[1]][pos[0]] = num;

			// tentatively check next position
			const tentative_next_x = pos[0] + shift[0];
			const tentative_next_y = pos[1] + shift[1];

			if (tentative_next_x >= bounds.r) {
				// right bound overflow, turn down
				shift = [0, 1];
				bounds.t++;
			}
			else if (tentative_next_y >= bounds.b) {
				// bottom bound overflow, turn left
				shift = [-1, 0];
				bounds.r--;
			}
			else if (tentative_next_x <= bounds.l) {
				// left bound overflow, turn up
				shift = [0, -1];
				bounds.b--;
			}
			else if (tentative_next_y <= bounds.t) {
				// top bound overflow, turn right
				shift = [1, 0];
				bounds.l++;
			}

			// commits the position update
			pos[0] += shift[0];
			pos[1] += shift[1];
		}

		return matrix;
	}
}
