import { ethers } from 'ethers';

// Add type declaration for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

// Contract ABI - Basic interface for token lock functionality
const CONTRACT_ABI = [
  'function getLockInfo(address user) external view returns (uint256 amount, uint256 lockStartTime, uint256 lockEndTime, bool isActive)',
  'function getPendingRewards() external view returns (uint256)',
  'function lockTokens(uint256 amount, uint256 duration) external',
  'function unlockTokens() external',
  'function claimRewards() external',
];

// Contract address - Replace with actual contract address
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

let provider: ethers.BrowserProvider | null = null;
let contract: ethers.Contract | null = null;

export async function getProvider(): Promise<ethers.BrowserProvider> {
  if (!provider) {
    if (typeof window !== 'undefined' && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      throw new Error('No Ethereum provider found');
    }
  }
  return provider;
}

export async function getContractReadOnly(): Promise<ethers.Contract> {
  if (!contract) {
    const provider = await getProvider();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  }
  return contract;
}

export async function getContractWithSigner(): Promise<ethers.Contract> {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}
