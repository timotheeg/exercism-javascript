export const abilityModifier = (n) => {
	if (n < 3) throw new Error('Ability scores must be at least 3');
	if (n > 18) throw new Error('Ability scores can be at most 18');

	return Math.floor((n - 10) / 2);
};


export class Character {
	constructor() {
		this._strength = Character.rollAbility();
		this._dexterity = Character.rollAbility();
		this._constitution = Character.rollAbility();
		this._intelligence = Character.rollAbility();
		this._wisdom = Character.rollAbility();
		this._charisma = Character.rollAbility();

		this._const_modifier = abilityModifier(this._constitution);
		this._hitpoints = 10 + this._const_modifier;
	}

	static rollAbility() {
		return Array(4)
			.fill(0)
			.map(_ => 1 + Math.floor(Math.random() * 6))
			.sort((a, b) => b - a)
			.slice(0, 3)
			.reduce((sum, val) => sum + val, 0);
	}

	get strength() {
		return this._strength;
	}

	get dexterity() {
		return this._dexterity;
	}

	get constitution() {
		return this._constitution;
	}

	get intelligence() {
		return this._intelligence;
	}

	get wisdom() {
		return this._wisdom;
	}

	get charisma() {
		return this._charisma;
	}

	get hitpoints() {
		return this._hitpoints;
	}
}
