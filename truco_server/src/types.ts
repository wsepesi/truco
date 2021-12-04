type cChat = {
    msg: string,
}

type sChat = {
    msg: string,
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
  }
  
export interface ClientToServerEvents {
    hello: () => void;
    chat: (data: cChat) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
name: string;
age: number;
}
