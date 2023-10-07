export enum Advantage {
	Advantage = "advantage",
	Disadvantage = "disadvantage",
}

export enum D {
	d4 = 4,
	d6 = 6,
	d8 = 8,
	d10 = 10,
	d12 = 12,
	d20 = 20,
	d100 = 100,
}

export interface IDie {
	count: number;
	sides: number;
	modifier: number;
	advantage?: Advantage;
}

export interface IDieResult extends IDie {
	rolls: number[];
	total: number;
}

export interface IDice {
	dice: IDie[];
}

export interface IDiceResult extends IDice {
	results: IDieResult[];
	total: number;
}

export class Die implements IDie {
	count: number = 1;
	sides: number = 6;
	modifier: number = 0;
	advantage?: Advantage;

	constructor(die: Partial<IDie>) {
		const { advantage, count: count, modifier, sides } = die;
		this.count = count || this.count;
		this.sides = sides || this.sides;
		this.modifier = modifier || this.modifier;
		this.advantage = advantage;
	}

	// static fromString(dieString: string): Die | null {
	// 	const parts = dieString.split("/([+-])/g");
	// 	const dice = parts[0];
	// 	const modifier = parts[1];

	// 	const diceParts = dice.split("d");
	// 	const ammount = diceParts[0];
	// 	const sides = diceParts[1];

	// 	// create the die

	// 	//TODO
	// 	return null;
	// }

	static d(
		die: D,
		count: number = 1,
		adv?: Advantage,
		modifier: number = 0
	): Die {
		return new Die({
			count,
			sides: die,
			advantage: adv,
			modifier,
		});
	}

	roll(): IDieResult {
		let result = 0;
		const rolls: number[] = [];

		for (let i = 0; i < this.count; i++) {
			if (this.advantage) {
				const res1 = Math.floor(Math.random() * this.sides) + 1;
				const res2 = Math.floor(Math.random() * this.sides) + 1;

				rolls.push(res1, res2);
				result +=
					this.advantage === Advantage.Advantage
						? Math.max(res1, res2)
						: Math.min(res1, res2);
			} else {
				const res = Math.floor(Math.random() * this.sides) + 1;

				rolls.push(res);
				result += res;
			}
		}

		return {
			...this,
			rolls,
			total: result + this.modifier,
		};
	}
}

export class Dice implements IDice {
	dice: Die[];
	noder: number;

	constructor(diceExp: IDice) {
		this.dice = diceExp.dice.map(die => new Die(die));
	}

	roll(): IDiceResult {
		const results: IDieResult[] = [];
		let total = 0;

		for (const die of this.dice) {
			const result = die.roll();
			results.push(result);
			total += result.total;
		}

		return {
			...this,
			results,
			total,
		};
	}

	add(die: Die): this {
		this.dice.push(die);
		return this;
	}
}

export type Roll = IDiceResult & {
	name: string;
	id: string;
};
