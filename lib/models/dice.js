export var Advantage;
(function (Advantage) {
    Advantage["Advantage"] = "advantage";
    Advantage["Disadvantage"] = "disadvantage";
})(Advantage || (Advantage = {}));
export var D;
(function (D) {
    D[D["d4"] = 4] = "d4";
    D[D["d6"] = 6] = "d6";
    D[D["d8"] = 8] = "d8";
    D[D["d10"] = 10] = "d10";
    D[D["d12"] = 12] = "d12";
    D[D["d20"] = 20] = "d20";
    D[D["d100"] = 100] = "d100";
})(D || (D = {}));
export class Die {
    count = 1;
    sides = 6;
    modifier = 0;
    advantage;
    constructor(die) {
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
    static d(die, count = 1, adv, modifier = 0) {
        return new Die({
            count,
            sides: die,
            advantage: adv,
            modifier,
        });
    }
    roll() {
        let result = 0;
        const rolls = [];
        for (let i = 0; i < this.count; i++) {
            if (this.advantage) {
                const res1 = Math.floor(Math.random() * this.sides) + 1;
                const res2 = Math.floor(Math.random() * this.sides) + 1;
                rolls.push(res1, res2);
                result +=
                    this.advantage === Advantage.Advantage
                        ? Math.max(res1, res2)
                        : Math.min(res1, res2);
            }
            else {
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
export class Dice {
    dice;
    constructor(diceExp) {
        this.dice = diceExp.dice.map(die => new Die(die));
    }
    roll() {
        const results = [];
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
    add(die) {
        this.dice.push(die);
        return this;
    }
}
