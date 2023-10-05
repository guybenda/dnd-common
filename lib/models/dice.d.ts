export declare enum Advantage {
    Advantage = "advantage",
    Disadvantage = "disadvantage"
}
export declare enum StandardDice {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100
}
export interface IDie {
    ammount: number;
    sides: number;
    modifier: number;
    chooseCount: number;
    rollCount: number;
    chooseTop: boolean;
}
export interface IDieResult {
    rolls: number[];
    total: number;
    die: IDie;
}
export interface IDiceExpression {
    dice: IDie[];
}
export interface IDiceExpressionResult {
    results: IDieResult[];
    total: number;
    dice: IDiceExpression;
}
export declare class Die implements IDie {
    ammount: number;
    sides: number;
    modifier: number;
    chooseCount: number;
    rollCount: number;
    chooseTop: boolean;
    constructor(die: Partial<IDie>);
    static fromString(dieString: string): Die | null;
    static fromStandardDie(die: StandardDice, count?: number, adv?: Advantage, modifier?: number): Die;
    roll(): IDieResult;
}
export declare class DiceExpression implements IDiceExpression {
    dice: Die[];
    constructor(diceExp: IDiceExpression);
    roll(): IDiceExpressionResult;
    add(die: Die): this;
}
