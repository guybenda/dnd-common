import { Roll } from ".";
import { Player } from "./player";

export type Game = {
	id: string;
	name: string;
	adminId: string;
	data: GameData;
	// privateData: GamePrivateData; TODO
};

export type GameData = {
	players: Player[];
	recentRolls: Roll[];
};

export type GamePrivateData = {
	test: number[];
};
