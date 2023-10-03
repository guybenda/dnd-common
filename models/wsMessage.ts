export type WSMessage<T extends WSMessageType> = {
	type: T;
	data: WSMessageDataType[T];
};

export enum WSMessageType {
	test1,
	test2,
	rollRequest,
	rollResponse,
}

export type WSMessageDataType = {
	[T in WSMessageType]: {
		[WSMessageType.test1]: number;
		[WSMessageType.test2]: string;
		[WSMessageType.rollRequest]: RollRequest;
		[WSMessageType.rollResponse]: RollResponse;
	}[T];
};

export type BaseRequest = {
	public: boolean;
};

export type RollRequest = BaseRequest & {};

export type RollResponse = {};
