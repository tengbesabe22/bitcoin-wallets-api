"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(timestamp, status, message) {
        if (timestamp === void 0) { timestamp = new Date(); }
        if (status === void 0) { status = 500; }
        if (message === void 0) { message = 'Something went wrong'; }
        var _this = _super.call(this) || this;
        _this.timestamp = timestamp;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
