import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { configureChains, createConfig } from 'wagmi';
import { moonbeam, bsc, polkadot } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';

// Network RPC URLs
const MOONBEAM_RPC = process.env.NEXT_PUBLIC_MOONBEAM_RPC || '';
const BSC_RPC = process.env.NEXT_PUBLIC_BSC_RPC || '';
const POLKADOT_RPC = process.env.NEXT_PUBLIC_POLKADOT_RPC || '';

// WebSocket URLs
const MOONBEAM_WSS = process.env.NEXT_PUBLIC_MOONBEAM_WSS || '';
const BSC_WSS = process.env.NEXT_PUBLIC_BSC_WSS || '';
const POLKADOT_WSS = process.env.NEXT_PUBLIC_POLKADOT_WSS || '';

// Configure chains
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    {
      ...moonbeam,
      rpcUrls: {
        default: { http: [MOONBEAM_RPC] },
        public: { http: [MOONBEAM_RPC] },
      },
    },
    {
      ...bsc,
      rpcUrls: {
        default: { http: [BSC_RPC] },
        public: { http: [BSC_RPC] },
      },
    },
    {
      ...polkadot,
      rpcUrls: {
        default: { http: [POLKADOT_RPC] },
        public: { http: [POLKADOT_RPC] },
      },
    },
  ],
  [publicProvider()]
);

// Create WalletConnect connector
const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  },
});

// Create wagmi config
export const config = createConfig({
  autoConnect: true,
  connectors: [walletConnectConnector],
  publicClient,
  webSocketPublicClient,
});

// Create ethers providers
export const moonbeamProvider = new ethers.JsonRpcProvider(MOONBEAM_RPC);
export const bscProvider = new ethers.JsonRpcProvider(BSC_RPC);
export const polkadotProvider = new ethers.JsonRpcProvider(POLKADOT_RPC);

// WebSocket providers
export const moonbeamWsProvider = new ethers.WebSocketProvider(MOONBEAM_WSS);
export const bscWsProvider = new ethers.WebSocketProvider(BSC_WSS);
export const polkadotWsProvider = new ethers.WebSocketProvider(POLKADOT_WSS);

export const providers = {
  moonbeam: moonbeamProvider,
  bsc: bscProvider,
  polkadot: polkadotProvider,
};

export const wsProviders = {
  moonbeam: moonbeamWsProvider,
  bsc: bscWsProvider,
  polkadot: polkadotWsProvider,
};

export { chains };
