const COLORS = [
	'black',
	'brown',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'violet',
	'grey',
	'white'
];

export const decodedValue = ([col1, col2]) => {
	return COLORS.indexOf(col1) * 10 + COLORS.indexOf(col2);
};
