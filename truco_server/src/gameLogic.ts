import { exit } from "process";
import { Card, CardIds, CardOrder } from "./types";

const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;

export class Game {
    hostId: number;
    otherId: number;

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
    handTrucoWinnerId: number;

    canCallTruco: boolean;
    canCallEnvido: boolean;
    hostCanTrucoRespond: boolean;
    otherCanTrucoRespond: boolean;
    hostCanRetrucoAfterQuiero: boolean;
    otherCanRetrucoAfterQuiero: boolean;

    constructor (hostId: number, otherId: number) {
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
        this.handTrucoWinnerId = 0;

        this.canCallTruco = true;
        this.canCallEnvido = true;
        this.hostCanTrucoRespond = false;
        this.otherCanTrucoRespond = false;
        this.hostCanRetrucoAfterQuiero = false;
        this.otherCanRetrucoAfterQuiero = false;
    }

    resetDeck = () => {
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
    }

    //shuffle the deck
    shuffle = () => {
        let m = this.deck.length, i;
        while(m){
            i = Math.floor(Math.random() * m--);
            [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
        }
    }

    //deal one card by removing it from the deck
    dealOne = () => {
        return this.deck.pop();
    }

    //deal three cards to each player
    dealAll = () => {
        for (let i = 0; i < 2; i++) {
            this.hostCards.push(this.dealOne());
        }
        for (let i = 0; i < 2; i++) {
            this.otherCards.push(this.dealOne());
        }
    }

    //display the cards
    displayCards = () => {
        //socket send to host this.hostCards
        //socket send to other this.otherCards
        //socket send to both this.trick1Cards, this.trick2Cards, this.trick3Cards
    }

    //send if users can play, call truco, etc.
    updateGameState = () => {
        //socket send to host this.hostCanTrucoRespond
        //socket send to other this.otherCanTrucoRespond
        //socket send to both this.canCallTruco, this.canCallEnvido, this.handTrucoPoints, this.handEnvidoPoints
        //socket send to both this.canPlayCards, this.hostTurn
        //in the response, host can only play if this.canPlayCards && this.hostTurn, other can only play if this.canPlayCards && this.hostTurn
    }

    //change who has the deck
    changeDeck = () => {
        this.hostHasDeck ? !this.hostHasDeck : this.hostHasDeck;
        //socket send to both this.hostHasDeck (to show on the screen who has deck)
    }

    //after a player plays a card
    changeTurn = () => {
        this.hostTurn ? !this.hostTurn : this.hostTurn;
    }

    //initialize the hand
    startHand = () => {
        this.resetDeck();
        this.shuffle();
        this.dealAll();
        this.changeDeck();
        this.hostHasDeck ? this.hostTurn : !this.hostTurn;
        this.displayCards();

        this.canPlayCards = true;
        this.canCallTruco = true;
        this.canCallEnvido = true;
        this.hostCanTrucoRespond = false;
        this.otherCanTrucoRespond = false;
        this.hostCanRetrucoAfterQuiero = false;
        this.otherCanRetrucoAfterQuiero = false;
        
        this.updateGameState();
    }

    checkLyingPoints = () => {
        //TODO:
    }

    checkIfTrucoWinner = () => {
        //host wins
        if (
            (//win the first two tricks
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//win the third trick
            this.trick3Cards[HOST_TOKEN_VALUE].order < this.trick3Cards[OTHER_TOKEN_VALUE].order
            ) || (//tie the first trick, win the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//win the first trick, tie the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//tie all three tricks with deck
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order &&
            this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order &&
            this.hostHasDeck
            )
        ) {
            this.handTrucoWinnerId = this.hostId;
            this.endHand();
        }
        //other wins
        else if (
            (//win the first two tricks
                this.trick1Cards[HOST_TOKEN_VALUE].order > this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order > this.trick2Cards[OTHER_TOKEN_VALUE].order
                ) || (//win the third trick
                this.trick3Cards[HOST_TOKEN_VALUE].order > this.trick3Cards[OTHER_TOKEN_VALUE].order
                ) || (//tie the first trick, win the second trick
                this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order > this.trick2Cards[OTHER_TOKEN_VALUE].order
                ) || (//win the first trick, tie the second trick
                this.trick1Cards[HOST_TOKEN_VALUE].order > this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order
                ) || (//tie all three tricks with deck
                this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order &&
                this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order &&
                !this.hostHasDeck
                )
        ) {
            this.handTrucoWinnerId = this.otherId;
            this.endHand();
        }
    }

    distributeTrucoPoints = () => {
        if (this.handTrucoWinnerId === this.hostId) {
            this.hostPoints += this.handTrucoPoints;
        }
        if (this.handTrucoWinnerId === this.otherId) {
            this.otherPoints += this.handTrucoPoints;
        }
        this.handTrucoPoints = 1;
        this.handTrucoWinnerId = 0;
    }

    //end the hand
    endHand = () => {
        this.checkLyingPoints();
        this.distributeTrucoPoints();

        this.hostCards = [];
        this.otherCards = [];
        this.cardsPlayedInHand = 0;
        this.trick1Cards = [];
        this.trick2Cards = [];
        this.trick3Cards = [];
    }

    //will receive the index of which card the user clicked on
    playCard = (index: number, playerId: number) => {
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
    }

    //will update the state of allowing players to respond
    handleTrucoCalledBy = (playerId: number) => {
        this.canCallTruco = false;
        this.canCallEnvido = false;
        if (playerId === this.hostId) {
            this.otherCanTrucoRespond = true;
        }
        else {
            this.hostCanTrucoRespond = true;
        }
        this.updateGameState();
    }

    //ends the hand
    handleTrucoNoQuieroBy = (playerId: number) => {
        playerId === this.hostId ? this.handTrucoWinnerId = this.otherId : this.handTrucoWinnerId = this.hostId;
        this.endHand();
    }

    //resets who can respond
    handleRetrucoBy = (playerId: number) => {
        if (playerId === this.hostId) {
            this.hostCanTrucoRespond = false;
            this.otherCanTrucoRespond = true;
        }
        else {
            this.hostCanTrucoRespond = true;
            this.otherCanTrucoRespond = false;
        }
        this.handTrucoPoints++;
        this.updateGameState();
    }

    //ensures only the player who accepted can again call retruco
    handleTrucoQuieroBy = (playerId: number) => {
        playerId === this.hostId ? this.hostCanRetrucoAfterQuiero = true : this.otherCanRetrucoAfterQuiero = true;
        this.handTrucoPoints++;
        this.updateGameState();
    }
}