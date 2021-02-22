import * as bitcoin from 'bitcoinjs-lib';

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

  // TODO: Validate Inputs
  
  // GENERATE P2SH WALLET

  const pubkeys = publicKeys.map(pub => Buffer.from(pub, 'hex'));
  const { address } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2ms({ m: Number(n), pubkeys }),
  });

  return address;
}
