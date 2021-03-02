"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wallets_1 = require("../wallets");
describe('P2SH SEGWIT WALLETS', function () {
    it('should generate correct P2SH Segwit wallet', function () {
        var mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
        var path = "m/49'/0'/0'/0/1";
        var wallet = wallets_1.generateBip49Wallet(mnemonic, path);
        if (process.env.BITCOIN_NETWORK === 'bitcoin') {
            expect(wallet).toStrictEqual({
                address: '38xmkTFyCcPtLjM1vcUnz3V6b8w8gZNu39',
                publicKey: '023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709',
                privateKey: '819d03847b88898aeafc75831c5233acc0fb0bc390a1360c581dbae9c488237f',
            });
        }
        else if (process.env.BITCOIN_NETWORK === 'testnet') {
            expect(wallet).toStrictEqual({
                address: '2MzWypCBzp4uEYWyZbk6fbzUMoV9JUivk6i',
                publicKey: '023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709',
                privateKey: '819d03847b88898aeafc75831c5233acc0fb0bc390a1360c581dbae9c488237f',
            });
        }
    });
    it('should generate correct P2SH Segwit wallet with different path purpose', function () {
        var mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
        var path = "m/77'/0'/0'/0/1";
        var wallet = wallets_1.generateBip49Wallet(mnemonic, path);
        if (process.env.BITCOIN_NETWORK === 'bitcoin') {
            expect(wallet).toStrictEqual({
                address: '38xmkTFyCcPtLjM1vcUnz3V6b8w8gZNu39',
                publicKey: '023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709',
                privateKey: '819d03847b88898aeafc75831c5233acc0fb0bc390a1360c581dbae9c488237f',
            });
        }
        else if (process.env.BITCOIN_NETWORK === 'testnet') {
            expect(wallet).toStrictEqual({
                address: '2MzWypCBzp4uEYWyZbk6fbzUMoV9JUivk6i',
                publicKey: '023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709',
                privateKey: '819d03847b88898aeafc75831c5233acc0fb0bc390a1360c581dbae9c488237f',
            });
        }
    });
    it('should throw error on invalid mnemonic phrase', function () {
        // 11 words
        var mnemonic = 'trend spy slab have below process angle thunder asthma panda wrestle';
        var path = "m/49'/0'/0'/0/1";
        expect(function () {
            wallets_1.generateBip49Wallet(mnemonic, path);
        }).toThrow('Invalid Mnemonic');
    });
    it('should throw error on invalid path with incomplete data', function () {
        var mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
        // invalid as per bip 44 derivation path
        var path = "m/49'/0'/0'/";
        expect(function () {
            wallets_1.generateBip49Wallet(mnemonic, path);
        }).toThrow('Invalid Path');
    });
});
