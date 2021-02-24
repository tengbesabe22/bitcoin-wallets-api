
export function standardizePath(path: string, purpose: string, coinType: string) {
  const disected = path.split('/');
  return `m/${purpose}/${coinType}/${disected[3]}/${disected[4]}/${disected[5]}`;
}