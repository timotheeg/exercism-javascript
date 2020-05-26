const map = {
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U'
};

export const toRna = input => input.split('').map(letter => map[letter]).join('');
