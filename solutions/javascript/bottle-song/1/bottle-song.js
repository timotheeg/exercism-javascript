const NUMBERS = [
  'No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
];

function getBottles(n, lower=false) {
  return n === 1
    ? `${lower ? NUMBERS[n].toLowerCase() : NUMBERS[n]} green bottle`
    : `${lower ? NUMBERS[n].toLowerCase() : NUMBERS[n]} green bottles`
}

function getVerse(n) {
  return [
    `${getBottles(n)} hanging on the wall,`,
    `${getBottles(n)} hanging on the wall,`,
    `And if one green bottle should accidentally fall,`,
    `There'll be ${getBottles(n-1, true)} hanging on the wall.`,
  ];
}

export const recite = (initialBottlesCount, takeDownCount) => {
  const verses = [];

  let curBottles = initialBottlesCount;

  while (takeDownCount--) {
    verses.push(getVerse(curBottles--))
    if (takeDownCount) verses.push('');
  }

  return verses.flat();
};
