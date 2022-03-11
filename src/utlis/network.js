import ethLogo from 'assets/icons/eth.png';
import bscLogo from 'assets/icons/bsc.png';

export const network = {
  1: {
    baseUrl: process.env.REACT_APP_ETHERSCAN_URL,
    scanKey: process.env.REACT_APP_ETHERSCAN_KEY,
    logo: ethLogo,
  },
  56: {
    baseUrl: process.env.REACT_APP_BINANCE_URL,
    scanKey: process.env.REACT_APP_BINANCE_KEY,
    logo: bscLogo,
  },
};

export function getNetwork(_chainId) {
  return network[_chainId];
}

export const contractAddress = {
  97: {
    factory: '0x384D4Faa923830920Fc476BFd8B3c6df417c0760',
  },
  null: {
    factory: null,
  },
};

export function getContractAddress(_chainId) {
  return contractAddress[_chainId];
}
