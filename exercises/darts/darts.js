// [distance squared, points-till-next-distance]
const POINTS = [
	[10,  0],
	[ 5,  1],
	[ 1,  5]
].map(([d, p]) => [d*d, p]);

export const score = (x, y) => {
	const achieved = x*x + y*y;

	for (const [radius, points] of POINTS) {
		if (achieved > radius) {
			return points;
		}
	}

	return 10; // bull's eye!
};
