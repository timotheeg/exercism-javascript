const CODE_A = 'A'.charCodeAt(0);
const FULL_SCALE = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const USE_FLAT = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'D', 'd', 'g', 'c', 'f', 'bb', 'eb']);
const STEPS = {m: 1, M: 2, A: 3};

export class Scale {
	constructor(tonic) {
		this.tonic = tonic;
		this.L = tonic[0].toUpperCase();
		this.use_flat = USE_FLAT.has(this.tonic);

		// record sharp-normalized note now
		if (tonic[1] === 'b') {
			const code = CODE_A + ((this.L.charCodeAt(0) - CODE_A + 7 - 1) % 7);
			this.note = `${String.fromCharCode(code)}#`;
		}
		else {
			this.note = tonic.toUpperCase();
		}
	}

	chromatic(id) {
		return this.interval('mmmmmmmmmmmm');
	}

	interval(intervals) {
		const len = FULL_SCALE.length;
		const res = [];

		let scale_idx = FULL_SCALE.indexOf(this.note);
		let step_idx = 0;

		do {
			const note = FULL_SCALE[scale_idx];

			if (note.length == 1) {
				res.push(note);
			}
			else {
				if (this.use_flat) {
					res.push(`${FULL_SCALE[(scale_idx + 1) % len][0]}b`)
				}
				else {
					res.push(note);
				}
			}

			scale_idx = (scale_idx + STEPS[intervals[step_idx]]) % len;
		}
		while(++step_idx < intervals.length);

		return res;
	}
}
