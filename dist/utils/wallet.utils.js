"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizePath = void 0;
var logger_utils_1 = __importDefault(require("./logger.utils"));
var logger = new logger_utils_1.default();
var TAG = '[WalletUtils]';
function standardizePath(path, purpose, coinType) {
    logger.info(TAG + " [standardizePath]");
    var disected = path.split('/');
    // BASE ON BIP44 DERIVATION PATH
    if (disected.length !== 6) {
        throw new Error('Invalid Path');
    }
    return "m/" + purpose + "/" + coinType + "/" + disected[3] + "/" + disected[4] + "/" + disected[5];
}
exports.standardizePath = standardizePath;
