import { Card, CardIds, CardOrder } from "./types";

const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;

export class Game {
    hostId: number;
    otherId: number;
    deck: Card[];
    hostCards: Card[];
    otherCards: Card[];
    trick: number;
    trick1Cards: Card[];
    trick2Cards: Card[];
    trick3Cards: Card[];
    hostHasDeck: boolean;
    hostStartsTrick: boolean;
    hostTurn: boolean;
    constructor (hostId: number, otherId: number) {
        this.hostId = hostId;
        this.otherId = otherId;
        this.deck = [
            new Card(1, "Swords", CardIds.Swords1, CardOrder.Swords1),
            new Card(2, "Swords", CardIds.Swords2, CardOrder.Swords2),
            new Card(3, "Swords", CardIds.Swords3, CardOrder.Swords3),
            new Card(4, "Swords", CardIds.Swords4, CardOrder.Swords4),
            new Card(5, "Swords", CardIds.Swords5, CardOrder.Swords5),
            new Card(6, "Swords", CardIds.Swords6, CardOrder.Swords6),
            new Card(7, "Swords", CardIds.Swords7, CardOrder.Swords7),
            new Card(10, "Swords", CardIds.Swords10, CardOrder.Swords10),
            new Card(11, "Swords", CardIds.Swords11, CardOrder.Swords11),
            new Card(12, "Swords", CardIds.Swords12, CardOrder.Swords12),
            new Card(1, "Pickles", CardIds.Pickles1, CardOrder.Pickles1),
            new Card(2, "Pickles", CardIds.Pickles2, CardOrder.Pickles2),
            new Card(3, "Pickles", CardIds.Pickles3, CardOrder.Pickles3),
            new Card(4, "Pickles", CardIds.Pickles4, CardOrder.Pickles4),
            new Card(5, "Pickles", CardIds.Pickles5, CardOrder.Pickles5),
            new Card(6, "Pickles", CardIds.Pickles6, CardOrder.Pickles6),
            new Card(7, "Pickles", CardIds.Pickles7, CardOrder.Pickles7),
            new Card(10, "Pickles", CardIds.Pickles10, CardOrder.Pickles10),
            new Card(11, "Pickles", CardIds.Pickles11, CardOrder.Pickles11),
            new Card(12, "Pickles", CardIds.Pickles12, CardOrder.Pickles12),
            new Card(1, "Coins", CardIds.Coins1, CardOrder.Coins1),
            new Card(2, "Coins", CardIds.Coins2, CardOrder.Coins2),
            new Card(3, "Coins", CardIds.Coins3, CardOrder.Coins3),
            new Card(4, "Coins", CardIds.Coins4, CardOrder.Coins4),
            new Card(5, "Coins", CardIds.Coins5, CardOrder.Coins5),
            new Card(6, "Coins", CardIds.Coins6, CardOrder.Coins6),
            new Card(7, "Coins", CardIds.Coins7, CardOrder.Coins7),
            new Card(10, "Coins", CardIds.Coins10, CardOrder.Coins10),
            new Card(11, "Coins", CardIds.Coins11, CardOrder.Coins11),
            new Card(12, "Coins", CardIds.Coins12, CardOrder.Coins12),
            new Card(1, "Cups", CardIds.Cups1, CardOrder.Cups1),
            new Card(2, "Cups", CardIds.Cups2, CardOrder.Cups2),
            new Card(3, "Cups", CardIds.Cups3, CardOrder.Cups3),
            new Card(4, "Cups", CardIds.Cups4, CardOrder.Cups4),
            new Card(5, "Cups", CardIds.Cups5, CardOrder.Cups5),
            new Card(6, "Cups", CardIds.Cups6, CardOrder.Cups6),
            new Card(7, "Cups", CardIds.Cups7, CardOrder.Cups7),
            new Card(10, "Cups", CardIds.Cups10, CardOrder.Cups10),
            new Card(11, "Cups", CardIds.Cups11, CardOrder.Cups11),
            new Card(12, "Cups", CardIds.Cups12, CardOrder.Cups12),
        ];
        this.hostCards = [];
        this.otherCards = [];
        this.trick = 1;
        this.trick1Cards = [];
        this.trick2Cards = [];
        this.trick3Cards = [];
        this.hostHasDeck = false;
        this.hostStartsTrick = false;
        this.hostTurn = true;
    }

    shuffle = () => {
        let m = this.deck.length, i;
        while(m){
            i = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
    }

    dealOne = () => {
        return this.deck.pop();
    }

    dealAll = () => {
        for (let i = 0; i < 2; i++) {
            this.hostCards.push(this.dealOne());
        }
        for (let i = 0; i < 2; i++) {
            this.otherCards.push(this.dealOne());
        }
    }

    displayCards = () => {
        //socket send to host this.hostCards
        //socket send to other this.otherCards
        //socket send to both this.trick1Cards, this.trick2Cards, this.trick3Cards
    }

    changeDeck = () => {
        this.hostHasDeck ? !this.hostHasDeck : this.hostHasDeck;
    }

    changeTurn = () => {
        this.hostTurn ? !this.hostTurn : this.hostTurn;
    }

    startHand = () => {
        this.shuffle();
        this.dealAll();
        this.changeDeck();
        this.hostHasDeck ? this.hostTurn : !this.hostTurn;
        this.hostTurn ? this.hostStartsTrick : !this.hostStartsTrick;
        this.displayCards();
    }

    //will receive the index of which card the user clicked on
    playCard = (index: number, playerId: number, trick: number) => {
        if (playerId === this.hostId) {
            if (trick === 1) {
                this.trick1Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
            }
            if (trick === 2) {
                this.trick2Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
            }
            if (trick === 3) {
                this.trick3Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
            }

            this.hostCards.splice(index, 1);
        }
        else {
            if (trick === 1) {
                this.trick1Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
            }
            if (trick === 2) {
                this.trick2Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
            }
            if (trick === 3) {
                this.trick3Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
            }

            this.otherCards.splice(index, 1);
        }
        
        this.displayCards();
        this.changeTurn();
    }
}