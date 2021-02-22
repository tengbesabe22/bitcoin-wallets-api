"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var wallets_1 = require("./wallets");
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.get('/', function (req, res, next) {
    res.send('Hello Everybody');
});
app.post('/wallets/multisig', function (req, res, next) {
    var address = wallets_1.generateP2SHWallet(req.body.n, req.body.m, req.body.publicKeys);
    res.send({ address: address });
});
var port = process.env.PORT || 7777;
app.listen(port, function () { return console.log("App listening to port " + port); });
