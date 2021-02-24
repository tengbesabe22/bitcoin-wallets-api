"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardizePath = void 0;
function standardizePath(path, purpose, coinType) {
    var disected = path.split('/');
    return "m/" + purpose + "/" + coinType + "/" + disected[3] + "/" + disected[4] + "/" + disected[5];
}
exports.standardizePath = standardizePath;
