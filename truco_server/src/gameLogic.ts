import { Card, CardIds, CardOrder, GameType } from "./types";

const HOST_TOKEN_VALUE = 0;
const OTHER_TOKEN_VALUE = 1;

export default class Game {
    constructor(
        public gameId: string,

        public hostId: string,
        public otherId: string,
    
        public hostPoints: number,
        public otherPoints: number,
    
        public deck: Card[],
    
        public hostCards: Card[],
        public otherCards: Card[],
        public cardsPlayedInHand: number,
        public trick1Cards: Card[],
        public trick2Cards: Card[],
        public trick3Cards: Card[],
    
        public hostHasDeck: boolean,
        public hostTurn: boolean,
        public canPlayCards: boolean,
    
        public handTrucoPoints: number,
        public handEnvidoPoints: number,
        public handTrucoWinnerId: string,
        public handEnvidoWinnerId: string,
        public handLiarId: string,
    
        public hostCalledEnvido: boolean,
        public otherCalledEnvido: boolean,
        public hostEnvidoCon: number,
        public otherEnvidoCon: number,
        public hostFlorNumber: number,
        public otherFlorNumber: number,
    
        public canCallTruco: boolean,
        public canCallEnvido: boolean,
        public tempCanCallTruco: boolean,
        public tempCanCallEnvido: boolean,
        public hostCanTrucoRespond: boolean,
        public otherCanTrucoRespond: boolean,
        public hostCanRetrucoAfterQuiero: boolean,
        public otherCanRetrucoAfterQuiero: boolean,
        public hostCanEnvidoRespond1: boolean,
        public otherCanEnvidoRespond1: boolean,
        public hostCanEnvidoRespond2: boolean,
        public otherCanEnvidoRespond2: boolean,
        public hostHasFlor: boolean,
        public otherHasFlor: boolean,

        public endOfHand: boolean,
        public endOfGame: boolean
    ) {}

    static fromDb(game: GameType): Game {
        const {
            gameId,
            hostId,
            otherId,
            hostPoints,
            otherPoints,
            deck,
            hostCards,
            otherCards,
            cardsPlayedInHand,
            trick1Cards,
            trick2Cards,
            trick3Cards,
            hostHasDeck,
            hostTurn,
            canPlayCards,
            handTrucoPoints,
            handEnvidoPoints,
            handTrucoWinnerId,
            handEnvidoWinnerId,
            handLiarId,
            hostCalledEnvido,
            otherCalledEnvido,
            hostEnvidoCon,
            otherEnvidoCon,
            hostFlorNumber,
            otherFlorNumber,
            canCallTruco,
            canCallEnvido,
            tempCanCallTruco,
            tempCanCallEnvido,
            hostCanTrucoRespond,
            otherCanTrucoRespond,
            hostCanRetrucoAfterQuiero,
            otherCanRetrucoAfterQuiero,
            hostCanEnvidoRespond1,
            otherCanEnvidoRespond1,
            hostCanEnvidoRespond2,
            otherCanEnvidoRespond2,
            hostHasFlor,
            otherHasFlor,
            endOfHand,
            endOfGame
        } = game;
        return new Game(
            gameId,
            hostId,
            otherId,
            hostPoints,
            otherPoints,
            deck,
            hostCards,
            otherCards,
            cardsPlayedInHand,
            trick1Cards,
            trick2Cards,
            trick3Cards,
            hostHasDeck,
            hostTurn,
            canPlayCards,
            handTrucoPoints,
            handEnvidoPoints,
            handTrucoWinnerId,
            handEnvidoWinnerId,
            handLiarId,
            hostCalledEnvido,
            otherCalledEnvido,
            hostEnvidoCon,
            otherEnvidoCon,
            hostFlorNumber,
            otherFlorNumber,
            canCallTruco,
            canCallEnvido,
            tempCanCallTruco,
            tempCanCallEnvido,
            hostCanTrucoRespond,
            otherCanTrucoRespond,
            hostCanRetrucoAfterQuiero,
            otherCanRetrucoAfterQuiero,
            hostCanEnvidoRespond1,
            otherCanEnvidoRespond1,
            hostCanEnvidoRespond2,
            otherCanEnvidoRespond2,
            hostHasFlor,
            otherHasFlor,
            endOfHand,
            endOfGame
        );
    }

    static newGame(gameId: string, hostId: string, otherId: string): Game {
        const game = new Game(
            gameId,
            hostId,
            otherId,
            0,
            0,
            [],
            [],
            [],
            0,
            [],
            [],
            [],
            false,
            true,
            true,
            1,
            0,
            '',
            '',
            '',
            false,
            false,
            0,
            0,
            0,
            0,
            true,
            true,
            true,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        );
        game.resetDeck();
        return game;
    }

