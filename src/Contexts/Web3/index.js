import { useCallback, useEffect, useState, useMemo } from 'react';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { createContext } from 'react';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = 'INVALID_INFURA_KEY';

const NETWORK_NAME = 'mainnet';

export const Web3Context = createContext({
  provider: null,
  address: null,
  chainId: null,
  loadWeb3Modal: null,
  logoutOfWeb3Modal: null,
});

const paramsSwitchNetwork = {
  // 56: [
  //   {
  //     chainId: '0x38',
  //     chainName: 'Binance Smart Chain',
  //     nativeCurrency: {
  //       name: 'BNB',
  //       symbol: 'BNB',
  //       decimals: 18,
  //     },
  //     rpcUrls: ['https://bsc-dataseed.binance.org/'],
  //     blockExplorerUrls: ['https://bscscan.com/'],
  //   },
  // ],
  97: [
    {
      chainId: '0x61',
      chainName: 'BSC-Testnet',
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com/'],
    },
  ],
};

// Switch for chains is not ETH
export const injectNetworkNoEthereum = async (chainId) => {
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: paramsSwitchNetwork[chainId],
  });
};

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [autoLoaded, setAutoLoaded] = useState(false);
  // const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;
  const autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME;
  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        network: NETWORK,
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId,
            },
          },
        },
      }),
    [NETWORK, infuraId]
  );

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    const web3 = new Web3(newProvider);

    setProvider(web3);
    let accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);

    injectNetworkNoEthereum(97);

    setChainId(await web3.eth.getChainId());

    // Subscribe to accounts change
    newProvider.on('accountsChanged', async (accounts) => {
      setAddress(accounts[0]);
    });

    // Subscribe to chainID change
    newProvider.on('chainChanged', async (chainID) => {
      chainID = parseInt(web3.utils.hexToNumber(chainID));
      console.log(chainID);
      setChainId(chainID);
    });

    // Subscribe to provider connection
    newProvider.on('connect', (info) => {
      console.log(info);
    });

    // Subscribe to provider disconnection
    newProvider.on('disconnect', (error) => {
      console.log(error);
    });
  }, [web3Modal]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  // return [provider, address, loadWeb3Modal, logoutOfWeb3Modal];
  return (
    <Web3Context.Provider value={{ provider, chainId, address, loadWeb3Modal, logoutOfWeb3Modal }}>
      {children}
    </Web3Context.Provider>
  );
};
