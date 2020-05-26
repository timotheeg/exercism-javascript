const EARTH_SPY = 31557600;

const factors = {
	'mercury': 0.2408467,
	'venus':   0.61519726,
	'earth':   1,
	'mars':    1.8808158,
	'jupiter': 11.862615,
	'saturn':  29.447498,
	'uranus':  84.016846,
	'neptune': 164.79132,
};

const SEC_PER_YEAR = {};

for (const [planet, factor] of Object.entries(factors)) {
	SEC_PER_YEAR[planet] = EARTH_SPY * factor;
}

export const age = (planet, sec) => {
	return Math.round(100 * sec / SEC_PER_YEAR[planet]) / 100;
}
