export function isPhantomInstalled() {
  return typeof window !== 'undefined' && !!(window as any).solana?.isPhantom;
}

export function isSolletInstalled() {
  return typeof window !== 'undefined' && typeof (window as any).sollet?.postMessage === 'function';
}
