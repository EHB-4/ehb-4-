import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ethers } from 'ethers';

// Moonbase Alpha Testnet endpoints
const MOONBASE_RPC = process.env.NEXT_PUBLIC_MOONBASE_RPC || '';
const MOONBASE_WSS = 'wss://wss.api.moonbase.moonbeam.network';

// Initialize Moonbeam API (Ethereum compatible)
export function initMoonbeamProvider() {
  return new ethers.JsonRpcProvider(MOONBASE_RPC);
}

// Initialize Polkadot API for Moonbeam
export async function initMoonbeamPolkadotAPI() {
  await cryptoWaitReady();

  const wsProvider = new WsProvider(MOONBASE_WSS);
  const api = await ApiPromise.create({ provider: wsProvider });

  return api;
}

// Get account balance
export async function getBalance(provider: ethers.Provider, address: string) {
  return await provider.getBalance(address);
}

// Get gas price
export async function getGasPrice(provider: ethers.Provider) {
  return await provider.getFeeData();
}

// Get network info
export async function getNetworkInfo(provider: ethers.Provider) {
  const network = await provider.getNetwork();
  return {
    chainId: network.chainId,
    name: network.name,
  };
}

// Send transaction
export async function sendTransaction(
  provider: ethers.Provider,
  signer: ethers.Signer,
  to: string,
  value: bigint
) {
  const tx = {
    to,
    value,
  };

  const response = await signer.sendTransaction(tx);
  return response;
}

// Get transaction receipt
export async function getTransaction(provider: ethers.Provider, txHash: string) {
  return await provider.getTransaction(txHash);
}

// Get block info
export async function getBlock(provider: ethers.Provider, blockNumber: number) {
  return await provider.getBlock(blockNumber);
}

// Export constants
export const MOONBEAM_CONFIG = {
  rpc: MOONBASE_RPC,
  wss: MOONBASE_WSS,
  chainId: 1287, // Moonbase Alpha chain ID
  name: 'Moonbase Alpha',
  currency: {
    name: 'DEV',
    symbol: 'DEV',
    decimals: 18,
  },
};
