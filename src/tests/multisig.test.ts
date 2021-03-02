import { generateP2SHWallet } from '../wallets';

describe('MULTISIGNATURE WALLETS', () => {
  it('should generate correct 2-out-of-3 multisig P2SH address', () => {
    
    const wallet = generateP2SHWallet(2, 3, [
      "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
      "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
      "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
    ]);
    if (process.env.BITCOIN_NETWORK === 'bitcoin') {
      expect(wallet.address).toBe('3AQr9FqeYaCb3F67SJNGMVFuA61HRjFMUS');
    }
    else if (process.env.BITCOIN_NETWORK === 'testnet') {
      expect(wallet.address).toBe('2N1y4CzmgA2hwF2if7Rz8ySFANSDTHLN8fi');
    }
  });

  it('should generate correct 3-out-of-3 multisig P2SH address', () => {
    
    const wallet = generateP2SHWallet(3, 3, [
      "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
      "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
      "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
    ]);

    if (process.env.BITCOIN_NETWORK === 'bitcoin') {
      expect(wallet.address).toBe('3LHVRfPEtYooSnknqv4mXgmM7U9aNcEDn4');
    }
    else if (process.env.BITCOIN_NETWORK === 'testnet') {
      expect(wallet.address).toBe('2NBqhVQKGW1K9eaPLX3ge9dkcKpMkCekzxK');
    }
  });

  it('should throw error on public keys length is less than m', () => {
    expect(() => {
      generateP2SHWallet(2, 4, [
        "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
        "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
        "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
      ]);
    }).toThrow('Public key count cannot be less than m');
  });

  it('should throw error on public keys length is more than m', () => {
    expect(() => {
      generateP2SHWallet(2, 3, [
        "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
        "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
        "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6",
        "04b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
      ]);
    }).toThrow('Public key count cannot be more than m');
  });

  it('should throw error on n is greater than m', () => {
    expect(() => {
      generateP2SHWallet(4, 3, [
        "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caf",
        "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
        "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
      ]);
    }).toThrow('Invalid n, cannot be greater than m');
  });

  it('should throw error on invalid public key', () => {
    expect(() => {
      generateP2SHWallet(2, 3, [
        "03af4bb0fac753a87702a6da9aee0dd07338447162940ca7131414ebe869421caff",
        "023fc8a9b508d06b47f92376df12d8a356472676e34037409bd3cc36da235c1709",
        "03b6c2789cfc591f8c16d2cd6f2bc3551c6825febebcc20d5519e57415bb636cd6"
      ]);
    }).toThrow('Invalid Public Key on index 0');
  });
});