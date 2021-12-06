"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// import { ObjectId } from "mongodb";
const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;
class Game {
    constructor(gameId, hostId, otherId) {
        this.resetDeck = () => {
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
        };
        //shuffle the deck
        this.shuffle = () => {
            let m = this.deck.length, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
            }
        };
        //deal one card by removing it from the deck
        this.dealOne = () => {
            return this.deck.pop();
        };
        this.determineHostFlorNumber = () => {
            this.hostFlorNumber += 20;
            this.hostCards.forEach((card) => {
                if (card.number < 10)
                    this.hostFlorNumber += card.number;
            });
        };
        this.determineOtherFlorNumber = () => {
            this.otherFlorNumber += 20;
            this.otherCards.forEach((card) => {
                if (card.number < 10)
                    this.otherFlorNumber += card.number;
            });
        };
        //checks if the suits of all three cards are the same
        this.checkForFlor = () => {
            const hostSuit1 = this.hostCards[0].suit;
            const hostSuit2 = this.hostCards[1].suit;
            const hostSuit3 = this.hostCards[2].suit;
            const otherSuit1 = this.otherCards[0].suit;
            const otherSuit2 = this.otherCards[1].suit;
            const otherSuit3 = this.otherCards[2].suit;
            if (hostSuit1 === hostSuit2 && hostSuit2 === hostSuit3) {
                this.hostHasFlor = true;
                this.determineHostFlorNumber();
            }
            if (otherSuit1 === otherSuit2 && otherSuit2 === otherSuit3) {
                this.otherHasFlor = true;
                this.determineOtherFlorNumber();
            }
        };
        //deal three cards to each player
        this.dealAll = () => {
            for (let i = 0; i < 2; i++) {
                this.hostCards.push(this.dealOne());
            }
            for (let i = 0; i < 2; i++) {
                this.otherCards.push(this.dealOne());
            }
            this.checkForFlor();
        };
        //display the cards
        this.displayCards = () => {
            //socket send to host this.hostCards
            //socket send to other this.otherCards
            //socket send to both this.trick1Cards, this.trick2Cards, this.trick3Cards
        };
        //send if users can play, call truco, etc.
        this.updateGameState = () => {
            //socket send to host this.hostCanTrucoRespond, this.hostCanRetrucoAfterQuiero, this.hostCanEnvidoRespond1, this.hostHasFlor
            //socket send to other this.otherCanTrucoRespond, this.otherCanRetrucoAfterQuiero, this.otherCanEnvidoRespond1, this.otherHasFlor
            //socket send to both this.canCallTruco, this.canCallEnvido, this.handTrucoPoints, this.handEnvidoPoints, this.tempCanCallTruco, this.tempCanCallEnvido
            //NOTE: only can call truco if both this.canCallTruco and this.tempCanCallTruco are true, same for envido
            //NOTE: if this.hostHasFlor, change EnvidoResponses1 so that they can't do quieroCon number, just quieroCon flor, same for other
            //socket send to both this.canPlayCards, this.hostTurn
            //in the response, host can only play if this.canPlayCards && this.hostTurn, other can only play if this.canPlayCards && this.hostTurn
        };
        //change who has the deck
        this.changeDeck = () => {
            this.hostHasDeck ? !this.hostHasDeck : this.hostHasDeck;
            //socket send to both this.hostHasDeck (to show on the screen who has deck)
        };
        //after a player plays a card
        this.changeTurn = () => {
            this.hostTurn ? !this.hostTurn : this.hostTurn;
        };
        //initialize the hand
        this.startHand = () => {
            this.resetDeck();
            this.shuffle();
            this.dealAll();
            this.changeDeck();
            this.hostHasDeck ? this.hostTurn : !this.hostTurn;
            this.displayCards();
            this.canPlayCards = true;
            this.canCallTruco = true;
            this.canCallEnvido = true;
            this.tempCanCallTruco = true;
            this.tempCanCallEnvido = true;
            this.hostCanTrucoRespond = false;
            this.otherCanTrucoRespond = false;
            this.hostCanRetrucoAfterQuiero = false;
            this.otherCanRetrucoAfterQuiero = false;
            this.hostHasFlor = false;
            this.otherHasFlor = false;
            this.hostFlorNumber = 0;
            this.otherFlorNumber = 0;
            this.updateGameState();
        };
        this.checkLyingPoints = () => {
            //TODO:
        };
        this.checkIfTrucoWinner = () => {
            //host wins
            if (( //win the first two tricks
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //win the third trick
            this.trick3Cards[HOST_TOKEN_VALUE].order < this.trick3Cards[OTHER_TOKEN_VALUE].order) || ( //tie the first trick, win the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //win the first trick, tie the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //tie all three tricks with deck
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order &&
                this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order &&
                this.hostHasDeck)) {
                this.handTrucoWinnerId = this.hostId;
                this.endHand();
            }
            //other wins
            else if (( //win the first two tricks
            this.trick1Cards[HOST_TOKEN_VALUE].order > this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order > this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //win the third trick
            this.trick3Cards[HOST_TOKEN_VALUE].order > this.trick3Cards[OTHER_TOKEN_VALUE].order) || ( //tie the first trick, win the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order > this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //win the first trick, tie the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order > this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order) || ( //tie all three tricks with deck
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order &&
                this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order &&
                !this.hostHasDeck)) {
                this.handTrucoWinnerId = this.otherId;
                this.endHand();
            }
        };
        this.distributeTrucoPoints = () => {
            if (this.handTrucoWinnerId === this.hostId)
                this.hostPoints += this.handTrucoPoints;
            if (this.handTrucoWinnerId === this.otherId)
                this.otherPoints += this.handTrucoPoints;
            this.handTrucoPoints = 1;
            this.handTrucoWinnerId = '';
        };
        this.distributeEnvidoPoints = () => {
            if (this.handEnvidoWinnerId === this.hostId)
                this.hostPoints += this.handEnvidoPoints;
            if (this.handEnvidoWinnerId === this.otherId)
                this.otherPoints += this.handEnvidoPoints;
            this.handEnvidoPoints = 0;
            this.handEnvidoWinnerId = '';
        };
        //end the hand
        this.endHand = () => {
            this.checkLyingPoints();
            this.distributeTrucoPoints();
            this.distributeEnvidoPoints();
            this.hostCards = [];
            this.otherCards = [];
            this.cardsPlayedInHand = 0;
            this.trick1Cards = [];
            this.trick2Cards = [];
            this.trick3Cards = [];
        };
        //will receive the index of which card the user clicked on
        this.playCard = (index, playerId) => {
            //host cards
            if (playerId === this.hostId) {
                if (this.cardsPlayedInHand === 0 || this.cardsPlayedInHand === 1) {
                    this.trick1Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
                }
                if (this.cardsPlayedInHand === 2 || this.cardsPlayedInHand === 3) {
                    this.trick2Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
                }
                if (this.cardsPlayedInHand === 4 || this.cardsPlayedInHand === 5) {
                    this.trick3Cards[HOST_TOKEN_VALUE] = this.hostCards[index];
                }
                this.hostCards.splice(index, 1);
            }
            //other cards
            else {
                if (this.cardsPlayedInHand === 0 || this.cardsPlayedInHand === 1) {
                    this.trick1Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
                }
                if (this.cardsPlayedInHand === 2 || this.cardsPlayedInHand === 3) {
                    this.trick2Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
                }
                if (this.cardsPlayedInHand === 4 || this.cardsPlayedInHand === 5) {
                    this.trick3Cards[OTHER_TOKEN_VALUE] = this.otherCards[index];
                }
                this.otherCards.splice(index, 1);
            }
            this.cardsPlayedInHand++;
            this.displayCards();
            this.changeTurn();
            this.updateGameState();
            this.checkIfTrucoWinner();
        };
        //will update the state of allowing players to respond
        this.handleTrucoCalledBy = (playerId) => {
            this.canCallTruco = false;
            this.tempCanCallEnvido = false;
            playerId === this.hostId ? this.otherCanTrucoRespond = true : this.hostCanTrucoRespond = true;
            this.updateGameState();
        };
        //ends the hand
        this.handleTrucoNoQuieroBy = (playerId) => {
            playerId === this.hostId ? this.handTrucoWinnerId = this.otherId : this.handTrucoWinnerId = this.hostId;
            this.updateGameState();
            this.endHand();
        };
        //resets who can respond
        this.handleRetrucoBy = (playerId) => {
            if (playerId === this.hostId) {
                this.hostCanTrucoRespond = false;
                this.otherCanTrucoRespond = true;
                if (this.hostCanRetrucoAfterQuiero)
                    this.hostCanRetrucoAfterQuiero = false;
            }
            else {
                this.hostCanTrucoRespond = true;
                this.otherCanTrucoRespond = false;
                if (this.otherCanRetrucoAfterQuiero)
                    this.otherCanRetrucoAfterQuiero = false;
            }
            this.handTrucoPoints++;
            this.updateGameState();
        };
        //ensures only the player who accepted can again call retruco
        this.handleTrucoQuieroBy = (playerId) => {
            if (playerId === this.hostId) {
                this.hostCanTrucoRespond = false;
                this.hostCanRetrucoAfterQuiero = true;
            }
            else {
                this.otherCanTrucoRespond = false;
                this.otherCanRetrucoAfterQuiero = true;
            }
            this.tempCanCallEnvido = true;
            this.handTrucoPoints++;
            this.updateGameState();
        };
        //allow the other player to respond
        this.handleEnvidoCalledBy = (playerId) => {
            this.tempCanCallTruco = false;
            this.canCallEnvido = false;
            if (playerId === this.hostId) {
                this.hostCalledEnvido = true;
                this.otherCanEnvidoRespond1 = true;
            }
            else {
                this.otherCalledEnvido = true;
                this.hostCanEnvidoRespond1 = true;
            }
            this.handEnvidoPoints++;
            this.updateGameState();
        };
        //assign the envido hand winner, allow users to call truco again
        this.handleEnvidoNoQuieroBy = (playerId) => {
            playerId === this.hostId ? this.handEnvidoWinnerId = this.otherId : this.handEnvidoWinnerId = this.hostId;
            this.tempCanCallTruco = true;
            this.updateGameState();
        };
        //change whose turn it is to respond
        this.handleEnvidoQuieroConBy = (playerId, envidoNumber) => {
            if (envidoNumber < 20 || envidoNumber > 33) {
                //TODO: RE-PROMPT THE USER
                return;
            }
            if (playerId === this.hostId) {
                this.hostCanEnvidoRespond1 = false;
                this.hostCalledEnvido = true;
                this.hostEnvidoCon = envidoNumber;
                this.otherCanEnvidoRespond2 = true;
            }
            else {
                this.otherCanEnvidoRespond1 = false;
                this.otherCalledEnvido = true;
                this.otherEnvidoCon = envidoNumber;
                this.hostCanEnvidoRespond2 = true;
            }
            this.handEnvidoPoints++;
            this.updateGameState();
        };
        this.handleEnvidoQuieroConFlorBy = (playerId) => {
            if (playerId === this.hostId) {
                this.hostCanEnvidoRespond1 = false;
                this.hostCalledEnvido = true;
                this.otherCanEnvidoRespond2 = true;
            }
            else {
                this.otherCanEnvidoRespond1 = false;
                this.otherCalledEnvido = true;
                this.hostCanEnvidoRespond2 = true;
            }
            this.handEnvidoPoints++;
            this.updateGameState();
        };
        this.handleEsMejorBy = (playerId) => {
            if (playerId === this.hostId) {
                this.hostCanEnvidoRespond2 = false;
                this.handEnvidoWinnerId = this.otherId;
            }
            else {
                this.otherCanEnvidoRespond2 = false;
                this.handEnvidoWinnerId = this.hostId;
            }
            this.tempCanCallTruco = true;
            this.updateGameState();
        };
        this.handleTengoBy = (playerId, envidoNumber) => {
            if (playerId === this.hostId) {
                //TODO: PROBABLY PUT THIS CLIENT-SIDE
                if (envidoNumber < this.otherEnvidoCon || (envidoNumber === this.otherEnvidoCon && !this.hostHasDeck) || envidoNumber > 33) {
                    //TODO: RE-PROMPT THE USER
                    return;
                }
                this.hostCanEnvidoRespond2 = false;
                this.hostEnvidoCon = envidoNumber;
                this.handEnvidoWinnerId = this.hostId;
            }
            else {
                if (envidoNumber < this.hostEnvidoCon || (envidoNumber === this.hostEnvidoCon && this.hostHasDeck) || envidoNumber > 33) {
                    //TODO: RE-PROMPT THE USER
                    return;
                }
                this.otherCanEnvidoRespond2 = false;
                this.otherEnvidoCon = envidoNumber;
                this.handEnvidoWinnerId = this.otherId;
            }
            this.tempCanCallTruco = true;
            this.updateGameState();
        };
        this.handleFlorTambienBy = (playerId) => {
            playerId === this.hostId ? this.hostCanEnvidoRespond2 = false : this.otherCanEnvidoRespond2 = false;
            this.hostFlorNumber > this.otherFlorNumber ? this.handEnvidoWinnerId = this.hostId : this.handEnvidoWinnerId = this.otherId;
            this.tempCanCallTruco = true;
            this.updateGameState();
        };
        this.gameId = gameId;
        this.hostId = hostId;
        this.otherId = otherId;
        this.hostPoints = 0;
        this.otherPoints = 0;
        this.resetDeck();
        this.hostCards = [];
        this.otherCards = [];
        this.cardsPlayedInHand = 0;
        this.trick1Cards = [];
        this.trick2Cards = [];
        this.trick3Cards = [];
        this.hostHasDeck = false;
        this.hostTurn = true;
        this.canPlayCards = true;
        this.handTrucoPoints = 1;
        this.handEnvidoPoints = 0;
        this.handTrucoWinnerId = '';
        this.handEnvidoWinnerId = '';
        this.hostCalledEnvido = false;
        this.otherCalledEnvido = false;
        this.hostEnvidoCon = 0;
        this.otherEnvidoCon = 0;
        this.hostFlorNumber = 0;
        this.otherFlorNumber = 0;
        this.canCallTruco = true;
        this.canCallEnvido = true;
        this.tempCanCallTruco = true;
        this.tempCanCallEnvido = true;
        this.hostCanTrucoRespond = false;
        this.otherCanTrucoRespond = false;
        this.hostCanRetrucoAfterQuiero = false;
        this.otherCanRetrucoAfterQuiero = false;
        this.hostCanEnvidoRespond1 = false;
        this.otherCanEnvidoRespond1 = false;
        this.hostCanEnvidoRespond2 = false;
        this.otherCanEnvidoRespond2 = false;
        this.hostHasFlor = false;
        this.otherHasFlor = false;
    }
}
exports.default = Game;
//# sourceMappingURL=gameLogic.js.map