class Bucket {
	constructor(size, content) {
		this.size = size;
		this.content = content;
	}

	clone() {
		return new Bucket(this.size, this.content);
	}

	add(liters) {
		this.content = Math.min(this.size, this.content + liters);
	}

	remove(liters) {
		this.content = Math.max(0, this.content - liters);
	}

	fill() {
		this.content = this.size;
	}

	empty() {
		this.content = 0;
	}

	get available() {
		return this.size - this.content;
	}

	pourInto(other_bucket) {
		const amount = Math.min(this.content, other_bucket.available);

		this.remove(amount);
		other_bucket.add(amount);
	}
}

export class TwoBucket {
	constructor(b1size, b2size, goal, start) {
		this.goal = goal;

		const b1 = new Bucket(b1size, start === 'one' ? b1size : 0);
		const b2 = new Bucket(b2size, start !== 'one' ? b2size : 0);

		const past_states = [
			[b1.content ? 0 : b1.size, b2.content ? 0 : b2.size], // forbidden alternate state
			[b1.content, b2.content] // filling first buckets
		]

		// assume initial conditions are not a solved state
		// meaning there MUST be at least one move forward
		this.move(b1, b2, past_states);
	}

	// never go back to a past move
	static is_move_allowed(past_states, tentative_state) {
		return past_states.every(state => (
			state[0] !== tentative_state[0] || state[1] !== tentative_state[1]
		));
	}

	// recursive brute force
	move(ib1 ,ib2, past_states) {
		let b1, b2;

		const moves = [
			() => b1.fill(),
			() => b2.fill(),
			() => b1.empty(),
			() => b2.empty(),
			() => b1.pourInto(b2),
			() => b2.pourInto(b1)
		];

		for (let action of moves) {
			b1 = ib1.clone();
			b2 = ib2.clone();

			action();

			const tentative_state = [b1.content, b2.content]

			if (!TwoBucket.is_move_allowed(past_states, tentative_state)) {
				continue;
			}

			if (
				tentative_state[0] === this.goal
				|| tentative_state[1] === this.goal
			) {
				this._states = [...past_states, tentative_state];
				this.b1 = b1;
				this.b2 = b2;
				return true;
			}

			const next_move_res = this.move(
				b1, b2,
				[...past_states, tentative_state]
			)

			if (next_move_res) {
				return true;
			}
		}
	}

	moves() {
		return this._states.length - 1;
	}

	get goalBucket() {
		return this.b1.content === this.goal ? 'one' : 'two';
	}

	get otherBucket() {
		return this[this.b1.content === this.goal ? 'b2' : 'b1'].content;
	}
}
