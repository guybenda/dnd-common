import { User } from ".";

/**
 * An in-game user.
 *
 * A player only exists in the context of a game.
 */
export type Player = {
	user: User;
	data: PlayerData;
};

export type PlayerData = {
	currHealth: number;
	maxHealth: number;
};

export type DBPlayer = Omit<Player, "user"> & {
	userId: string;
};
