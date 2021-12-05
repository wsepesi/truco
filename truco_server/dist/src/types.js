"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardOrder = exports.CardIds = exports.Card = void 0;
class Card {
    constructor(number, suit, id, order) {
        this.number = number;
        this.suit = suit;
        this.id = id;
        this.order = order;
    }
}
exports.Card = Card;
var CardIds;
(function (CardIds) {
    CardIds[CardIds["Swords1"] = 1] = "Swords1";
    CardIds[CardIds["Swords2"] = 2] = "Swords2";
    CardIds[CardIds["Swords3"] = 3] = "Swords3";
    CardIds[CardIds["Swords4"] = 4] = "Swords4";
    CardIds[CardIds["Swords5"] = 5] = "Swords5";
    CardIds[CardIds["Swords6"] = 6] = "Swords6";
    CardIds[CardIds["Swords7"] = 7] = "Swords7";
    CardIds[CardIds["Swords10"] = 8] = "Swords10";
    CardIds[CardIds["Swords11"] = 9] = "Swords11";
    CardIds[CardIds["Swords12"] = 10] = "Swords12";
    CardIds[CardIds["Pickles1"] = 11] = "Pickles1";
    CardIds[CardIds["Pickles2"] = 12] = "Pickles2";
    CardIds[CardIds["Pickles3"] = 13] = "Pickles3";
    CardIds[CardIds["Pickles4"] = 14] = "Pickles4";
    CardIds[CardIds["Pickles5"] = 15] = "Pickles5";
    CardIds[CardIds["Pickles6"] = 16] = "Pickles6";
    CardIds[CardIds["Pickles7"] = 17] = "Pickles7";
    CardIds[CardIds["Pickles10"] = 18] = "Pickles10";
    CardIds[CardIds["Pickles11"] = 19] = "Pickles11";
    CardIds[CardIds["Pickles12"] = 20] = "Pickles12";
    CardIds[CardIds["Coins1"] = 21] = "Coins1";
    CardIds[CardIds["Coins2"] = 22] = "Coins2";
    CardIds[CardIds["Coins3"] = 23] = "Coins3";
    CardIds[CardIds["Coins4"] = 24] = "Coins4";
    CardIds[CardIds["Coins5"] = 25] = "Coins5";
    CardIds[CardIds["Coins6"] = 26] = "Coins6";
    CardIds[CardIds["Coins7"] = 27] = "Coins7";
    CardIds[CardIds["Coins10"] = 28] = "Coins10";
    CardIds[CardIds["Coins11"] = 29] = "Coins11";
    CardIds[CardIds["Coins12"] = 30] = "Coins12";
    CardIds[CardIds["Cups1"] = 31] = "Cups1";
    CardIds[CardIds["Cups2"] = 32] = "Cups2";
    CardIds[CardIds["Cups3"] = 33] = "Cups3";
    CardIds[CardIds["Cups4"] = 34] = "Cups4";
    CardIds[CardIds["Cups5"] = 35] = "Cups5";
    CardIds[CardIds["Cups6"] = 36] = "Cups6";
    CardIds[CardIds["Cups7"] = 37] = "Cups7";
    CardIds[CardIds["Cups10"] = 38] = "Cups10";
    CardIds[CardIds["Cups11"] = 39] = "Cups11";
    CardIds[CardIds["Cups12"] = 40] = "Cups12";
})(CardIds = exports.CardIds || (exports.CardIds = {}));
var CardOrder;
(function (CardOrder) {
    CardOrder[CardOrder["Swords1"] = 1] = "Swords1";
    CardOrder[CardOrder["Pickles1"] = 2] = "Pickles1";
    CardOrder[CardOrder["Swords7"] = 3] = "Swords7";
    CardOrder[CardOrder["Coins7"] = 4] = "Coins7";
    CardOrder[CardOrder["Swords3"] = 5] = "Swords3";
    CardOrder[CardOrder["Pickles3"] = 5] = "Pickles3";
    CardOrder[CardOrder["Coins3"] = 5] = "Coins3";
    CardOrder[CardOrder["Cups3"] = 5] = "Cups3";
    CardOrder[CardOrder["Swords2"] = 6] = "Swords2";
    CardOrder[CardOrder["Pickles2"] = 6] = "Pickles2";
    CardOrder[CardOrder["Coins2"] = 6] = "Coins2";
    CardOrder[CardOrder["Cups2"] = 6] = "Cups2";
    CardOrder[CardOrder["Coins1"] = 7] = "Coins1";
    CardOrder[CardOrder["Cups1"] = 7] = "Cups1";
    CardOrder[CardOrder["Swords12"] = 8] = "Swords12";
    CardOrder[CardOrder["Pickles12"] = 8] = "Pickles12";
    CardOrder[CardOrder["Coins12"] = 8] = "Coins12";
    CardOrder[CardOrder["Cups12"] = 8] = "Cups12";
    CardOrder[CardOrder["Swords11"] = 9] = "Swords11";
    CardOrder[CardOrder["Pickles11"] = 9] = "Pickles11";
    CardOrder[CardOrder["Coins11"] = 9] = "Coins11";
    CardOrder[CardOrder["Cups11"] = 9] = "Cups11";
    CardOrder[CardOrder["Swords10"] = 10] = "Swords10";
    CardOrder[CardOrder["Pickles10"] = 10] = "Pickles10";
    CardOrder[CardOrder["Coins10"] = 10] = "Coins10";
    CardOrder[CardOrder["Cups10"] = 10] = "Cups10";
    CardOrder[CardOrder["Pickles7"] = 11] = "Pickles7";
    CardOrder[CardOrder["Cups7"] = 11] = "Cups7";
    CardOrder[CardOrder["Swords6"] = 12] = "Swords6";
    CardOrder[CardOrder["Pickles6"] = 12] = "Pickles6";
    CardOrder[CardOrder["Coins6"] = 12] = "Coins6";
    CardOrder[CardOrder["Cups6"] = 12] = "Cups6";
    CardOrder[CardOrder["Swords5"] = 13] = "Swords5";
    CardOrder[CardOrder["Pickles5"] = 13] = "Pickles5";
    CardOrder[CardOrder["Coins5"] = 13] = "Coins5";
    CardOrder[CardOrder["Cups5"] = 13] = "Cups5";
    CardOrder[CardOrder["Swords4"] = 14] = "Swords4";
    CardOrder[CardOrder["Pickles4"] = 14] = "Pickles4";
    CardOrder[CardOrder["Coins4"] = 14] = "Coins4";
    CardOrder[CardOrder["Cups4"] = 14] = "Cups4";
})(CardOrder = exports.CardOrder || (exports.CardOrder = {}));
//# sourceMappingURL=types.js.map