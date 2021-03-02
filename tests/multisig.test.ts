import { generateP2SHWallet } from '../src/wallets';

describe('MULTISIGNATURE WALLETS', () => {
  it('should generate correct multisig P2SH address', () => {
    
    const wallet = generateP2SHWallet(2, 3, [
      "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
      "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
      "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
    ]);
    
    if (process.env.BITCOIN_NETWORK === 'bitcoin') {
      expect(wallet.address).toBe('3AQr9FqeYaCb3F67SJNGMVFuA61HRjFMUS');
    }
    else (process.env.BITCOIN_NETWORK === 'testnet')
      expect(wallet.address).toBe('2N1y4CzmgA2hwF2if7Rz8ySFANSDTHLN8fi');
  });
})