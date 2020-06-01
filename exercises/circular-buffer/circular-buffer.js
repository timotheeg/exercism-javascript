class CircularBuffer {
	constructor(n=0) {
		this.max_size = n;
		this.buffer = Array(n);
		this.clear();
	}

	write(entry) {
		if (entry == null) return;

		if (this.size >= this.max_size) {
			throw new BufferFullError();
		}

		this.buffer[this.write_cursor] = entry;
		this.write_cursor = this.write_cursor + 1 % this.max_size;
		this.size++;
	}

	read() {
		if (this.size <= 0) {
			throw new BufferEmptyError();
		}

		const entry = this.buffer[this.read_cursor];
		this.read_cursor = this.read_cursor + 1 % this.max_size;
		this.size--;

		return entry;
	}

	forceWrite(entry) {
		try {
			this.write(entry);
		}
		catch(err) {
			this.read();
			this.forceWrite(entry);
		}
	}

	clear() {
		this.size = 0;
		this.read_cursor = 0;
		this.write_cursor = 0;
	}
}

export default CircularBuffer;

export class BufferFullError extends Error {}
export class BufferEmptyError extends Error {}
