"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpSuccess = void 0;
var HttpSuccess = /** @class */ (function () {
    function HttpSuccess(additionalData, message, timestamp, status) {
        if (message === void 0) { message = 'OK'; }
        if (timestamp === void 0) { timestamp = new Date(); }
        if (status === void 0) { status = 200; }
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.data = additionalData;
    }
    return HttpSuccess;
}());
exports.HttpSuccess = HttpSuccess;
