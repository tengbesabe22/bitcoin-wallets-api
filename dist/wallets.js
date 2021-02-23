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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBip49Wallet = exports.generateP2SHWallet = void 0;
var bitcoin = __importStar(require("bitcoinjs-lib"));
var bip39 = __importStar(require("bip39"));
var bip32 = __importStar(require("bip32"));
var BadError_1 = require("./responses/BadError");
var HttpError_1 = require("./responses/HttpError");
var number_validator_1 = require("./validators/number.validator");
var TAG = '[WalletService]';
/**
 * Generate Multisignature P2SH wallet
 * @param n Number of keys neeeded to perform transaction
 * @param m Total number of addresses
 * @param publicKeys
 */
function generateP2SHWallet(n, m, publicKeys) {
    var METHOD = '[generateP2SHWallet]';
    console.info(TAG + " " + METHOD);
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
            redeem: bitcoin.payments.p2ms({ m: Number(m), pubkeys: pubkeys }),
        });
    }
    catch (BitcoinError) {
        throw new HttpError_1.HttpError(new Date(), 500, BitcoinError.message);
    }
    return wallet.address;
}
exports.generateP2SHWallet = generateP2SHWallet;
function generateBip49Wallet(mnemonic, path) {
    var _a;
    var METHOD = '[generateBip49Wallet]';
    console.info(TAG + " " + METHOD);
    if (!bip39.validateMnemonic(mnemonic)) {
        throw new BadError_1.BadError('Invalid Mnemonic');
    }
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    var root = bip32.fromSeed(seed);
    var child = root.derivePath(path);
    var wallet = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoin.networks.bitcoin }),
        network: bitcoin.networks.bitcoin
    });
    return {
        address: wallet.address,
        publicKey: (_a = wallet.redeem) === null || _a === void 0 ? void 0 : _a.pubkey.toString('hex'),
        privateKey: child.toWIF()
    };
}
exports.generateBip49Wallet = generateBip49Wallet;
