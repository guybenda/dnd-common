"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceExpression = exports.Die = exports.StandardDice = exports.Advantage = void 0;
var Advantage;
(function (Advantage) {
    Advantage["Advantage"] = "advantage";
    Advantage["Disadvantage"] = "disadvantage";
})(Advantage || (exports.Advantage = Advantage = {}));
var StandardDice;
(function (StandardDice) {
    StandardDice[StandardDice["d4"] = 4] = "d4";
    StandardDice[StandardDice["d6"] = 6] = "d6";
    StandardDice[StandardDice["d8"] = 8] = "d8";
    StandardDice[StandardDice["d10"] = 10] = "d10";
    StandardDice[StandardDice["d12"] = 12] = "d12";
    StandardDice[StandardDice["d20"] = 20] = "d20";
    StandardDice[StandardDice["d100"] = 100] = "d100";
})(StandardDice || (exports.StandardDice = StandardDice = {}));
var Die = /** @class */ (function () {
    function Die(die) {
        this.ammount = 1;
        this.sides = 6;
        this.modifier = 0;
        this.chooseCount = 1;
        this.rollCount = 1;
        this.chooseTop = false;
        var ammount = die.ammount, sides = die.sides, modifier = die.modifier, chooseCount = die.chooseCount, rollCount = die.rollCount, chooseTop = die.chooseTop;
        this.ammount = ammount || this.ammount;
        this.sides = sides || this.sides;
        this.modifier = modifier || this.modifier;
        this.chooseCount = chooseCount || this.chooseCount;
        this.rollCount = rollCount || this.rollCount;
        this.chooseTop = chooseTop || this.chooseTop;
    }
    Die.fromString = function (dieString) {
        var parts = dieString.split("/([+-])/g");
        var dice = parts[0];
        var modifier = parts[1];
        var diceParts = dice.split("d");
        var ammount = diceParts[0];
        var sides = diceParts[1];
        // create the die
        //TODO
        return null;
    };
    Die.fromStandardDie = function (die, count, adv, modifier) {
        if (count === void 0) { count = 1; }
        if (modifier === void 0) { modifier = 0; }
        return new Die({
            ammount: count,
            sides: die,
            modifier: modifier,
            rollCount: adv ? 2 : 1,
            chooseTop: adv === Advantage.Advantage,
            chooseCount: 1,
        });
    };
    Die.prototype.roll = function () {
        var _this = this;
        var result = 0;
        var rolls = [];
        for (var i = 0; i < this.rollCount; i++) {
            var roll = Math.floor(Math.random() * this.sides) + 1;
            rolls.push(roll);
        }
        var sorted = rolls.toSorted(function (a, b) { return (_this.chooseTop ? b - a : a - b); });
        for (var i = 0; i < this.chooseCount; i++) {
            result += sorted[i];
        }
        return {
            total: result + this.modifier,
            rolls: rolls,
            die: this,
        };
    };
    return Die;
}());
exports.Die = Die;
var DiceExpression = /** @class */ (function () {
    function DiceExpression(diceExp) {
        this.dice = diceExp.dice.map(function (die) { return new Die(die); });
    }
    DiceExpression.prototype.roll = function () {
        var results = [];
        var total = 0;
        for (var _i = 0, _a = this.dice; _i < _a.length; _i++) {
            var die = _a[_i];
            var result = die.roll();
            results.push(result);
            total += result.total;
        }
        return {
            results: results,
            total: total,
            dice: this,
        };
    };
    DiceExpression.prototype.add = function (die) {
        this.dice.push(die);
        return this;
    };
    return DiceExpression;
}());
exports.DiceExpression = DiceExpression;
