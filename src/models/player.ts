import { User } from ".";

/**
 * An in-game user.
 *
 * A player only exists in the context of a game.
 */
export type Player = {
	/**
	 * Stored in the database as a string, can be populated with a User object.
	 */
	user: User | string;
	data: PlayerData;
};

export type PlayerData = {
	currHealth: number;
	maxHealth: number;
};
