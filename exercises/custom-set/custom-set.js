export class CustomSet {
	constructor(entries) {
		this._store = new Set(entries);
	}

	empty() {
		return this._store.size <= 0;
	}

	contains(entry) {
		return this._store.has(entry);
	}

	add(entry) {
		this._store.add(entry);
		return this;
	}

	subset(other_set) {
		return this.difference(other_set).empty();
	}

	disjoint(other_set) {
		return this.intersection(other_set).empty();
	}

	eql(other_set) {
		return this.subset(other_set) && other_set.subset(this);
	}

	union(other_set) {
		return new CustomSet([
			...this._store,
			...other_set._store
		]);
	}

	intersection(other_set) {
		const entries = [];

		for (let entry of this._store) {
			if (other_set.contains(entry)) {
				entries.push(entry);
			}
		}

		return new CustomSet(entries);
	}

	difference(other_set) {
		const entries = [];

		for (let entry of this._store) {
			if (!other_set.contains(entry)) {
				entries.push(entry);
			}
		}

		return new CustomSet(entries);
	}
}
