import { Roll, User } from ".";

export type Game = {
	id: string;
	name: string;
	adminId: string;
	data: GameData;
};

export type GameData = {
	players?: User[];
	recentRolls?: Roll[];
};
