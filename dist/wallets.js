"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBech32Wallet = exports.generateBip49Wallet = exports.generateP2SHWallet = void 0;
require('dotenv').config();
var bitcoin = __importStar(require("bitcoinjs-lib"));
var bip39 = __importStar(require("bip39"));
var BadError_1 = require("./responses/BadError");
var HttpError_1 = require("./responses/HttpError");
var HttpSuccess_1 = require("./responses/HttpSuccess");
var number_validator_1 = require("./validators/number.validator");
var wallet_utils_1 = require("./utils/wallet.utils");
var logger_utils_1 = __importDefault(require("./utils/logger.utils"));
var TAG = '[WalletService]';
var logger = new logger_utils_1.default();
var bitcoinNetwork = bitcoin.networks;
/**
 * Generate Multisignature P2SH wallet
 * @param n Number of keys neeeded to perform transaction
 * @param m Total number of addresses
 * @param publicKeys
 */
function generateP2SHWallet(n, m, publicKeys) {
    var METHOD = '[generateP2SHWallet]';
    logger.info(TAG + " " + METHOD);
    var BITCOIN_NETWORK = process.env.BITCOIN_NETWORK;
    if (Number.isNaN(Number(m)) || Number.isNaN(Number(n))) {
        throw new BadError_1.BadError('Invalid M or N, must be a number');
    }
    if (!number_validator_1.isWholeNumber(m) || !number_validator_1.isWholeNumber(n)) {
        throw new BadError_1.BadError('M or N must be a whole number');
    }
    if (publicKeys.length < Number(m)) {
        throw new BadError_1.BadError('Public key count cannot be less than m');
    }
    // TODO: Add more validation with public keys
    var pubkeys = [];
    for (var i = 0; i < publicKeys.length; i++) {
        if (publicKeys[i].length !== 66) {
            throw new BadError_1.BadError("Invalid Public Key on index " + i);
        }
        else {
            pubkeys.push(Buffer.from(publicKeys[i], 'hex'));
        }
    }
    // GENERATE P2SH WALLET
    var wallet;
    try {
        wallet = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: Number(m), pubkeys: pubkeys, network: bitcoinNetwork[BITCOIN_NETWORK] }),
        });
    }
    catch (BitcoinError) {
        throw new HttpError_1.HttpError(new Date(), 500, BitcoinError.message);
    }
    return new HttpSuccess_1.HttpSuccess({ address: wallet.address });
}
exports.generateP2SHWallet = generateP2SHWallet;
function generateBip49Wallet(mnemonic, initialPath) {
    var METHOD = '[generateBip49Wallet]';
    logger.info(TAG + " " + METHOD);
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new BadError_1.BadError('Invalid Mnemonic');
    }
    var COIN_TYPE = process.env.COIN_TYPE;
    // PURPOSE = 49', COINTYPE = 0'(BITCOIN)
    var path = wallet_utils_1.standardizePath(initialPath, "49'", COIN_TYPE);
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var root = bitcoin.bip32.fromSeed(seed);
    // DERIVE THE CHILD WALLET
    var child = root.derivePath(path);
    var wallet = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoinNetwork[process.env.BITCOIN_NETWORK] }),
    });
    return new HttpSuccess_1.HttpSuccess({
        address: wallet.address,
        publicKey: wallet.redeem.pubkey.toString('hex'),
        privateKey: child.privateKey.toString('hex'),
    });
}
exports.generateBip49Wallet = generateBip49Wallet;
function generateBech32Wallet(mnemonic, initialPath) {
    var METHOD = '[generateBech32Wallet]';
    logger.info(TAG + " " + METHOD);
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new BadError_1.BadError('Invalid Mnemonic');
    }
    var COIN_TYPE = process.env.COIN_TYPE;
    // PURPOSE = 49', COINTYPE = 0'(BITCOIN)
    // TODO: environment friendly
    var path = wallet_utils_1.standardizePath(initialPath, "84'", COIN_TYPE);
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var root = bitcoin.bip32.fromSeed(seed);
    // DERIVE CHILD WALLET
    var child = root.derivePath(path);
    var address = bitcoin.payments.p2wpkh({ pubkey: child.publicKey }).address;
    return new HttpSuccess_1.HttpSuccess({
        address: address,
        publicKey: child.publicKey.toString('hex'),
        privateKey: child.privateKey.toString('hex'),
    });
}
exports.generateBech32Wallet = generateBech32Wallet;
