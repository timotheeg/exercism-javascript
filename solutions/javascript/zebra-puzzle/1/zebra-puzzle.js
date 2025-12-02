export class ZebraPuzzle {
  #solution
  
  constructor() {
    // We calculate the solution immediately upon instantiation
    this.#solution = this.solve();
  }

  waterDrinker() {
    return this.#solution.waterDrinker;
  }

  zebraOwner() {
    return this.#solution.zebraOwner;
  }

  solve() {
    const houses = [0, 1, 2, 3, 4];

    // TODO: Make a more efficient generator, where we only generate permutations
    // that are applicable to some specified constraint
    function* permutations(elements) {
      if (elements.length === 0) yield [];
      else {
        const [first, ...rest] = elements;
        for (const p of permutations(rest)) {
          for (let i = 0; i <= p.length; i++) {
            yield [...p.slice(0, i), first, ...p.slice(i)];
          }
        }
      }
    }

    const isRightOf = (h1, h2) => h1 === h2 + 1;
    const isNextTo = (h1, h2) => Math.abs(h1 - h2) === 1;

    // 1. NATIONALITIES
    for (const pNations of permutations(houses)) {
      const [Englishman, Spaniard, Ukrainian, Norwegian, Japanese] = pNations;

      // Rule 10: Norwegian lives in the first house.
      if (Norwegian !== 0) continue;

      // 2. COLORS
      for (const pColors of permutations(houses)) {
        const [Red, Green, Ivory, Yellow, Blue] = pColors;
        
        // Rule 1: Englishman lives in the red house.
        if (Englishman !== Red) continue;
        
        // Rule 6: Green is immediately right of Ivory.
        if (!isRightOf(Green, Ivory)) continue;
        
        // Rule 15: Norwegian lives next to blue house.
        if (!isNextTo(Norwegian, Blue)) continue;

        // 3. DRINKS
        for (const pDrinks of permutations(houses)) {
          const [Coffee, Tea, Milk, OrangeJuice, Water] = pDrinks;

          // Rule 4: Green house drinks coffee.
          if (Coffee !== Green) continue;

          // Rule 5: Ukrainian drinks tea.
          if (Ukrainian !== Tea) continue;

          // Rule 9: Milk is drunk in the middle house.
          if (Milk !== 2) continue;

          // 4. CIGARETTES
          for (const pSmokes of permutations(houses)) {
            const [OldGold, Kools, Chesterfields, LuckyStrike, Parliaments] = pSmokes;

            // Rule 8: Kools smoked in yellow house.
            if (Kools !== Yellow) continue;
            
            // Rule 13: Lucky Strike smoker drinks OJ.
            if (LuckyStrike !== OrangeJuice) continue;
            
            // Rule 14: Japanese smokes Parliaments.
            if (Japanese !== Parliaments) continue;

            // 5. PETS
            for (const pPets of permutations(houses)) {
              const [Dog, Snails, Fox, Horse, Zebra] = pPets;

              // Rule 2: Spaniard owns the dog.
              if (Spaniard !== Dog) continue;
              
              // Rule 7: Old Gold smoker owns snails.
              if (OldGold !== Snails) continue;

              // Rule 11: Chesterfields smoker next to man with Fox.
              if (!isNextTo(Chesterfields, Fox)) continue;
              
              // Rule 12: Kools smoker next to man with Horse.
              if (!isNextTo(Kools, Horse)) continue;

              // SOLUTION FOUND!
              // We now need to map the House Index back to the Nationality String
              
              const nationsMap = {
                [Englishman]: 'Englishman',
                [Spaniard]: 'Spaniard',
                [Ukrainian]: 'Ukrainian',
                [Norwegian]: 'Norwegian',
                [Japanese]: 'Japanese'
              };

              return {
                waterDrinker: nationsMap[Water],
                zebraOwner: nationsMap[Zebra]
              };
            }
          }
        }
      }
    }
  }
}