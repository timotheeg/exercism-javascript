const PROTEINS = {
	'Methionine':    ['AUG'],
	'Phenylalanine': ['UUU', 'UUC'],
	'Leucine':       ['UUA', 'UUG'],
	'Serine':        ['UCU', 'UCC', 'UCA', 'UCG'],
	'Tyrosine':      ['UAU', 'UAC'],
	'Cysteine':      ['UGU', 'UGC'],
	'Tryptophan':    ['UGG'],
	'STOP':          ['UAA', 'UAG', 'UGA']
}

const CODONS = new Map();

for (const [protein, seqs] of Object.entries(PROTEINS)) {
	seqs.forEach(codon => {
		CODONS.set(codon, protein);
	});
}

export const translate = (seq) => {
	if (!seq) return [];

	const res = [];

	for (let idx = 0; idx < seq.length; idx += 3) {
		const codon = seq.slice(idx, idx+3);

		const protein = CODONS.get(codon);

		if (!protein) throw new Error('Invalid codon');
		if (protein === 'STOP') break;

		res.push(protein);
	}

	return res;
};
