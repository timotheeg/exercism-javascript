const ALLERGENS = [
	'eggs',
	'peanuts',
	'shellfish',
	'strawberries',
	'tomatoes',
	'chocolate',
	'pollen',
	'cats'
];

const BITFIELDS = {};

ALLERGENS.forEach((allergen, idx) => {
	BITFIELDS[allergen] = 1 << idx;
});

export class Allergies {
  constructor(bitmap) {
    this.bitmap = bitmap;
  }

  list() {
  	return ALLERGENS.filter(this.allergicTo.bind(this));
  }

  allergicTo(allergen) {
  	return !!(this.bitmap & BITFIELDS[allergen]);
  }
}
