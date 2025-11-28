const FIGURES = ['_', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const FIGURE_VALUES = FIGURES.reduce((acc, figure, index) => {
	acc[figure] = BigInt(index);
	return acc;
}, {})
const BASE = BigInt(FIGURES.length);

let order_idx = 0n;
const orders = {
  CARD_1: order_idx++,
  CARD_2: order_idx++,
  CARD_3: order_idx++,
  CARD_4: order_idx++,
  CARD_5: order_idx++,
  PAIR_LOW: order_idx++,
  PAIR_HIGH: order_idx++,
  THREE_OF_A_KIND: order_idx++,
  STRAIGHT: order_idx++,
  FLUSH: order_idx++,
  FULL_HOUSE_PAIR: order_idx++,
  FULL_HOUSE_THREE: order_idx++,
  FOUR_OF_A_KIND: order_idx++,
  STRAIGHT_FLUSH: order_idx++,
};

class Card {
  constructor(card_str) {
    const m = card_str.match(/^([2-9]|10|[JQKA])([HDCS])$/);

    if (!m) throw new Error(`Unexpected card string: ${card_str}`);

    this.suit = m[2];
    this.figure = m[1];

	this.value = FIGURE_VALUES[this.figure];
  }
}

function getCard(token) {
  return new Card(token);
}

// sort comparators that can handle bigInts
function byValueAsc(a, b) {
	if (a.value < b.value) return -1;
	if (a.value > b.value) return 1;
	return 0
}
function byValueDesc(a, b) {
	if (a.value > b.value) return -1;
	if (a.value < b.value) return 1;
	return 0
}

class Hand {
  constructor(hand_str) {
    this.hand_str = hand_str;
    this.value = 0n; // value of hand is initially 0, points will be added as wining patterns are discovered

    const cards = hand_str.split(" ").map(getCard).sort(byValueAsc); // sort cards by value

    const suits = new Map();
    const values = new Map();

    let straight = true; // straight until proven otherwise
    let last_card;

    cards.forEach((card, idx) => {
      this.value += card.value * BASE ** BigInt(idx); // firstly, each card has a value

      if (last_card) {
        if (card.value - last_card.value !== 1n) {
          straight = false;
        }
      }

      last_card = card;

      suits.set(card.suit, (suits.get(card.suit) || 0) + 1);
      values.set(card.value, (values.get(card.value) || 0) + 1);
    });

    const flush = suits.size === 1;

    // check for low straight, where Ace is the low card
    if (!straight) {
      if (
        cards[4].value === 13n &&
        cards[0].value === 1n &&
        cards[1].value === 2n &&
        cards[2].value === 3n &&
        cards[3].value === 4n
      ) {
        const ace = cards.pop();
        ace.value = 0n; // represents a 1, which has no value,
        cards.unshift(ace);
        straight = true;
      }
    }

    // Step 2, compute value of hand
    // value is derived as a base-14 13-order magnitude system to assign a unique score to a hand

    if (values.size === 2) {
      // either 4 of a kind, or full house!
      for (const [value, occurrences] of values.entries()) {
        if (occurrences === 4) {
          // FOUR_OF_A_KIND;
          this.value += value * BASE ** orders.FOUR_OF_A_KIND;
          break;
        } else if (occurrences === 3) {
          // FULL_HOUSE_THREE
          this.value += value * BASE ** orders.FULL_HOUSE_THREE;
        } else if (occurrences === 2) {
          // FULL_HOUSE_PAIR
          this.value += value * BASE ** orders.FULL_HOUSE_PAIR;
        }
      }
    } else if (values.size === 3) {
      // either 3 of a kind, or 2 pairs
      const pairs = [];
      for (const [value, occurrences] of values.entries()) {
        if (occurrences === 3) {
          // THREE_OF_A_KIND
          this.value += value * BASE ** orders.THREE_OF_A_KIND;
          break;
        } else if (occurrences === 2) {
          pairs.push(value);
        }
      }
      if (pairs.length) {
        // 2 PAIRS
        if (pairs[0] > pairs[1]) pairs.reverse();
        this.value += pairs[0] * BASE ** orders.PAIR_LOW;
        this.value += pairs[1] * BASE ** orders.PAIR_HIGH;
      }
    } else if (values.size === 4) {
      // single pair
      for (const [value, occurrences] of values.entries()) {
        if (occurrences === 2) {
          this.value += value * BASE ** orders.PAIR_LOW;
          break;
        }
      }
    } else {
      // 5 different cards, either straight, flush, straight-flush, or nothing!
      if (straight) {
        if (flush) {
          // STRAIGHT_FLUSH
          this.value += cards[4].value * BASE ** orders.STRAIGHT_FLUSH;
        } else {
          // STRAIGHT
          this.value += cards[4].value * BASE ** orders.STRAIGHT;
        }
      } else if (flush) {
        // FLUSH
        this.value += BASE ** orders.FLUSH;
      }
    }
  }

  toString() {
    return `${this.hand_str}: ${this.value}`;
  }
}

export const bestHands = (hands) => {
  hands = hands.map((cards_str) => new Hand(cards_str));

  const sortedHands = hands.sort(byValueDesc);
  const bestValue = sortedHands[0].value;

  return sortedHands
    .filter((hand) => hand.value === bestValue)
    .map((hand) => hand.hand_str);
};
