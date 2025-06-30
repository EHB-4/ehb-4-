import { ethers } from 'ethers';
import { initMoonbeamProvider } from './config';

// ERC20 ABI
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 amount)',
  'event Approval(address indexed owner, address indexed spender, uint256 amount)',
] as const;

type ERC20Contract = ethers.Contract & {
  name(): Promise<string>;
  symbol(): Promise<string>;
  decimals(): Promise<number>;
  totalSupply(): Promise<bigint>;
  balanceOf(address: string): Promise<bigint>;
  transfer(to: string, amount: bigint): Promise<ethers.ContractTransactionResponse>;
  allowance(owner: string, spender: string): Promise<bigint>;
  approve(spender: string, amount: bigint): Promise<ethers.ContractTransactionResponse>;
  transferFrom(from: string, to: string, amount: bigint): Promise<ethers.ContractTransactionResponse>;
};

export class MoonbeamToken {
  private contract: ERC20Contract;
  private provider: ethers.Provider;

  constructor(address: string) {
    this.provider = initMoonbeamProvider();
    this.contract = new ethers.Contract(
      address,
      ERC20_ABI,
      this.provider
    ) as ERC20Contract;
  }

  async name(): Promise<string> {
    return this.contract.name();
  }

  async symbol(): Promise<string> {
    return this.contract.symbol();
  }

  async decimals(): Promise<number> {
    return this.contract.decimals();
  }

  async totalSupply(): Promise<bigint> {
    return this.contract.totalSupply();
  }

  async balanceOf(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }

  async transfer(to: string, amount: bigint): Promise<ethers.ContractTransactionResponse> {
    return this.contract.transfer(to, amount);
  }

  async allowance(owner: string, spender: string): Promise<bigint> {
    return this.contract.allowance(owner, spender);
  }

  async approve(spender: string, amount: bigint): Promise<ethers.ContractTransactionResponse> {
    return this.contract.approve(spender, amount);
  }

  async transferFrom(
    from: string,
    to: string,
    amount: bigint
  ): Promise<ethers.ContractTransactionResponse> {
    return this.contract.transferFrom(from, to, amount);
  }

  onTransfer(
    callback: (from: string, to: string, amount: bigint) => void
  ): void {
    this.contract.on('Transfer', (from, to, amount) => {
      callback(from, to, amount);
    });
  }

  onApproval(
    callback: (owner: string, spender: string, amount: bigint) => void
  ): void {
    this.contract.on('Approval', (owner, spender, amount) => {
      callback(owner, spender, amount);
    });
  }
}

// Predefined token addresses on Moonbeam
export const MOONBEAM_TOKENS = {
  WGLMR: '0xAcc15dC74880C9944775448304B263D191c6077F', // Wrapped GLMR
  USDC: '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b', // USD Coin
  USDT: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D', // Tether USD
  DAI: '0xc234A67a4F840E61adE794be47de455361b52413', // Dai Stablecoin
  WETH: '0x30D2a9F5FDf90ACe8c17952cbb4eE48a55D029A8', // Wrapped Ether
  WBTC: '0x1DC78Acda13a8BC4408B207c9E48CDBc096D95e0', // Wrapped Bitcoin
  BUSD: '0x4Bf769b05E832FCf905f3A0A00A2fB5e8Ee8B5f5', // Binance USD
  AAVE: '0x2C5fF4107E35404B3359Ea00Fd7A0e2c5FaD5796', // Aave Token
  UNI: '0x8f552a71EFE5eeFd207bEf6E5Fc4c8D5B2b5934F', // Uniswap
  LINK: '0x3505918B0972a1931484055E6544fcd5a1Bdea62', // Chainlink
};
