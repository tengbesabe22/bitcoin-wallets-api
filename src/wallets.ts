require('dotenv').config();
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import { BadError } from './responses/BadError';
import { HttpError } from './responses/HttpError';
import { HttpSuccess } from './responses/HttpSuccess';
import { isWholeNumber } from './validators/number.validator';
import { standardizePath } from './utils/wallet.utils';
import Logger from './utils/logger.utils';

const TAG = '[WalletService]';
const logger = new Logger()

const bitcoinNetwork: { [key: string]:  bitcoin.Network } = bitcoin.networks;
/**
 * Generate Multisignature P2SH wallet
 * @param n Number of keys neeeded to perform transaction
 * @param m Total number of addresses
 * @param publicKeys 
 */
export function generateP2SHWallet(n: number, m: number, publicKeys: string[]) {
  const METHOD = '[generateP2SHWallet]';
  logger.info(`${TAG} ${METHOD}`);
  const {
    BITCOIN_NETWORK,
  } = process.env;

  if (Number.isNaN(Number(m)) || Number.isNaN(Number(n))) {
    throw new BadError('Invalid M or N, must be a number')
  }

  if (!isWholeNumber(m) || !isWholeNumber(n)) {
    throw new BadError('M or N must be a whole number');
  }

  if (publicKeys.length < Number(m)) {
    throw new BadError('Public key count cannot be less than m');
  }

  // TODO: Add more validation with public keys
  let pubkeys: Buffer[] = [];
  for(let i = 0; i < publicKeys.length; i++) {
    if (publicKeys[i].length !== 66) {
      throw new BadError(`Invalid Public Key on index ${i}`);
    } else {
      pubkeys.push(Buffer.from(publicKeys[i], 'hex'));
    }
  }

  // GENERATE P2SH WALLET
  let wallet: bitcoin.Payment;
  try {
    wallet = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({ m: Number(m), pubkeys, network: bitcoinNetwork[BITCOIN_NETWORK] }),
    });
  } catch (BitcoinError) {
    throw new HttpError(new Date(), 500, BitcoinError.message)
  }

  return new HttpSuccess({address: wallet.address});
}

export function generateBip49Wallet(mnemonic: string, initialPath: string) {
  const METHOD = '[generateBip49Wallet]';
  logger.info(`${TAG} ${METHOD}`);

  if (!bip39.validateMnemonic(mnemonic)) {
    throw new BadError('Invalid Mnemonic');
  }
  const {
    COIN_TYPE
  } = process.env;

  // PURPOSE = 49', COINTYPE = 0'(BITCOIN)
  const path: string = standardizePath(initialPath, "49'", COIN_TYPE);

  const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);
  const root: bitcoin.BIP32Interface = bitcoin.bip32.fromSeed(seed);

  // DERIVE THE CHILD WALLET
  const child: bitcoin.BIP32Interface = root.derivePath(path);
  const wallet: bitcoin.Payment = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoinNetwork[process.env.BITCOIN_NETWORK] }),
  });

  return new HttpSuccess({
    address: wallet.address,
    publicKey: wallet.redeem!.pubkey!.toString('hex'),
    privateKey: child.privateKey!.toString('hex'),
  });
}

export function generateBech32Wallet(mnemonic: string, initialPath: string) {
  const METHOD = '[generateBech32Wallet]';
  logger.info(`${TAG} ${METHOD}`);

  if (!bip39.validateMnemonic(mnemonic)) {
    throw new BadError('Invalid Mnemonic');
  }

  const {
    COIN_TYPE,
  } = process.env;

  // PURPOSE = 49', COINTYPE = 0'(BITCOIN)
  // TODO: environment friendly
  const path: string = standardizePath(initialPath, "84'", COIN_TYPE);

  const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);
  const root: bitcoin.BIP32Interface = bitcoin.bip32.fromSeed(seed);

  // DERIVE CHILD WALLET
  const child: bitcoin.BIP32Interface = root.derivePath(path);
  const { address } = bitcoin.payments.p2wpkh({ pubkey: child.publicKey, network: bitcoinNetwork[process.env.BITCOIN_NETWORK] });

  return new HttpSuccess({
    address,
    publicKey: child.publicKey.toString('hex'),
    privateKey: child.privateKey!.toString('hex'),
  });
}
