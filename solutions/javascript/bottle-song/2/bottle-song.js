const NUMBERS = [
  'No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'
];

function getBottles(n, lower=false) {
  return `${lower ? NUMBERS[n].toLowerCase() : NUMBERS[n]} green bottle${n === 1 ? '' : 's'}`;
}

function getVerse(n) {
  return [
    `${getBottles(n)} hanging on the wall,`,
    `${getBottles(n)} hanging on the wall,`,
    `And if one green bottle should accidentally fall,`,
    `There'll be ${getBottles(n-1, true)} hanging on the wall.`,
  ];
}

export const recite = (currentBottlesCount, takeDownCount) => {
  const verses = [];

  while (takeDownCount--) {
    verses.push(getVerse(currentBottlesCount--))
    if (takeDownCount) verses.push('');
  }

  return verses.flat();
};