    forfeit = (playerId: string): void => {
        this.endOfGame = true;
        if (playerId === this.hostId) {
            this.hostPoints = -1;
        }
        else {
            this.otherPoints = -1;
        }
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

    isHandOver = () => {
        return this.endOfHand;
    }

    isGameOver = () => {
        if (this.hostPoints < 24 || this.otherPoints < 24) {
            this.endOfGame = false;
        }
        else {
            const absDiff = Math.abs(this.hostPoints - this.otherPoints);
            this.endOfGame = absDiff >= 2;
        }
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
            this.hostFlorNumber += card.envidoWorth;
        })
    }

    determineOtherFlorNumber = () => {
        this.otherFlorNumber += 20;
        this.otherCards.forEach((card) => {
            this.otherFlorNumber += card.envidoWorth;
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
        this.hostHasDeck = !this.hostHasDeck;
    }

    //initialize the hand
    startHand = () => {
        this.handEnvidoWinnerId = '';
        this.handTrucoWinnerId = '';
        this.handTrucoPoints = 1;
        this.handEnvidoPoints = 0;
        this.handLiarId = '';
        this.resetDeck();
        this.shuffle();
        this.dealAll();
        this.changeDeck();
        this.trick1Cards = [null, null];
        this.trick2Cards = [null, null];
        this.trick3Cards = [null, null];
        this.endOfHand = false;
        this.hostTurn = this.hostHasDeck;

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
        let hostLied = false
        let otherLied = false

        //player called envido, but did not actually have envido
        if (this.hostCalledEnvido) {
            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null) {
                if (
                    this.trick1Cards[HOST_TOKEN_VALUE].suit !== this.trick2Cards[HOST_TOKEN_VALUE].suit &&
                    this.trick1Cards[HOST_TOKEN_VALUE].suit !== this.trick3Cards[HOST_TOKEN_VALUE].suit &&
                    this.trick2Cards[HOST_TOKEN_VALUE].suit !== this.trick3Cards[HOST_TOKEN_VALUE].suit
                    ) {
                        hostLied = true;
                }
            }
        }
        if (this.otherCalledEnvido) {
            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null) {
                if (
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit !== this.trick2Cards[OTHER_TOKEN_VALUE].suit &&
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit !== this.trick3Cards[OTHER_TOKEN_VALUE].suit &&
                    this.trick2Cards[OTHER_TOKEN_VALUE].suit !== this.trick3Cards[OTHER_TOKEN_VALUE].suit
                    ) {
                        otherLied = true;
                }
            }
        }

        //player called envido with a number, but cannot actually have that envido
        if (this.hostEnvidoCon !== 0) {
            //did not have an envido at all
            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null) {
                if (
                    this.trick1Cards[HOST_TOKEN_VALUE].suit !== this.trick2Cards[HOST_TOKEN_VALUE].suit &&
                    this.trick1Cards[HOST_TOKEN_VALUE].suit !== this.trick3Cards[HOST_TOKEN_VALUE].suit &&
                    this.trick2Cards[HOST_TOKEN_VALUE].suit !== this.trick3Cards[HOST_TOKEN_VALUE].suit
                    ) {
                        hostLied = true;
                }
            }

            //had a different number
            if (this.trick2Cards[HOST_TOKEN_VALUE] !== null) {
                //on first two tricks
                if (
                    this.trick1Cards[HOST_TOKEN_VALUE].suit === this.trick2Cards[HOST_TOKEN_VALUE].suit &&
                    20 + this.trick1Cards[HOST_TOKEN_VALUE].envidoWorth + this.trick2Cards[HOST_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    ) {
                        hostLied = true;
                }
            }
            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null) {
                //on 1 and 3 or 2 and 3
                if ((
                    this.trick1Cards[HOST_TOKEN_VALUE].suit === this.trick3Cards[HOST_TOKEN_VALUE].suit &&
                    20 + this.trick1Cards[HOST_TOKEN_VALUE].envidoWorth + this.trick3Cards[HOST_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    )||(
                    this.trick2Cards[HOST_TOKEN_VALUE].suit === this.trick3Cards[HOST_TOKEN_VALUE].suit &&
                    20 + this.trick2Cards[HOST_TOKEN_VALUE].envidoWorth + this.trick3Cards[HOST_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    )) {
                        hostLied = true;
                }
            }

            //cannot have number
            if (this.trick2Cards[HOST_TOKEN_VALUE] !== null) {
                let numberNeeded1 = this.hostEnvidoCon - 20 - this.trick1Cards[HOST_TOKEN_VALUE].envidoWorth;
                let numberNeeded2 = this.hostEnvidoCon - 20 - this.trick2Cards[HOST_TOKEN_VALUE].envidoWorth;
                //card is not possible if number is too large
                let card1Possible = numberNeeded1 > 7 ? false : true;
                let card2Possible = numberNeeded2 > 7 ? false : true;

                //if the number needed is 0, there are enough options such that the player cannot be lying
                if (numberNeeded1 !== 0 && numberNeeded2 !== 0) {
                    let hostMightLie = true;
                    let neededCard1 = new Card(numberNeeded1, this.trick1Cards[HOST_TOKEN_VALUE].suit, 91, 91);
                    let neededCard2 = new Card(numberNeeded2, this.trick2Cards[HOST_TOKEN_VALUE].suit, 92, 92);
                    if ((this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit && this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard1.number)
                        || (this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit && this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard2.number)
                        ) {
                        hostMightLie = false;
                    }
                    if (hostMightLie) {
                        if (card1Possible && !card2Possible) {
                            if ( (this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit)
                                || (this.trick2Cards[OTHER_TOKEN_VALUE] !== null && this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit)
                                ) {
                                hostLied = true;
                            }
                            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null && this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit) {
                                hostLied = true;
                            }
                        }
                        if (!card1Possible && card2Possible) {
                            if ( (this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit)
                                || (this.trick2Cards[OTHER_TOKEN_VALUE] !== null && this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit)
                                ) {
                                hostLied = true;
                            }
                            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null && this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit) {
                                hostLied = true;
                            }
                        }
                        if (card1Possible && card2Possible) {
                            if ((this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                    this.trick2Cards[OTHER_TOKEN_VALUE] !== null && this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit) ||
                                (this.trick2Cards[OTHER_TOKEN_VALUE] !== null && this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                    this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit)
                            ) {
                                hostLied = true;
                            }
                            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null) {
                                if ((this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick3Cards[OTHER_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit)
                                ) {
                                    hostLied = true;
                                }
                            }
                        }
                        if (!card1Possible && !card2Possible) {
                            hostLied = true;
                        }
                    }
                }
            }
        }
        if (this.otherEnvidoCon !== 0) {
            //did not have an envido at all
            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null) {
                if (
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit !== this.trick2Cards[OTHER_TOKEN_VALUE].suit &&
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit !== this.trick3Cards[OTHER_TOKEN_VALUE].suit &&
                    this.trick2Cards[OTHER_TOKEN_VALUE].suit !== this.trick3Cards[OTHER_TOKEN_VALUE].suit
                    ) {
                        otherLied = true;
                }
            }

            //had a different number
            if (this.trick2Cards[OTHER_TOKEN_VALUE] !== null) {
                //on first two tricks
                if (
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit === this.trick2Cards[OTHER_TOKEN_VALUE].suit &&
                    20 + this.trick1Cards[OTHER_TOKEN_VALUE].envidoWorth + this.trick2Cards[OTHER_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    ) {
                        otherLied = true;
                }
            }
            if (this.trick3Cards[OTHER_TOKEN_VALUE] !== null) {
                //on 1 and 3 or 2 and 3
                if ((
                    this.trick1Cards[OTHER_TOKEN_VALUE].suit === this.trick3Cards[OTHER_TOKEN_VALUE].suit &&
                    20 + this.trick1Cards[OTHER_TOKEN_VALUE].envidoWorth + this.trick3Cards[OTHER_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    )||(
                    this.trick2Cards[OTHER_TOKEN_VALUE].suit === this.trick3Cards[OTHER_TOKEN_VALUE].suit &&
                    20 + this.trick2Cards[OTHER_TOKEN_VALUE].envidoWorth + this.trick3Cards[OTHER_TOKEN_VALUE].envidoWorth !== this.hostEnvidoCon
                    )) {
                        otherLied = true;
                }
            }

            //cannot have number
            if (this.trick2Cards[OTHER_TOKEN_VALUE] !== null) {
                let numberNeeded1 = this.otherEnvidoCon - 20 - this.trick1Cards[OTHER_TOKEN_VALUE].envidoWorth;
                let numberNeeded2 = this.otherEnvidoCon - 20 - this.trick2Cards[OTHER_TOKEN_VALUE].envidoWorth;
                //card is not possible if number is too large
                let card1Possible = numberNeeded1 > 7 ? false : true;
                let card2Possible = numberNeeded2 > 7 ? false : true;

                //if the number needed is 0, there are enough options such that the player cannot be lying
                if (numberNeeded1 !== 0 && numberNeeded2 !== 0) {
                    let otherMightLie = true;
                    let neededCard1 = new Card(numberNeeded1, this.trick1Cards[OTHER_TOKEN_VALUE].suit, 91, 91);
                    let neededCard2 = new Card(numberNeeded2, this.trick2Cards[OTHER_TOKEN_VALUE].suit, 92, 92);
                    if ((this.trick2Cards[OTHER_TOKEN_VALUE].suit === neededCard1.suit && this.trick2Cards[OTHER_TOKEN_VALUE].number === neededCard1.number)
                        || (this.trick1Cards[OTHER_TOKEN_VALUE].suit === neededCard2.suit && this.trick1Cards[OTHER_TOKEN_VALUE].number === neededCard2.number)
                        ) {
                        otherMightLie = false;
                    }

                    if (otherMightLie) {
                        if (card1Possible && !card2Possible) {
                            if ( (this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit)
                                || (this.trick2Cards[HOST_TOKEN_VALUE] !== null && this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit)
                                ) {
                                    otherLied = true;
                            }
                            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null && this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit) {
                                otherLied = true;
                            }
                        }
                        if (!card1Possible && card2Possible) {
                            if ( (this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit)
                                || (this.trick2Cards[HOST_TOKEN_VALUE] !== null && this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit)
                                ) {
                                    otherLied = true;
                            }
                            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null && this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit) {
                                otherLied = true;
                            }
                        }
                        if (card1Possible && card2Possible) {
                            if ((this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                    this.trick2Cards[HOST_TOKEN_VALUE] !== null && this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit) ||
                                (this.trick2Cards[HOST_TOKEN_VALUE] !== null && this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                    this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit)
                            ) {
                                otherLied = true;
                            }
                            if (this.trick3Cards[HOST_TOKEN_VALUE] !== null) {
                                if ((this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick1Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick1Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit) ||
                                    (this.trick3Cards[HOST_TOKEN_VALUE].number === neededCard1.number && this.trick3Cards[HOST_TOKEN_VALUE].suit === neededCard1.suit &&
                                        this.trick2Cards[HOST_TOKEN_VALUE].number === neededCard2.number && this.trick2Cards[HOST_TOKEN_VALUE].suit === neededCard2.suit)
                                ) {
                                    otherLied = true;
                                }
                            }
                        }
                        if (!card1Possible && !card2Possible) {
                            otherLied = true;
                        }
                    }
                }
            }
        }

        if (hostLied && otherLied) {
            this.handEnvidoPoints = 0;
            this.handEnvidoWinnerId = '';
            this.handLiarId = "both";
        }
        else if (hostLied) {
            this.handLiarId = this.hostId;
            if (this.otherCalledEnvido) {
                this.handEnvidoWinnerId = this.otherId;
            }
        }
        else if (otherLied) {
            this.handLiarId = this.otherId;
            if (this.hostCalledEnvido) {
                this.handEnvidoWinnerId = this.hostId;
            }
        }
    }

    checkIfTrucoWinner = () => {
        if(this.cardsPlayedInHand < 4 || this.cardsPlayedInHand === 5) return;
        if(this.trick2Cards.length !== 2) return;
        //host wins
        if (
            (//win the first two tricks
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//win the third trick
            this.cardsPlayedInHand === 6 &&
            this.trick3Cards[HOST_TOKEN_VALUE].order < this.trick3Cards[OTHER_TOKEN_VALUE].order
            ) || (//tie the first trick, win the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//win the first trick, tie the second trick
            this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order
            ) || (//tie all three tricks with deck
            this.cardsPlayedInHand === 6 &&
            this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
            this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order &&
            this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order &&
            this.hostHasDeck
            ) || (//win the first trick, tie the third trick
                this.cardsPlayedInHand === 6 &&
                this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick3Cards[HOST_TOKEN_VALUE].order === this.trick3Cards[OTHER_TOKEN_VALUE].order
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
                    this.cardsPlayedInHand === 6 &&
                this.trick3Cards[HOST_TOKEN_VALUE].order > this.trick3Cards[OTHER_TOKEN_VALUE].order
                ) || (//tie the first trick, win the second trick
                this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order > this.trick2Cards[OTHER_TOKEN_VALUE].order
                ) || (//win the first trick, tie the second trick
                this.trick1Cards[HOST_TOKEN_VALUE].order > this.trick1Cards[OTHER_TOKEN_VALUE].order &&
                this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order
                ) || (//tie all three tricks with deck
                    this.cardsPlayedInHand === 6 &&
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
    }

    distributeEnvidoPoints = () => {
        if (this.handEnvidoWinnerId === this.hostId) this.hostPoints += this.handEnvidoPoints;
        if (this.handEnvidoWinnerId === this.otherId) this.otherPoints += this.handEnvidoPoints;
    }

    //end the hand
    endHand = () => {
        this.checkLyingPoints();
        this.distributeTrucoPoints();
        this.distributeEnvidoPoints();

        this.endOfHand = true;

        this.hostCards = [];
        this.otherCards = [];
        this.cardsPlayedInHand = 0;
        this.isGameOver();
        if (this.endOfGame) this.endOfHand = false;
    }

    //will receive the index of which card the user clicked on
    playCard = (cardId: number, playerId: string) => {
        // console.log('playCard', cardId, playerId);
        //host cards
        if (playerId === this.hostId) {
            // console.log(this.hostCards)
            if (this.cardsPlayedInHand === 0 || this.cardsPlayedInHand === 1) {
                this.trick1Cards[HOST_TOKEN_VALUE] = this.hostCards.find(card => card.id === cardId);
            }
            if (this.cardsPlayedInHand === 2 || this.cardsPlayedInHand === 3) {
                this.trick2Cards[HOST_TOKEN_VALUE] = this.hostCards.find(card => card.id === cardId);;
            }
            if (this.cardsPlayedInHand === 4 || this.cardsPlayedInHand === 5) {
                this.trick3Cards[HOST_TOKEN_VALUE] = this.hostCards.find(card => card.id === cardId);;
            }
            this.hostCards = this.hostCards.filter(card => card.id !== cardId);
            // this.hostCards.splice(index, 1);
        }
        //other cards
        else {
            // console.log(this.otherCards)
            if (this.cardsPlayedInHand === 0 || this.cardsPlayedInHand === 1) {
                this.trick1Cards[OTHER_TOKEN_VALUE] = this.otherCards.find(card => card.id === cardId);
            }
            if (this.cardsPlayedInHand === 2 || this.cardsPlayedInHand === 3) {
                this.trick2Cards[OTHER_TOKEN_VALUE] = this.otherCards.find(card => card.id === cardId);
            }
            if (this.cardsPlayedInHand === 4 || this.cardsPlayedInHand === 5) {
                this.trick3Cards[OTHER_TOKEN_VALUE] = this.otherCards.find(card => card.id === cardId);
            }
            this.otherCards = this.otherCards.filter(card => card.id !== cardId);
        }
        this.cardsPlayedInHand++;
        if (this.cardsPlayedInHand === 2) {
            // console.log('case a')
            if (this.trick1Cards[HOST_TOKEN_VALUE].order < this.trick1Cards[OTHER_TOKEN_VALUE].order || (this.trick1Cards[HOST_TOKEN_VALUE].order === this.trick1Cards[OTHER_TOKEN_VALUE].order && playerId===this.hostId)) {
                // console.log('case ai')
                this.hostTurn = true;
            }
            else {
                // console.log('case aii')
                this.hostTurn = false;
            }
        }
        else if (this.cardsPlayedInHand === 4) {
            // console.log('case b')
            if (this.trick2Cards[HOST_TOKEN_VALUE].order < this.trick2Cards[OTHER_TOKEN_VALUE].order || (this.trick2Cards[HOST_TOKEN_VALUE].order === this.trick2Cards[OTHER_TOKEN_VALUE].order && playerId===this.hostId)) {
                // console.log('case bi')
                this.hostTurn = true;
            }
            else {
                // console.log('case bii')
                this.hostTurn = false;
            }
        }
        else {
            // console.log('case c')
            this.hostTurn = !this.hostTurn;
        }
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
        if (playerId === this.hostId) {
            this.hostCanEnvidoRespond1 = false;
            this.handEnvidoWinnerId = this.otherId;
        }
        else {
            this.otherCanEnvidoRespond1 = false;
            this.handEnvidoWinnerId = this.hostId;
        }
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

    handleTengoFlorBy = (playerId: string) => {
        if (playerId === this.hostId) {
            this.hostCanEnvidoRespond2 = false;
            this.otherCanEnvidoRespond2 = true;
        }
        else {
            this.otherCanEnvidoRespond2 = false;
            this.hostCanEnvidoRespond2 = true;
        }
    }

    handleFlorTambienBy = (playerId: string) => {
        playerId === this.hostId ? this.hostCanEnvidoRespond2 = false : this.otherCanEnvidoRespond2 = false;
        this.hostFlorNumber > this.otherFlorNumber ? this.handEnvidoWinnerId = this.hostId : this.handEnvidoWinnerId = this.otherId;
        this.tempCanCallTruco = true;
        this.canPlayCards = true;
    }
}