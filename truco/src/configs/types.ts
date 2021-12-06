export type User = {
    name: string;
    socketId: string;
    _id?: string;
}

export type Room = {
    name: string;
    users?: User[];
    host: User;
    _id?: string
}

export type Card = {
    number: number;
    suit: String;
    id: number;
    order: number;
}

export type Game = {
    gameId: string;

    hostId: string;
    otherId: string;

    hostPoints: number;
    otherPoints: number;

    deck: Card[];

    hostCards: Card[];
    otherCards: Card[];
    cardsPlayedInHand: number;
    trick1Cards: Card[];
    trick2Cards: Card[];
    trick3Cards: Card[];

    hostHasDeck: boolean;
    hostTurn: boolean;
    canPlayCards: boolean;

    handTrucoPoints: number;
    handEnvidoPoints: number;
    handTrucoWinnerId: string;
    handEnvidoWinnerId: string;

    hostCalledEnvido: boolean;
    otherCalledEnvido: boolean;
    hostEnvidoCon: number;
    otherEnvidoCon: number;
    hostFlorNumber: number;
    otherFlorNumber: number;

    canCallTruco: boolean;
    canCallEnvido: boolean;
    tempCanCallTruco: boolean;
    tempCanCallEnvido: boolean;
    hostCanTrucoRespond: boolean;
    otherCanTrucoRespond: boolean;
    hostCanRetrucoAfterQuiero: boolean;
    otherCanRetrucoAfterQuiero: boolean;
    hostCanEnvidoRespond1: boolean;
    otherCanEnvidoRespond1: boolean;
    hostCanEnvidoRespond2: boolean;
    otherCanEnvidoRespond2: boolean;
    hostHasFlor: boolean;
    otherHasFlor: boolean;
}