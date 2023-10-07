export declare enum Advantage {
    Advantage = "advantage",
    Disadvantage = "disadvantage"
}
export declare enum D {
    d4 = 4,
    d6 = 6,
    d8 = 8,
    d10 = 10,
    d12 = 12,
    d20 = 20,
    d100 = 100
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
export declare class Die implements IDie {
    count: number;
    sides: number;
    modifier: number;
    advantage?: Advantage;
    constructor(die: Partial<IDie>);
    static d(die: D, count?: number, adv?: Advantage, modifier?: number): Die;
    roll(): IDieResult;
}
export declare class Dice implements IDice {
    dice: Die[];
    noder: number;
    constructor(diceExp: IDice);
    roll(): IDiceResult;
    add(die: Die): this;
}
export type Roll = IDiceResult & {
    name: string;
    id: string;
};
