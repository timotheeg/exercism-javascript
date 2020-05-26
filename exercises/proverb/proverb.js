function peek(arr) {
	return arr[arr.length - 1];
}

export const proverb = (...terms) => {
	let res = '';
	let qualifier;

	if (peek(terms).qualifier) {
		qualifier = terms.pop().qualifier;
	}

	for (let idx=0; idx<terms.length-1; idx++) {
		res += `For want of a ${terms[idx]} the ${terms[idx+1]} was lost.\n`;
	}

	res += `And all for the want of a ${qualifier ? `${qualifier} ` : ''}${terms[0]}.`;

	return res;
};
