"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger() {
        this.info = function (message) {
            console.info(new Date().toISOString() + " [INFO]: " + message);
        };
        this.error = function (message) {
            console.error(new Date().toISOString() + " [ERROR]: " + message);
        };
    }
    return Logger;
}());
exports.default = Logger;
