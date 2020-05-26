export const compute = (str1, str2) => {
	if (!str1 && !str2) {
		return 0;
	}
	else if (!str1) {
		throw new Error('left strand must not be empty');
	}
	else if (!str2) {
		throw new Error('right strand must not be empty');
	}
	else if (str1.length != str2.length) {
		throw new Error('left and right strands must be of equal length');
	}

	let distance = 0;

	for (let idx=str1.length; idx--;) {
		if (str1[idx] != str2[idx]) distance++;
	}

	return distance;
};
