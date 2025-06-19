import { ethers } from 'ethers';

import { initMoonbeamProvider } from './moonbeam/config';

// TokenLocker ABI
const TOKEN_LOCKER_ABI = [
  'function lockTokens(uint256 amount, string sqlLevel) external',
  'function unlockTokens() external',
  'function calculateReward(address user) public view returns (uint256)',
  'function claimReward() external',
  'function locks(address) public view returns (uint256 amount, uint256 lockStartTime, uint256 lockEndTime, string sqlLevel, bool isActive)',
  'event TokensLocked(address indexed user, uint256 amount, uint256 lockEndTime, string sqlLevel)',
  'event TokensUnlocked(address indexed user, uint256 amount)',
  'event RewardClaimed(address indexed user, uint256 amount)',
] as const;

export class TokenLocker {
  public contract: ethers.Contract;
  private provider: ethers.Provider;

  constructor(contractAddress: string) {
    this.provider = initMoonbeamProvider();
    this.contract = new ethers.Contract(contractAddress, TOKEN_LOCKER_ABI, this.provider);
  }

  async lockTokens(
    amount: bigint,
    sqlLevel: string,
    signer: ethers.Signer
  ): Promise<ethers.ContractTransactionResponse> {
    const contractWithSigner = this.contract.connect(signer);
    return contractWithSigner.lockTokens(amount, sqlLevel);
  }

  async unlockTokens(signer: ethers.Signer): Promise<ethers.ContractTransactionResponse> {
    const contractWithSigner = this.contract.connect(signer);
    return contractWithSigner.unlockTokens();
  }

  async calculateReward(userAddress: string): Promise<bigint> {
    return this.contract.calculateReward(userAddress);
  }

  async claimReward(signer: ethers.Signer): Promise<ethers.ContractTransactionResponse> {
    const contractWithSigner = this.contract.connect(signer);
    return contractWithSigner.claimReward();
  }

  async getLockInfo(userAddress: string): Promise<{
    amount: bigint;
    lockStartTime: bigint;
    lockEndTime: bigint;
    sqlLevel: string;
    isActive: boolean;
  }> {
    return this.contract.locks(userAddress);
  }

  getLockEvents(userAddress: string) {
    return this.contract.filters.TokensLocked(userAddress);
  }

  getUnlockEvents(userAddress: string) {
    return this.contract.filters.TokensUnlocked(userAddress);
  }

  getRewardEvents(userAddress: string) {
    return this.contract.filters.RewardClaimed(userAddress);
  }

  onTokensLocked(
    callback: (user: string, amount: bigint, lockEndTime: bigint, sqlLevel: string) => void
  ): void {
    this.contract.on('TokensLocked', (user, amount, lockEndTime, sqlLevel) => {
      callback(user, amount, lockEndTime, sqlLevel);
    });
  }

  onTokensUnlocked(callback: (user: string, amount: bigint) => void): void {
    this.contract.on('TokensUnlocked', (user, amount) => {
      callback(user, amount);
    });
  }

  onRewardClaimed(callback: (user: string, amount: bigint) => void): void {
    this.contract.on('RewardClaimed', (user, amount) => {
      callback(user, amount);
    });
  }
}
