"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
var logger_utils_1 = __importDefault(require("../utils/logger.utils"));
var logger = new logger_utils_1.default();
function loggerMiddleware(req, res, next) {
    logger.info(req.method + " " + req.originalUrl);
    var start = new Date().getTime();
    res.on('finish', function () {
        var elapsed = new Date().getTime() - start;
        logger.info(req.method + " " + req.originalUrl + " " + res.statusCode + " " + elapsed + "ms");
    });
    next();
}
exports.loggerMiddleware = loggerMiddleware;
