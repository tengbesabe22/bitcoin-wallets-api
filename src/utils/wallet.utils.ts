import Logger from './logger.utils';
const logger = new Logger();
const TAG = '[WalletUtils]';
export function standardizePath(path: string, purpose: string, coinType: string) {
  logger.info(`${TAG} [standardizePath]`)
  const disected = path.split('/');
  return `m/${purpose}/${coinType}/${disected[3]}/${disected[4]}/${disected[5]}`;
}