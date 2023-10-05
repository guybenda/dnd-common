export type User = {
	id: string;
	name: string;
	pictureUrl: string;
	gameData?: UserGameData;
};

/**
 * TODO
 */
export type UserGameData = {
	currHealth: number;
	maxHealth: number;
};
