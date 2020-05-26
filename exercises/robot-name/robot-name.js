const CODE_A = 'A'.charCodeAt(0);
const CAPACITY = 26 * 26 * 1000;

export class Robot {
	constructor() {
		this.reset();
	}

	reset() {
		this._name = Robot.getNewName();
	}

	get name() {
		return this._name;
	}

	set name(value) {
		throw new Error('Not allowed');
	}
}

Robot.getNewName = () => {
	const arr = Robot.available_names;
	const len = arr.length;
	const rand_offset = Math.floor(Math.random() * len);

	let guarantor = len; // infinite loop protection

	do {
		const idx = (rand_offset + guarantor) % len
		let value = arr[idx];

		if (!value) continue;

		value -= 1; // account for the truthy shift

		const offset1 = value % 26;

		value = Math.floor((value - offset1) / 26);

		const offset2 = value % 26;
		const num = Math.floor((value - offset2) / 26);

		const letter1 = String.fromCharCode(CODE_A + offset1);
		const letter2 = String.fromCharCode(CODE_A + offset2);
		const tail = num.toString().padStart(3, '0');

		arr[idx] = 0; // id is now taken

		return `${letter1}${letter2}${tail}`;
	}
	while(guarantor--);

	throw new Error('No available names');
};

Robot.available_names = new Int32Array(CAPACITY)

Robot.releaseNames = () => {
	Robot.available_names = Robot.available_names.map((v, idx) => idx + 1);
};

Robot.releaseNames();
