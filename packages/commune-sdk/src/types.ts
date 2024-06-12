import type { KeyringPair } from "@polkadot/keyring/types";

export interface CommuneTxResponse {
  success: boolean;
  txHash?: string;
  msg?: string;
  errorCode?: string;
}

export type NetworkEmission = Record<number, number>;

export interface AccountBalances {
  balance: bigint;
  stake: Record<string, bigint>;
  stakeTotal: bigint;
  uid: number;
}

export interface GenericTxInput {
  signer: KeyringPair;
}

export interface StakeInput extends GenericTxInput {
  networkId?: number;
  amount: bigint;
  moduleKey: string;
}

export interface TransferInput extends GenericTxInput {
  networkId?: number;
  amount: bigint;
  recipient: string;
}

export interface RegisterInput extends GenericTxInput {
  networkId?: number;
  metadata?: string | null;
  stake?: bigint;
  name: string;
  address: string;
}

export interface TxError {
  code: string;
  reason?: string;
}

export interface ModuleInfo {
  uid: number;
  key: string;
  name: string;
  address: string;
  emission: number;
  dividends: number;
  incentive: number;
}
