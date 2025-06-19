import { ethers } from 'ethers';
import { getSession } from 'next-auth/react';

import config from '@/config/env';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

// Contract ABI - replace with your actual contract ABI
const CONTRACT_ABI = [
  'function lock(uint256 amount, uint256 duration) external',
  'function unlock(uint256 amount) external',
  'function claimReward() external',
  'function getPendingRewards() external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)',
  'function lockedBalanceOf(address account) external view returns (uint256)',
  'function getLockInfo(address account) external view returns (uint256 amount, uint256 unlockTime)',
];

export async function getContract() {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Ethereum provider not found');
    }

    // Get the provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get the signer
    const signer = await provider.getSigner();

    // Create and return the contract instance
    return new ethers.Contract(config.contractAddress, CONTRACT_ABI, signer);
  } catch (error) {
    console.error('Error getting contract:', error);
    throw new Error('Failed to initialize contract');
  }
}

export async function getContractReadOnly() {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('Ethereum provider not found');
    }

    // Get the provider
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Create and return the contract instance without a signer
    return new ethers.Contract(config.contractAddress, CONTRACT_ABI, provider);
  } catch (error) {
    console.error('Error getting read-only contract:', error);
    throw new Error('Failed to initialize read-only contract');
  }
}
