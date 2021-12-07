import Game from "./gameLogic";
import Room from "./models/room";

type cChat = {
    msg: string,
    room: string
}

type sChat = {
    msg: string,
}

type playCardData = {
    gameId: string,
    playerId: string,
    cardId: number
}

type basicCallData = {
    gameId: string
    userId: string
}

type numericCallData = {
    gameId: string
    userId: string
    number: number
}

export class Card {
    number: number;
    suit: String;
    id: number;
    order: number;
    constructor (number: number, suit: String, id: number, order: number) {
        this.number = number;
        this.suit = suit;
        this.id = id;
        this.order = order;
    }
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

export enum CardOrder {
    Swords1 = 1,
    Pickles1 = 2,
    Swords7 = 3,
    Coins7 = 4,
    Swords3 = 5,
    Pickles3 = 5,
    Coins3 = 5,
    Cups3 = 5,
    Swords2 = 6,
    Pickles2 = 6,
    Coins2 = 6,
    Cups2 = 6,
    Coins1 = 7,
    Cups1 = 7,
    Swords12 = 8,
    Pickles12 = 8,
    Coins12 = 8,
    Cups12 = 8,
    Swords11 = 9,
    Pickles11 = 9,
    Coins11 = 9,
    Cups11 = 9,
    Swords10 = 10,
    Pickles10 = 10,
    Coins10 = 10,
    Cups10 = 10,
    Pickles7 = 11,
    Cups7 = 11,
    Swords6 = 12,
    Pickles6 = 12,
    Coins6 = 12,
    Cups6 = 12,
    Swords5 = 13,
    Pickles5 = 13,
    Coins5 = 13,
    Cups5 = 13,
    Swords4 = 14,
    Pickles4 = 14,
    Coins4 = 14,
    Cups4 = 14,
}

export interface ServerToClientEvents {
    noArg: () => void;
    ping: (msg: string) => void;
    chat: (data: sChat) => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    rooms: (rooms: Room[]) => void;
    startGame: (game: Game) => void;
    updateAll: (game: Game) => void;
  }
  
export interface ClientToServerEvents {
    hello: () => void;
    chat: (data: cChat) => void;
    updateRooms: () => void;
    joinRoom: (roomId: string) => void;
    startGame: (id: string) => void;
    playCard: (data: playCardData) => void;
    trucoCalled: (data: basicCallData) => void;
    envidoCalled: (data: basicCallData) => void;
    trucoQuieroCalled: (data: basicCallData) => void;
    trucoNoQuieroCalled: (data: basicCallData) => void;
    retrucoCalled: (data: basicCallData) => void;
    quieroConCalled: (data: numericCallData) => void;
    envidoNoQuieroCalled: (data: basicCallData) => void;
    quieroConFlorCalled: (data: basicCallData) => void;
    esMejorCalled: (data: basicCallData) => void;
    tengoCalled: (data: numericCallData) => void;
    tengoFlorTambienCalled: (data: basicCallData) => void;
    ready: (data: string) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
name: string;
age: number;
}

export type GameType = {
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