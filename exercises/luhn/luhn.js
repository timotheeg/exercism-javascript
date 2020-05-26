function toInt(n) {
	return parseInt(n);
}

export const valid = (num) => {
	if (/[^\d ]/.test(num)) return false;

	const digits = num.replace(/ +/g, '').split('').map(toInt).reverse();

	if (digits.length <= 1) return false;

	for (let idx=1; idx<digits.length; idx+=2) {
		let d = digits[idx];
		digits[idx] = d < 5 ? d*2 : d*2 - 9;
	}

	const sum = digits.reduce((acc, v) => acc + v, 0);

	return (sum % 10) === 0;
};
