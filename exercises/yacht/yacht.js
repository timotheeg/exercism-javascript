function by_num(a, b) {
	return a - b;
}

function valueCounts(dice) {
	return dice.reduce((acc, v) => {
		const count = acc.get(v);
		acc.set(v, (count || 0) + 1);
		return acc;
	}, new Map());
}

const SCORERS = {};

// dynamic methods
['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].forEach((method, idx) => {
	const num = idx + 1;

	SCORERS[method] = dice => num * dice.filter(v => v === num).length;
});

SCORERS['full house'] = dice => {
	let score = 0;

	for (let [value, count] of valueCounts(dice).entries()) {
		if (count === 2 || count === 3) {
			score += value * count;
			continue;
		}

		return 0;
	}

	return score;
};

SCORERS['four of a kind'] = dice => {
	for (let [value, count] of valueCounts(dice).entries()) {
		if (count === 5 || count == 4) return value * 4;
	}

	return 0;
};

SCORERS['yacht'] = dice => {
	for (let count of valueCounts(dice).values()) {
		if (count === 5) return 50;

		return 0;
	}
};

SCORERS['little straight'] = dice => {
	return SCORERS['big straight'](dice, 1);
}

SCORERS['big straight'] = (dice, first=2) => {
	dice.sort(by_num);

	if (dice[0] !== first) return 0;

	for (let idx=dice.length; idx-- > 1; ) {
		if (dice[idx] - dice[idx-1] != 1) return 0;
	}

	return 30;
}

SCORERS['choice'] = dice => {
	return dice.reduce((sum, v) => sum + v, 0);
}

export const score = (dice, category) => {
	return SCORERS[category](dice);
};
