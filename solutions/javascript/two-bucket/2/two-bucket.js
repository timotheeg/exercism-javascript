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
	#goal;
	#b1;
	#b2;
	#states;

	constructor(b1size, b2size, goal, start) {
		this.#goal = goal;

		this.#b1 = new Bucket(b1size, start === 'one' ? b1size : 0);
		this.#b2 = new Bucket(b2size, start !== 'one' ? b2size : 0);

		const initial_state = [this.#b1.content, this.#b2.content] // filling first buckets

		// we compute the solution immediately
		const past_states = [
			[this.#b1.content ? 0 : this.#b1.size, this.#b2.content ? 0 : this.#b2.size], // forbidden alternate state
			initial_state
		];

		// check if initial condition already meet the goal
		if (
			initial_state[0] === this.#goal
			|| initial_state[1] === this.#goal
		) {
			this.#states = past_states;
			return true;
		}

		// otherwise, compute oves and throw if unreachable
		if (!this.move(this.#b1, this.#b2, past_states)) {
			throw new Error('Unable to reach goal');
		}
	}

	solve() {
		return this; // -_-'
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
				tentative_state[0] === this.#goal
				|| tentative_state[1] === this.#goal
			) {
				this.#states = [...past_states, tentative_state];
				this.#b1 = b1;
				this.#b2 = b2;
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

	get moves() {
		return this.#states.length - 1; // -1 to ignore the forbidden alternative start state
	}

	get goalBucket() {
		return this.#b1.content === this.#goal ? 'one' : 'two';
	}

	get otherBucket() {
		return (this.#b1.content === this.#goal ? this.#b2 : this.#b1).content;
	}
}
