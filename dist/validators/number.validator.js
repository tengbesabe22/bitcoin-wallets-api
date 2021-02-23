"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWholeNumber = void 0;
function isWholeNumber(num) {
    if (num % 1 === 0)
        return true;
    else
        return false;
}
exports.isWholeNumber = isWholeNumber;
