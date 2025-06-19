import { ethers } from 'ethers';

const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL || '';

// Initialize Ethereum provider
export function initEthereumProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(ETHEREUM_RPC_URL);
}

// Get network info
export async function getNetworkInfo(provider: ethers.JsonRpcProvider) {
  const network = await provider.getNetwork();
  return {
    chainId: network.chainId,
    name: network.name,
  };
}

// Get account balance
export async function getBalance(
  provider: ethers.JsonRpcProvider,
  address: string
): Promise<string> {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

// Get transaction info
export async function getTransaction(provider: ethers.JsonRpcProvider, txHash: string) {
  return await provider.getTransaction(txHash);
}

// Get block info
export async function getBlock(provider: ethers.JsonRpcProvider, blockNumber: number) {
  return await provider.getBlock(blockNumber);
}
