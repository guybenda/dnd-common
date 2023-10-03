export enum Advantage {
	Advantage = "advantage",
	Disadvantage = "disadvantage",
}

export enum StandardDice {
	d4 = 4,
	d6 = 6,
	d8 = 8,
	d10 = 10,
	d12 = 12,
	d20 = 20,
	d100 = 100,
}

export interface IDie {
	ammount: number;
	sides: number;
	modifier: number;
	chooseCount: number;
	rollCount: number;
	chooseTop: boolean;
	roll(): IDieResult;
}

export interface IDieResult {
	rolls: number[];
	total: number;
	die: IDie;
}

export interface IDiceExpression {
	dice: IDie[];
	roll(): IDiceExpressionResult;
	add(die: IDie): this;
}

export interface IDiceExpressionResult {
	results: IDieResult[];
	total: number;
	dice: IDiceExpression;
}

export class Die implements IDie {
	ammount: number = 1;
	sides: number = 6;
	modifier: number = 0;
	chooseCount: number = 1;
	rollCount: number = 1;
	chooseTop: boolean = false;

	constructor(die: Partial<IDie>) {
		const { ammount, sides, modifier, chooseCount, rollCount, chooseTop } = die;
		this.ammount = ammount || this.ammount;
		this.sides = sides || this.sides;
		this.modifier = modifier || this.modifier;
		this.chooseCount = chooseCount || this.chooseCount;
		this.rollCount = rollCount || this.rollCount;
		this.chooseTop = chooseTop || this.chooseTop;
	}

	static fromString(dieString: string): Die | null {
		const parts = dieString.split("/([+-])/g");
		const dice = parts[0];
		const modifier = parts[1];

		const diceParts = dice.split("d");
		const ammount = diceParts[0];
		const sides = diceParts[1];

		// create the die

		//TODO
		return null;
	}

	static fromStandardDie(
		die: StandardDice,
		count: number = 1,
		adv?: Advantage,
		modifier: number = 0
	): Die {
		return new Die({
			ammount: count,
			sides: die,
			modifier,
			rollCount: adv ? 2 : 1,
			chooseTop: adv === Advantage.Advantage,
			chooseCount: 1,
		});
	}

	roll(): IDieResult {
		let result = 0;
		const rolls: number[] = [];

		for (let i = 0; i < this.rollCount; i++) {
			const roll = Math.floor(Math.random() * this.sides) + 1;
			rolls.push(roll);
		}

		const sorted = rolls.toSorted((a, b) => (this.chooseTop ? b - a : a - b));

		for (let i = 0; i < this.chooseCount; i++) {
			result += sorted[i];
		}

		return {
			total: result + this.modifier,
			rolls,
			die: this,
		};
	}
}

export class DiceExpression implements IDiceExpression {
	dice: IDie[];

	constructor(...dice: IDie[]) {
		this.dice = dice;
	}

	roll(): IDiceExpressionResult {
		const results: IDieResult[] = [];
		let total = 0;

		for (const die of this.dice) {
			const result = die.roll();
			results.push(result);
			total += result.total;
		}

		return {
			results,
			total,
			dice: this,
		};
	}

	add(die: IDie): this {
		this.dice.push(die);
		return this;
	}
}
