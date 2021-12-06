import { Card, CardIds, CardOrder } from "./types";

// import { ObjectId } from "mongodb";

const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;

export default class Game {
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

    constructor (gameId: string, hostId: string, otherId: string) {
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

    determineHostFlorNumber = () => {
        this.hostFlorNumber += 20;
        this.hostCards.forEach((card) => {
            if (card.number < 10) this.hostFlorNumber += card.number;
        })
    }

    determineOtherFlorNumber = () => {
        this.otherFlorNumber += 20;
        this.otherCards.forEach((card) => {
            if (card.number < 10) this.otherFlorNumber += card.number;
        })
    }

    //checks if the suits of all three cards are the same
    checkForFlor = () => {
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
    }

    //deal three cards to each player
    dealAll = () => {
        for (let i = 0; i < 3; i++) {
            this.hostCards.push(this.dealOne());
        }
        for (let i = 0; i < 3; i++) {
            this.otherCards.push(this.dealOne());
        }
        this.checkForFlor();
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
        if (this.handTrucoWinnerId === this.hostId) this.hostPoints += this.handTrucoPoints;
        if (this.handTrucoWinnerId === this.otherId) this.otherPoints += this.handTrucoPoints;
        this.handTrucoPoints = 1;
        this.handTrucoWinnerId = '';
    }

    distributeEnvidoPoints = () => {
        if (this.handEnvidoWinnerId === this.hostId) this.hostPoints += this.handEnvidoPoints;
        if (this.handEnvidoWinnerId === this.otherId) this.otherPoints += this.handEnvidoPoints;
        this.handEnvidoPoints = 0;
        this.handEnvidoWinnerId = '';
    }

    //end the hand
    endHand = () => {
        this.checkLyingPoints();
        this.distributeTrucoPoints();
        this.distributeEnvidoPoints();

        this.hostCards = [];
        this.otherCards = [];
        this.cardsPlayedInHand = 0;
        this.trick1Cards = [];
        this.trick2Cards = [];
        this.trick3Cards = [];
    }

    //will receive the index of which card the user clicked on
    playCard = (index: number, playerId: string) => {
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
        this.changeTurn();
        this.checkIfTrucoWinner();
    }

    //will update the state of allowing players to respond
    handleTrucoCalledBy = (playerId: string) => {
        this.canCallTruco = false;
        this.tempCanCallEnvido = false;
        this.canPlayCards = false;
        playerId === this.hostId ? this.otherCanTrucoRespond = true : this.hostCanTrucoRespond = true;
    }

    //ends the hand
    handleTrucoNoQuieroBy = (playerId: string) => {
        playerId === this.hostId ? this.handTrucoWinnerId = this.otherId : this.handTrucoWinnerId = this.hostId;
        this.endHand();
    }

    //resets who can respond
    handleRetrucoBy = (playerId: string) => {
        if (playerId === this.hostId) {
            this.hostCanTrucoRespond = false;
            this.otherCanTrucoRespond = true;
            if (this.hostCanRetrucoAfterQuiero) this.hostCanRetrucoAfterQuiero = false;
        }
        else {
            this.hostCanTrucoRespond = true;
            this.otherCanTrucoRespond = false;
            if (this.otherCanRetrucoAfterQuiero) this.otherCanRetrucoAfterQuiero = false;
        }
        this.handTrucoPoints++;
    }

    //ensures only the player who accepted can again call retruco
    handleTrucoQuieroBy = (playerId: string) => {
        if (playerId === this.hostId) {
            this.hostCanTrucoRespond = false;
            this.hostCanRetrucoAfterQuiero = true;
        }
        else {
            this.otherCanTrucoRespond = false;
            this.otherCanRetrucoAfterQuiero = true;
        }
        this.canPlayCards = true;
        this.tempCanCallEnvido = true;
        this.handTrucoPoints++;
    }

    //allow the other player to respond
    handleEnvidoCalledBy = (playerId: string) => {
        this.tempCanCallTruco = false;
        this.canCallEnvido = false;
        this.canPlayCards = false;
        if (playerId === this.hostId) {
            this.hostCalledEnvido = true;
            this.otherCanEnvidoRespond1 = true
        }
        else {
            this.otherCalledEnvido = true;
            this.hostCanEnvidoRespond1 = true;
        }
        this.handEnvidoPoints++;
    }

    //assign the envido hand winner, allow users to call truco again
    handleEnvidoNoQuieroBy = (playerId: string) => {
        playerId === this.hostId ? this.handEnvidoWinnerId = this.otherId : this.handEnvidoWinnerId = this.hostId;
        this.tempCanCallTruco = true;
        this.canPlayCards = true;
    }

    //change whose turn it is to respond
    handleEnvidoQuieroConBy = (playerId: string, envidoNumber: number) => {
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
    }

    handleEnvidoQuieroConFlorBy = (playerId: string) => {
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
    }

    handleEsMejorBy = (playerId: string) => {
        if (playerId === this.hostId) {
            this.hostCanEnvidoRespond2 = false;
            this.handEnvidoWinnerId = this.otherId;
        }
        else {
            this.otherCanEnvidoRespond2 = false;
            this.handEnvidoWinnerId = this.hostId;
        }
        this.tempCanCallTruco = true;
        this.canPlayCards = true;
    }

    handleTengoBy = (playerId: string, envidoNumber: number) => {
        if (playerId === this.hostId) {
            this.hostCanEnvidoRespond2 = false;
            this.hostEnvidoCon = envidoNumber;
            this.handEnvidoWinnerId = this.hostId;
        }
        else {
            this.otherCanEnvidoRespond2 = false;
            this.otherEnvidoCon = envidoNumber;
            this.handEnvidoWinnerId = this.otherId;
        }
        this.tempCanCallTruco = true;
        this.canPlayCards = true;
    }

    handleFlorTambienBy = (playerId: string) => {
        playerId === this.hostId ? this.hostCanEnvidoRespond2 = false : this.otherCanEnvidoRespond2 = false;
        this.hostFlorNumber > this.otherFlorNumber ? this.handEnvidoWinnerId = this.hostId : this.handEnvidoWinnerId = this.otherId;
        this.tempCanCallTruco = true;
        this.canPlayCards = true;
    }
}