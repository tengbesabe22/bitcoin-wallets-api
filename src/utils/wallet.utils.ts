import Logger from './logger.utils';
const logger = new Logger();
const TAG = '[WalletUtils]';
export function standardizePath(path: string, purpose: string, coinType: string) {
  logger.info(`${TAG} [standardizePath]`)
  const disected = path.split('/');

  // BASE ON BIP44 DERIVATION PATH
  if (disected.length !== 6) {
    throw new Error('Invalid Path');
  }
  return `m/${purpose}/${coinType}/${disected[3]}/${disected[4]}/${disected[5]}`;
}