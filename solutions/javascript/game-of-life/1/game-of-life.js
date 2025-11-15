//
// This is only a SKELETON file for the 'Conway's Game of Life' exercise. It's been provided
// as a convenience to get you started writing code faster.
//

export class GameOfLife {
	#world

	constructor(world) {
		// assume NxM matrix
		this.#world = world;
	}

	tick() {
		// clone the world
		const w = this.#world;
		const stage = Array(w.length)
			.fill()
			.map(_ => Array(w[0].length).fill(0));

		// process world rules
		for (let rowIdx=stage.length; rowIdx--;) {
			for (let colIdx=stage[0].length; colIdx--;) {
				const isAlive = w[rowIdx][colIdx];
				const numLiveNeighbours = (
					~~(w[rowIdx-1]?.[colIdx-1])
					+ ~~(w[rowIdx-1]?.[colIdx+0])
					+ ~~(w[rowIdx-1]?.[colIdx+1])
					+ ~~(w[rowIdx+0]?.[colIdx-1])
					+ ~~(w[rowIdx+0]?.[colIdx+1])
					+ ~~(w[rowIdx+1]?.[colIdx-1])
					+ ~~(w[rowIdx+1]?.[colIdx+0])
					+ ~~(w[rowIdx+1]?.[colIdx+1])
				);
				if (isAlive) {
					stage[rowIdx][colIdx] = ~~(numLiveNeighbours === 2 || numLiveNeighbours === 3);
				}
				else {
					stage[rowIdx][colIdx] = ~~(numLiveNeighbours === 3);
				}
			}
		}

		this.#world = stage;
	}

	state() {
		return this.#world;
	}
}
