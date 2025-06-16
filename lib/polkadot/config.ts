import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { BN } from '@polkadot/util';
import type { EraIndex } from '@polkadot/types/interfaces/staking';

const POLKADOT_WS = process.env.POLKADOT_WS || 'wss://rpc.polkadot.io';

let api: ApiPromise | null = null;

// Initialize Polkadot API
export async function initPolkadotAPI(): Promise<ApiPromise> {
  if (!api) {
    const provider = new WsProvider(POLKADOT_WS);
    api = await ApiPromise.create({ provider });
  }
  return api;
}

// Staking functions
interface StakingLedger {
  active: { unwrap: () => BN };
  unlocking: Array<{ value: BN }>;
  nominators: Array<{ address: string; amount: BN }>;
}

interface ValidatorPrefs {
  commission: { toNumber: () => number };
}

interface StakingExposure {
  total: BN;
  others: Array<{ who: string; value: BN }>;
}

interface ActiveEra {
  index: EraIndex;
}

export async function getStakingInfo(address: string): Promise<{
  totalStaked: BN;
  unlocking: BN;
  nominators: { address: string; amount: BN }[];
}> {
  const api = await initPolkadotAPI();
  const [activeEraResult, ledger] = await Promise.all([
    api.query.staking.activeEra(),
    api.query.staking.ledger(address),
  ]) as [unknown, unknown];

  const activeEra = (activeEraResult as unknown as ActiveEra).index;
  const stakingLedger = ledger as StakingLedger;

  const totalStaked = stakingLedger.active.unwrap();
  const unlocking = stakingLedger.unlocking.reduce(
    (acc: BN, { value }: { value: BN }) => acc.add(value),
    new BN(0)
  );

  const nominators = stakingLedger.nominators.map((nominator) => ({
    address: nominator.address,
    amount: nominator.amount,
  }));

  return {
    totalStaked,
    unlocking,
    nominators,
  };
}

export async function getValidatorInfo(address: string): Promise<{
  commission: number;
  stake: BN;
  nominators: { address: string; amount: BN }[];
}> {
  const api = await initPolkadotAPI();
  const activeEraResult = await api.query.staking.activeEra() as unknown;
  const [validatorPrefs, stakers] = await Promise.all([
    api.query.staking.validators(address),
    api.query.staking.erasStakers((activeEraResult as ActiveEra).index, address),
  ]) as [unknown, unknown];

  const prefs = validatorPrefs as ValidatorPrefs;
  const exposure = stakers as StakingExposure;

  const commission = prefs.commission.toNumber() / 1000000;
  const stake = exposure.total;
  const nominators = exposure.others.map(({ who, value }) => ({
    address: who,
    amount: value,
  }));

  return {
    commission,
    stake,
    nominators,
  };
}

// Nomination functions
export async function nominateValidator(api: ApiPromise, controller: string, targets: string[]) {
  const tx = api.tx.staking.nominate(targets);
  return tx.signAndSend(controller);
}

// Staking functions
export async function bond(api: ApiPromise, controller: string, value: BN, payee: string) {
  const tx = api.tx.staking.bond(value, payee);
  return tx.signAndSend(controller);
}

export async function unbond(api: ApiPromise, controller: string, value: BN) {
  const tx = api.tx.staking.unbond(value);
  return tx.signAndSend(controller);
}

// Governance functions
export async function submitProposal(api: ApiPromise, proposer: string, proposal: any) {
  const tx = api.tx.democracy.propose(proposal, api.consts.democracy.minimumDeposit);
  return tx.signAndSend(proposer);
}

export async function vote(api: ApiPromise, voter: string, referendumIndex: number, vote: boolean) {
  const tx = api.tx.democracy.vote(referendumIndex, vote);
  return tx.signAndSend(voter);
}

// Validator functions
export async function validate(api: ApiPromise, validator: string, commission: number) {
  const tx = api.tx.staking.validate(commission);
  return tx.signAndSend(validator);
}

export async function chill(api: ApiPromise, validator: string) {
  const tx = api.tx.staking.chill();
  return tx.signAndSend(validator);
}

// Utility functions
export function createKeyring() {
  return new Keyring({ type: 'sr25519' });
}

export async function getBalance(address: string): Promise<BN> {
  const api = await initPolkadotAPI();
  const accountInfo = await api.query.system.account(address);
  return (accountInfo as unknown as { data: { free: BN } }).data.free;
}

export async function getNetworkInfo(): Promise<{
  chain: string;
  nodeName: string;
  nodeVersion: string;
}> {
  const api = await initPolkadotAPI();
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  return {
    chain: chain.toString(),
    nodeName: nodeName.toString(),
    nodeVersion: nodeVersion.toString(),
  };
}

// Export constants
export const POLKADOT_CONFIG = {
  rpc: POLKADOT_WS,
  wss: POLKADOT_WS,
  types: {
    // Add custom types if needed
  },
};
