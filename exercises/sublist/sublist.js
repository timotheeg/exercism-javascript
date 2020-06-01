export class List {
	constructor(entries=[]) {
		this.entries = entries;
	}

	static areArraysEquals(arr1, arr2) {
		return arr1.every((v, idx) => v === arr2[idx]);
	}

	isEqualTo(other) {
		if (this.entries.length != other.entries.length) return false;

		return List.areArraysEquals(this.entries, other.entries);
	}

	isSublistOf(other) {
		if (this.entries.length >= other.entries.length) return false;
		if (this.entries.length === 0) return true;

		const len = this.entries.length;

		for (let idx = other.entries.length - len + 1; idx--; ) {
			if (List.areArraysEquals(this.entries, other.entries.slice(idx, idx+len))) {
				return true;
			}
		}

		return false;
	}

	compare(other) {
		if (this.isEqualTo(other)) {
			return 'EQUAL';
		}
		else if (this.isSublistOf(other)) {
			return 'SUBLIST';
		}
		else if (other.isSublistOf(this)) {
			return 'SUPERLIST';
		}

		return 'UNEQUAL'
	}
}
