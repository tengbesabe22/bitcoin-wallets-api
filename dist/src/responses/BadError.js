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
exports.BadError = void 0;
var HttpError_1 = require("./HttpError");
var BadError = /** @class */ (function (_super) {
    __extends(BadError, _super);
    function BadError(message) {
        if (message === void 0) { message = 'Not Found Error'; }
        return _super.call(this, new Date(), 400, message) || this;
    }
    return BadError;
}(HttpError_1.HttpError));
exports.BadError = BadError;
