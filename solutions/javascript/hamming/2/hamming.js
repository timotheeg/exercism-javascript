export const compute = (str1, str2) => {
	if (!str1 && !str2) {
		return 0;
	}
    
	if (str1.length != str2.length) {
		throw new Error('strands must be of equal length');
	}
	
	if (!str1) {
		throw new Error('left strand must not be empty');
	}
	
	if (!str2) {
		throw new Error('right strand must not be empty');
	}

	let distance = 0;

	for (let idx=str1.length; idx--;) {
		if (str1[idx] != str2[idx]) distance++;
	}

	return distance;
};
