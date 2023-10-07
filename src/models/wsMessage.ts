import { IDiceExpression, IDiceExpressionResult } from ".";
import { User } from "./user";

export interface ServerToClientEvents {
	rollResult: (name: string, id: string, result: IDiceExpressionResult) => void;
	currentPlayers: (players: User[]) => void;
}

export interface ClientToServerEvents {
	roll: (
		name: string,
		id: string,
		roll: IDiceExpression,
		broadcast: boolean
	) => void;
}

export interface InterServerEvents {}

export interface SocketData {
	isAdmin: boolean;
}

export type UserAuth = {
	userId: string;
	gameId: string;
};
