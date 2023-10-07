import { GameData, IDice } from ".";
export interface ServerToClientEvents {
    updateGameData: <T extends keyof GameData>(prop: T, data: GameData[T]) => void;
}
export interface ClientToServerEvents {
    roll: (name: string, id: string, roll: IDice, broadcast: boolean) => void;
}
export interface InterServerEvents {
}
export interface SocketData {
    isAdmin: boolean;
}
export type UserAuth = {
    userId: string;
    gameId: string;
};
