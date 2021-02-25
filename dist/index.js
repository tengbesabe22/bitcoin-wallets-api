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
    var address;
    var _a = req.body, n = _a.n, m = _a.m, publicKeys = _a.publicKeys;
    try {
        address = wallets_1.generateP2SHWallet(n, m, publicKeys);
        res.send({ address: address });
    }
    catch (WalletError) {
        res.status(WalletError.status).send(WalletError);
    }
});
app.post('/wallets/segwit/bip49', function (req, res, next) {
    var _a = req.body, mnemonic = _a.mnemonic, path = _a.path;
    try {
        var wallet = wallets_1.generateBip49Wallet(mnemonic, path);
        res.send(wallet);
    }
    catch (WalletError) {
        res.status(WalletError.status).send(WalletError);
    }
});
app.post('/wallets/segwit/bech32', function (req, res, next) {
    var _a = req.body, mnemonic = _a.mnemonic, path = _a.path;
    try {
        var wallet = wallets_1.generateBech32Wallet(mnemonic, path);
        res.send(wallet);
    }
    catch (WalletError) {
        res.status(WalletError.status).send(WalletError);
    }
});
var port = process.env.PORT || 7777;
app.listen(port, function () { return console.log("App listening to port " + port); });
