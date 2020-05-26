export class NucleotideCounts {
  static parse(seq) {
  	const map = { A:0, C:0, G:0, T:0 };

  	for (let idx=seq.length; idx--;) {
  		const letter = seq[idx];

  		if (!map.hasOwnProperty(letter)) {
  			throw new Error('Invalid nucleotide in strand');
  		}

  		map[letter]++;
  	}

  	return `${map.A} ${map.C} ${map.G} ${map.T}`;
  }
}
