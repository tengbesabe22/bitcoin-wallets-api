import { generateBip49Wallet, generateBech32Wallet } from '../wallets';

describe('P2SH SEGWIT WALLETS', () => {
  it('should generate correct P2SH Segwit wallet', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/49'/0'/0'/0/1";
    const wallet = generateBip49Wallet(mnemonic, path);

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

  it('should generate correct P2SH Segwit wallet with different path purpose', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/77'/0'/0'/0/1";
    const wallet = generateBip49Wallet(mnemonic, path);

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

  it('should throw error on invalid mnemonic phrase', () => {
    // 11 words
    const mnemonic = 'trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/49'/0'/0'/0/1";
    expect(() => {
      generateBip49Wallet(mnemonic, path)
    }).toThrow('Invalid Mnemonic');
  });

  it('should throw error on invalid path with incomplete data', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    // invalid as per bip 44 derivation path
    const path = "m/49'/0'/0'/";
    expect(() => {
      generateBip49Wallet(mnemonic, path)
    }).toThrow('Invalid Path');
  });
});

describe('BECH32 SEGWIT WALLETS', () => {
  it('should generate correct P2SH Segwit wallet', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/84'/0'/0'/0/1";
    const wallet = generateBech32Wallet(mnemonic, path);

    if (process.env.BITCOIN_NETWORK === 'bitcoin') {
      expect(wallet).toStrictEqual({
        address: 'bc1qc6yekegsydjxva8x4cc8mc7me3d47hwjwpzcn7',
        publicKey: '031a4b2acc3ad1f2e90033c44a0e46581e49a6f97061b7e41ff10d1ad9ff195ff6',
        privateKey: '7a985db15c3b8cfd50af2792afe0f623f1539861abb07b0b7b3a51d6c4a85ebf' });
    }
    else if (process.env.BITCOIN_NETWORK === 'testnet') {
      expect(wallet).toStrictEqual({
        address: 'tb1qc6yekegsydjxva8x4cc8mc7me3d47hwjy8etgd',
        publicKey: '031a4b2acc3ad1f2e90033c44a0e46581e49a6f97061b7e41ff10d1ad9ff195ff6',
        privateKey: '7a985db15c3b8cfd50af2792afe0f623f1539861abb07b0b7b3a51d6c4a85ebf' });
    }
  });

  it('should generate correct P2SH Segwit wallet with different path purpose', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/77'/0'/0'/0/1";
    const wallet = generateBech32Wallet(mnemonic, path);

    if (process.env.BITCOIN_NETWORK === 'bitcoin') {
      expect(wallet).toStrictEqual({
        address: 'bc1qc6yekegsydjxva8x4cc8mc7me3d47hwjwpzcn7',
        publicKey: '031a4b2acc3ad1f2e90033c44a0e46581e49a6f97061b7e41ff10d1ad9ff195ff6',
        privateKey: '7a985db15c3b8cfd50af2792afe0f623f1539861abb07b0b7b3a51d6c4a85ebf' });
    }
    else if (process.env.BITCOIN_NETWORK === 'testnet') {
      expect(wallet).toStrictEqual({
        address: 'tb1qc6yekegsydjxva8x4cc8mc7me3d47hwjy8etgd',
        publicKey: '031a4b2acc3ad1f2e90033c44a0e46581e49a6f97061b7e41ff10d1ad9ff195ff6',
        privateKey: '7a985db15c3b8cfd50af2792afe0f623f1539861abb07b0b7b3a51d6c4a85ebf' });
    }
  });

  it('should throw error on invalid mnemonic phrase', () => {
    // 11 words
    const mnemonic = 'trend spy slab have below process angle thunder asthma panda wrestle';
    const path = "m/84'/0'/0'/0/1";
    expect(() => {
      generateBech32Wallet(mnemonic, path)
    }).toThrow('Invalid Mnemonic');
  });

  it('should throw error on invalid path with incomplete data', () => {
    const mnemonic = 'ocean trend spy slab have below process angle thunder asthma panda wrestle';
    // invalid as per bip 44 derivation path
    const path = "m/84'/0'/0'/";
    expect(() => {
      generateBech32Wallet(mnemonic, path)
    }).toThrow('Invalid Path');
  });
});