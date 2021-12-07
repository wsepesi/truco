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

export type TrucoCard = {
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

    deck: TrucoCard[];

    hostCards: TrucoCard[];
    otherCards: TrucoCard[];
    cardsPlayedInHand: number;
    trick1Cards: TrucoCard[];
    trick2Cards: TrucoCard[];
    trick3Cards: TrucoCard[];

    hostHasDeck: boolean;
    hostTurn: boolean;
    canPlayCards: boolean;

    handTrucoPoints: number;
    handEnvidoPoints: number;
    handTrucoWinnerId: string;
    handEnvidoWinnerId: string;
    handLiarId: string;

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

    endOfHand: boolean;
    endOfGame: boolean;
}

export enum CardIds {
    Swords1 = 1,
    Swords2,
    Swords3,
    Swords4,
    Swords5,
    Swords6,
    Swords7,
    Swords10,
    Swords11,
    Swords12,
    Pickles1,
    Pickles2,
    Pickles3,
    Pickles4,
    Pickles5,
    Pickles6,
    Pickles7,
    Pickles10,
    Pickles11,
    Pickles12,
    Coins1,
    Coins2,
    Coins3,
    Coins4,
    Coins5,
    Coins6,
    Coins7,
    Coins10,
    Coins11,
    Coins12,
    Cups1,
    Cups2,
    Cups3,
    Cups4,
    Cups5,
    Cups6,
    Cups7,
    Cups10,
    Cups11,
    Cups12,
}