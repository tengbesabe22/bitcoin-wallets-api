import * as bitcoin from 'bitcoinjs-lib';
import { BadError } from './responses/BadError';
import { HttpError } from './responses/HttpError';
import { isWholeNumber } from './validators/number.validator';

const TAG = '[WalletService]';
/**
 * Generate Multisignature P2SH wallet
 * @param n Number of keys neeeded to perform transaction
 * @param m Total number of addresses
 * @param publicKeys 
 */
export function generateP2SHWallet(n: number, m: number, publicKeys: string[]) {
  const METHOD = '[generateP2SHWallet]';
  console.info(`${TAG} ${METHOD}`);

  if (Number.isNaN(Number(m)) || Number.isNaN(Number(n))) {
    throw new BadError('Invalid M or N, must be a number')
  }

  if (!isWholeNumber(m) || !isWholeNumber(n)) {
    throw new BadError('M or N must be a whole number');
  }

  // TODO: Add more validation with public keys
  let pubkeys: Buffer[] = [];
  for(let i: number = 0; i < publicKeys.length; i++) {
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
      redeem: bitcoin.payments.p2ms({ m: Number(n), pubkeys }),
    });
  } catch (BitcoinError) {
    throw new HttpError(new Date(), 500, BitcoinError.message)
  }

  return wallet.address;
}
