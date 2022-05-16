import Wallet from '@project-serum/sol-wallet-adapter';
// import { useAlert } from '../../hooks';

export function SolletExtensionAdapter(_: any, network: any) {
  // const { alertError } = useAlert();
  const sollet = (window as any).sollet;
  if (sollet) {
    return new Wallet(sollet, network);
  }

  return {
    on: () => {},
    connect: () => {
      console.log('Please install the Sollet Extension for Chrome');
      // alertError('Please install the Sollet Extension for Chrome');
    },
  };
}
