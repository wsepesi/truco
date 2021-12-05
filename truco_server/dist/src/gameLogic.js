"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const types_1 = require("./types");
const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;
class Game {
    constructor(hostId, otherId) {
        this.shuffle = () => {
            let m = this.deck.length, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
            }
        };
        this.dealOne = () => {
            return this.deck.pop();
        };
        this.dealAll = () => {
            for (let i = 0; i < 2; i++) {
                this.hostCards.push(this.dealOne());
            }
            for (let i = 0; i < 2; i++) {
                this.otherCards.push(this.dealOne());
            }
        };
        this.displayCards = () => {
            //socket send to host this.hostCards
            //socket send to other this.otherCards
            //socket send to both this.trick1Cards, this.trick2Cards, this.trick3Cards
        };
        this.changeDeck = () => {
            this.hostHasDeck ? !this.hostHasDeck : this.hostHasDeck;
        };
        this.changeTurn = () => {
            this.hostTurn ? !this.hostTurn : this.hostTurn;
        };
        this.startHand = () => {
            this.shuffle();
            this.dealAll();
            this.changeDeck();
            this.hostHasDeck ? this.hostTurn : !this.hostTurn;
            this.hostTurn ? this.hostStartsTrick : !this.hostStartsTrick;
            this.displayCards();
        };
        //will receive the index of which card the user clicked on
        this.playCard = (index, playerId, trick) => {
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
        };
        this.hostId = hostId;
        this.otherId = otherId;
        this.deck = [
            new types_1.Card(1, "Swords", types_1.CardIds.Swords1, types_1.CardOrder.Swords1),
            new types_1.Card(2, "Swords", types_1.CardIds.Swords2, types_1.CardOrder.Swords2),
            new types_1.Card(3, "Swords", types_1.CardIds.Swords3, types_1.CardOrder.Swords3),
            new types_1.Card(4, "Swords", types_1.CardIds.Swords4, types_1.CardOrder.Swords4),
            new types_1.Card(5, "Swords", types_1.CardIds.Swords5, types_1.CardOrder.Swords5),
            new types_1.Card(6, "Swords", types_1.CardIds.Swords6, types_1.CardOrder.Swords6),
            new types_1.Card(7, "Swords", types_1.CardIds.Swords7, types_1.CardOrder.Swords7),
            new types_1.Card(10, "Swords", types_1.CardIds.Swords10, types_1.CardOrder.Swords10),
            new types_1.Card(11, "Swords", types_1.CardIds.Swords11, types_1.CardOrder.Swords11),
            new types_1.Card(12, "Swords", types_1.CardIds.Swords12, types_1.CardOrder.Swords12),
            new types_1.Card(1, "Pickles", types_1.CardIds.Pickles1, types_1.CardOrder.Pickles1),
            new types_1.Card(2, "Pickles", types_1.CardIds.Pickles2, types_1.CardOrder.Pickles2),
            new types_1.Card(3, "Pickles", types_1.CardIds.Pickles3, types_1.CardOrder.Pickles3),
            new types_1.Card(4, "Pickles", types_1.CardIds.Pickles4, types_1.CardOrder.Pickles4),
            new types_1.Card(5, "Pickles", types_1.CardIds.Pickles5, types_1.CardOrder.Pickles5),
            new types_1.Card(6, "Pickles", types_1.CardIds.Pickles6, types_1.CardOrder.Pickles6),
            new types_1.Card(7, "Pickles", types_1.CardIds.Pickles7, types_1.CardOrder.Pickles7),
            new types_1.Card(10, "Pickles", types_1.CardIds.Pickles10, types_1.CardOrder.Pickles10),
            new types_1.Card(11, "Pickles", types_1.CardIds.Pickles11, types_1.CardOrder.Pickles11),
            new types_1.Card(12, "Pickles", types_1.CardIds.Pickles12, types_1.CardOrder.Pickles12),
            new types_1.Card(1, "Coins", types_1.CardIds.Coins1, types_1.CardOrder.Coins1),
            new types_1.Card(2, "Coins", types_1.CardIds.Coins2, types_1.CardOrder.Coins2),
            new types_1.Card(3, "Coins", types_1.CardIds.Coins3, types_1.CardOrder.Coins3),
            new types_1.Card(4, "Coins", types_1.CardIds.Coins4, types_1.CardOrder.Coins4),
            new types_1.Card(5, "Coins", types_1.CardIds.Coins5, types_1.CardOrder.Coins5),
            new types_1.Card(6, "Coins", types_1.CardIds.Coins6, types_1.CardOrder.Coins6),
            new types_1.Card(7, "Coins", types_1.CardIds.Coins7, types_1.CardOrder.Coins7),
            new types_1.Card(10, "Coins", types_1.CardIds.Coins10, types_1.CardOrder.Coins10),
            new types_1.Card(11, "Coins", types_1.CardIds.Coins11, types_1.CardOrder.Coins11),
            new types_1.Card(12, "Coins", types_1.CardIds.Coins12, types_1.CardOrder.Coins12),
            new types_1.Card(1, "Cups", types_1.CardIds.Cups1, types_1.CardOrder.Cups1),
            new types_1.Card(2, "Cups", types_1.CardIds.Cups2, types_1.CardOrder.Cups2),
            new types_1.Card(3, "Cups", types_1.CardIds.Cups3, types_1.CardOrder.Cups3),
            new types_1.Card(4, "Cups", types_1.CardIds.Cups4, types_1.CardOrder.Cups4),
            new types_1.Card(5, "Cups", types_1.CardIds.Cups5, types_1.CardOrder.Cups5),
            new types_1.Card(6, "Cups", types_1.CardIds.Cups6, types_1.CardOrder.Cups6),
            new types_1.Card(7, "Cups", types_1.CardIds.Cups7, types_1.CardOrder.Cups7),
            new types_1.Card(10, "Cups", types_1.CardIds.Cups10, types_1.CardOrder.Cups10),
            new types_1.Card(11, "Cups", types_1.CardIds.Cups11, types_1.CardOrder.Cups11),
            new types_1.Card(12, "Cups", types_1.CardIds.Cups12, types_1.CardOrder.Cups12),
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
}
exports.Game = Game;
//# sourceMappingURL=gameLogic.js.map