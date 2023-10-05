export var Advantage;
(function (Advantage) {
    Advantage["Advantage"] = "advantage";
    Advantage["Disadvantage"] = "disadvantage";
})(Advantage || (Advantage = {}));
export var StandardDice;
(function (StandardDice) {
    StandardDice[StandardDice["d4"] = 4] = "d4";
    StandardDice[StandardDice["d6"] = 6] = "d6";
    StandardDice[StandardDice["d8"] = 8] = "d8";
    StandardDice[StandardDice["d10"] = 10] = "d10";
    StandardDice[StandardDice["d12"] = 12] = "d12";
    StandardDice[StandardDice["d20"] = 20] = "d20";
    StandardDice[StandardDice["d100"] = 100] = "d100";
})(StandardDice || (StandardDice = {}));
export class Die {
    ammount = 1;
    sides = 6;
    modifier = 0;
    chooseCount = 1;
    rollCount = 1;
    chooseTop = false;
    constructor(die) {
        const { ammount, sides, modifier, chooseCount, rollCount, chooseTop } = die;
        this.ammount = ammount || this.ammount;
        this.sides = sides || this.sides;
        this.modifier = modifier || this.modifier;
        this.chooseCount = chooseCount || this.chooseCount;
        this.rollCount = rollCount || this.rollCount;
        this.chooseTop = chooseTop || this.chooseTop;
    }
    static fromString(dieString) {
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
    static fromStandardDie(die, count = 1, adv, modifier = 0) {
        return new Die({
            ammount: count,
            sides: die,
            modifier,
            rollCount: adv ? 2 : 1,
            chooseTop: adv === Advantage.Advantage,
            chooseCount: 1,
        });
    }
    roll() {
        let result = 0;
        const rolls = [];
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
export class DiceExpression {
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
            results,
            total,
            dice: this,
        };
    }
    add(die) {
        this.dice.push(die);
        return this;
    }
}
