// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/submittable';

import type { ApiTypes, AugmentedSubmittable, SubmittableExtrinsic, SubmittableExtrinsicFunction } from '@polkadot/api-base/types';
import type { Bytes, Compact, Option, U256, U8aFixed, Vec, bool, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, IMethod, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, Call, H160, H256, MultiAddress, Percent, Permill } from '@polkadot/types/interfaces/runtime';
import type { EthereumTransactionTransactionV2, NodeSubspaceRuntimeOriginCaller, PalletMultisigTimepoint, SpConsensusGrandpaEquivocationProof, SpCoreVoid, SpWeightsWeightV2Weight } from '@polkadot/types/lookup';

export type __AugmentedSubmittable = AugmentedSubmittable<() => unknown>;
export type __SubmittableExtrinsic<ApiType extends ApiTypes> = SubmittableExtrinsic<ApiType>;
export type __SubmittableExtrinsicFunction<ApiType extends ApiTypes> = SubmittableExtrinsicFunction<ApiType>;

declare module '@polkadot/api-base/types/submittable' {
  interface AugmentedSubmittables<ApiType extends ApiTypes> {
    balances: {
      /**
       * See [`Pallet::force_set_balance`].
       **/
      forceSetBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u64>]>;
      /**
       * See [`Pallet::force_transfer`].
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, Compact<u64>]>;
      /**
       * See [`Pallet::force_unreserve`].
       **/
      forceUnreserve: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, u64]>;
      /**
       * See [`Pallet::set_balance_deprecated`].
       **/
      setBalanceDeprecated: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<u64> | AnyNumber | Uint8Array, oldReserved: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u64>, Compact<u64>]>;
      /**
       * See [`Pallet::transfer`].
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u64>]>;
      /**
       * See [`Pallet::transfer_all`].
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, bool]>;
      /**
       * See [`Pallet::transfer_allow_death`].
       **/
      transferAllowDeath: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u64>]>;
      /**
       * See [`Pallet::transfer_keep_alive`].
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u64>]>;
      /**
       * See [`Pallet::upgrade_accounts`].
       **/
      upgradeAccounts: AugmentedSubmittable<(who: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    baseFee: {
      /**
       * See [`Pallet::set_base_fee_per_gas`].
       **/
      setBaseFeePerGas: AugmentedSubmittable<(fee: U256 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [U256]>;
      /**
       * See [`Pallet::set_elasticity`].
       **/
      setElasticity: AugmentedSubmittable<(elasticity: Permill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Permill]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    ethereum: {
      /**
       * See [`Pallet::transact`].
       **/
      transact: AugmentedSubmittable<(transaction: EthereumTransactionTransactionV2 | { Legacy: any } | { EIP2930: any } | { EIP1559: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [EthereumTransactionTransactionV2]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    evm: {
      /**
       * See [`Pallet::call`].
       **/
      call: AugmentedSubmittable<(source: H160 | string | Uint8Array, target: H160 | string | Uint8Array, input: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * See [`Pallet::create`].
       **/
      create: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * See [`Pallet::create2`].
       **/
      create2: AugmentedSubmittable<(source: H160 | string | Uint8Array, init: Bytes | string | Uint8Array, salt: H256 | string | Uint8Array, value: U256 | AnyNumber | Uint8Array, gasLimit: u64 | AnyNumber | Uint8Array, maxFeePerGas: U256 | AnyNumber | Uint8Array, maxPriorityFeePerGas: Option<U256> | null | Uint8Array | U256 | AnyNumber, nonce: Option<U256> | null | Uint8Array | U256 | AnyNumber, accessList: Vec<ITuple<[H160, Vec<H256>]>> | ([H160 | string | Uint8Array, Vec<H256> | (H256 | string | Uint8Array)[]])[]) => SubmittableExtrinsic<ApiType>, [H160, Bytes, H256, U256, u64, U256, Option<U256>, Option<U256>, Vec<ITuple<[H160, Vec<H256>]>>]>;
      /**
       * See [`Pallet::withdraw`].
       **/
      withdraw: AugmentedSubmittable<(address: H160 | string | Uint8Array, value: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [H160, u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    grandpa: {
      /**
       * See [`Pallet::note_stalled`].
       **/
      noteStalled: AugmentedSubmittable<(delay: u64 | AnyNumber | Uint8Array, bestFinalizedBlockNumber: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64, u64]>;
      /**
       * See [`Pallet::report_equivocation`].
       **/
      reportEquivocation: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * See [`Pallet::report_equivocation_unsigned`].
       **/
      reportEquivocationUnsigned: AugmentedSubmittable<(equivocationProof: SpConsensusGrandpaEquivocationProof | { setId?: any; equivocation?: any } | string | Uint8Array, keyOwnerProof: SpCoreVoid | null) => SubmittableExtrinsic<ApiType>, [SpConsensusGrandpaEquivocationProof, SpCoreVoid]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    multisig: {
      /**
       * See [`Pallet::approve_as_multi`].
       **/
      approveAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, callHash: U8aFixed | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, U8aFixed, SpWeightsWeightV2Weight]>;
      /**
       * See [`Pallet::as_multi`].
       **/
      asMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], maybeTimepoint: Option<PalletMultisigTimepoint> | null | Uint8Array | PalletMultisigTimepoint | { height?: any; index?: any } | string, call: Call | IMethod | string | Uint8Array, maxWeight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Option<PalletMultisigTimepoint>, Call, SpWeightsWeightV2Weight]>;
      /**
       * See [`Pallet::as_multi_threshold_1`].
       **/
      asMultiThreshold1: AugmentedSubmittable<(otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Call]>;
      /**
       * See [`Pallet::cancel_as_multi`].
       **/
      cancelAsMulti: AugmentedSubmittable<(threshold: u16 | AnyNumber | Uint8Array, otherSignatories: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], timepoint: PalletMultisigTimepoint | { height?: any; index?: any } | string | Uint8Array, callHash: U8aFixed | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, PalletMultisigTimepoint, U8aFixed]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    subspaceModule: {
      /**
       * See [`Pallet::add_custom_proposal`].
       **/
      addCustomProposal: AugmentedSubmittable<(data: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::add_global_proposal`].
       **/
      addGlobalProposal: AugmentedSubmittable<(burnRate: u16 | AnyNumber | Uint8Array, maxNameLength: u16 | AnyNumber | Uint8Array, maxAllowedSubnets: u16 | AnyNumber | Uint8Array, maxAllowedModules: u16 | AnyNumber | Uint8Array, maxProposals: u64 | AnyNumber | Uint8Array, maxRegistrationsPerBlock: u16 | AnyNumber | Uint8Array, minBurn: u64 | AnyNumber | Uint8Array, minStake: u64 | AnyNumber | Uint8Array, minWeightStake: u64 | AnyNumber | Uint8Array, unitEmission: u64 | AnyNumber | Uint8Array, txRateLimit: u64 | AnyNumber | Uint8Array, voteThreshold: u16 | AnyNumber | Uint8Array, voteMode: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, u16, u16, u16, u64, u16, u64, u64, u64, u64, u64, u16, Bytes]>;
      /**
       * See [`Pallet::add_profit_shares`].
       **/
      addProfitShares: AugmentedSubmittable<(keys: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], shares: Vec<u16> | (u16 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Vec<u16>]>;
      /**
       * See [`Pallet::add_stake`].
       **/
      addStake: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, moduleKey: AccountId32 | string | Uint8Array, amount: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, AccountId32, u64]>;
      /**
       * See [`Pallet::add_stake_multiple`].
       **/
      addStakeMultiple: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, moduleKeys: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], amounts: Vec<u64> | (u64 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Vec<u64>]>;
      /**
       * See [`Pallet::add_subnet_proposal`].
       **/
      addSubnetProposal: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, founder: AccountId32 | string | Uint8Array, founderShare: u16 | AnyNumber | Uint8Array, immunityPeriod: u16 | AnyNumber | Uint8Array, incentiveRatio: u16 | AnyNumber | Uint8Array, maxAllowedUids: u16 | AnyNumber | Uint8Array, maxAllowedWeights: u16 | AnyNumber | Uint8Array, maxStake: u64 | AnyNumber | Uint8Array, maxWeightAge: u64 | AnyNumber | Uint8Array, minAllowedWeights: u16 | AnyNumber | Uint8Array, minStake: u64 | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array, tempo: u16 | AnyNumber | Uint8Array, trustRatio: u16 | AnyNumber | Uint8Array, voteMode: Bytes | string | Uint8Array, voteThreshold: u16 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, AccountId32, u16, u16, u16, u16, u16, u64, u64, u16, u64, Bytes, u16, u16, Bytes, u16]>;
      /**
       * See [`Pallet::deregister`].
       **/
      deregister: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16]>;
      /**
       * See [`Pallet::register`].
       **/
      register: AugmentedSubmittable<(network: Bytes | string | Uint8Array, name: Bytes | string | Uint8Array, address: Bytes | string | Uint8Array, stake: u64 | AnyNumber | Uint8Array, moduleKey: AccountId32 | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, Bytes, Bytes, u64, AccountId32]>;
      /**
       * See [`Pallet::remove_stake`].
       **/
      removeStake: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, moduleKey: AccountId32 | string | Uint8Array, amount: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, AccountId32, u64]>;
      /**
       * See [`Pallet::remove_stake_multiple`].
       **/
      removeStakeMultiple: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, moduleKeys: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], amounts: Vec<u64> | (u64 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u16, Vec<AccountId32>, Vec<u64>]>;
      /**
       * See [`Pallet::set_weights`].
       **/
      setWeights: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, uids: Vec<u16> | (u16 | AnyNumber | Uint8Array)[], weights: Vec<u16> | (u16 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [u16, Vec<u16>, Vec<u16>]>;
      /**
       * See [`Pallet::transfer_multiple`].
       **/
      transferMultiple: AugmentedSubmittable<(destinations: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[], amounts: Vec<u64> | (u64 | AnyNumber | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<AccountId32>, Vec<u64>]>;
      /**
       * See [`Pallet::transfer_stake`].
       **/
      transferStake: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, moduleKey: AccountId32 | string | Uint8Array, newModuleKey: AccountId32 | string | Uint8Array, amount: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, AccountId32, AccountId32, u64]>;
      /**
       * See [`Pallet::unvote_proposal`].
       **/
      unvoteProposal: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * See [`Pallet::update_global`].
       **/
      updateGlobal: AugmentedSubmittable<(burnRate: u16 | AnyNumber | Uint8Array, maxAllowedModules: u16 | AnyNumber | Uint8Array, maxAllowedSubnets: u16 | AnyNumber | Uint8Array, maxNameLength: u16 | AnyNumber | Uint8Array, maxProposals: u64 | AnyNumber | Uint8Array, maxRegistrationsPerBlock: u16 | AnyNumber | Uint8Array, minBurn: u64 | AnyNumber | Uint8Array, maxBurn: u64 | AnyNumber | Uint8Array, minStake: u64 | AnyNumber | Uint8Array, minWeightStake: u64 | AnyNumber | Uint8Array, txRateLimit: u64 | AnyNumber | Uint8Array, unitEmission: u64 | AnyNumber | Uint8Array, voteMode: Bytes | string | Uint8Array, voteThreshold: u16 | AnyNumber | Uint8Array, adjustmentAlpha: u64 | AnyNumber | Uint8Array, floorDelegationFee: Percent | AnyNumber | Uint8Array, targetRegistrationsPerInterval: u16 | AnyNumber | Uint8Array, targetRegistrationsInterval: u16 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, u16, u16, u16, u64, u16, u64, u64, u64, u64, u64, u64, Bytes, u16, u64, Percent, u16, u16]>;
      /**
       * See [`Pallet::update_module`].
       **/
      updateModule: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array, address: Bytes | string | Uint8Array, delegationFee: Option<Percent> | null | Uint8Array | Percent | AnyNumber) => SubmittableExtrinsic<ApiType>, [u16, Bytes, Bytes, Option<Percent>]>;
      /**
       * See [`Pallet::update_subnet`].
       **/
      updateSubnet: AugmentedSubmittable<(netuid: u16 | AnyNumber | Uint8Array, founder: AccountId32 | string | Uint8Array, founderShare: u16 | AnyNumber | Uint8Array, immunityPeriod: u16 | AnyNumber | Uint8Array, incentiveRatio: u16 | AnyNumber | Uint8Array, maxAllowedUids: u16 | AnyNumber | Uint8Array, maxAllowedWeights: u16 | AnyNumber | Uint8Array, maxStake: u64 | AnyNumber | Uint8Array, minAllowedWeights: u16 | AnyNumber | Uint8Array, maxWeightAge: u64 | AnyNumber | Uint8Array, minStake: u64 | AnyNumber | Uint8Array, name: Bytes | string | Uint8Array, tempo: u16 | AnyNumber | Uint8Array, trustRatio: u16 | AnyNumber | Uint8Array, voteMode: Bytes | string | Uint8Array, voteThreshold: u16 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, AccountId32, u16, u16, u16, u16, u16, u64, u16, u64, u64, Bytes, u16, u16, Bytes, u16]>;
      /**
       * See [`Pallet::vote_proposal`].
       **/
      voteProposal: AugmentedSubmittable<(proposalId: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    sudo: {
      /**
       * See [`Pallet::set_key`].
       **/
      setKey: AugmentedSubmittable<(updated: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress]>;
      /**
       * See [`Pallet::sudo`].
       **/
      sudo: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call]>;
      /**
       * See [`Pallet::sudo_as`].
       **/
      sudoAs: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Call]>;
      /**
       * See [`Pallet::sudo_unchecked_weight`].
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    system: {
      /**
       * See [`Pallet::kill_prefix`].
       **/
      killPrefix: AugmentedSubmittable<(prefix: Bytes | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes, u32]>;
      /**
       * See [`Pallet::kill_storage`].
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Bytes> | (Bytes | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Bytes>]>;
      /**
       * See [`Pallet::remark`].
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::remark_with_event`].
       **/
      remarkWithEvent: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_code`].
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_code_without_checks`].
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Bytes]>;
      /**
       * See [`Pallet::set_heap_pages`].
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [u64]>;
      /**
       * See [`Pallet::set_storage`].
       **/
      setStorage: AugmentedSubmittable<(items: Vec<ITuple<[Bytes, Bytes]>> | ([Bytes | string | Uint8Array, Bytes | string | Uint8Array])[]) => SubmittableExtrinsic<ApiType>, [Vec<ITuple<[Bytes, Bytes]>>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
      /**
       * See [`Pallet::set`].
       **/
      set: AugmentedSubmittable<(now: Compact<u64> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<u64>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    utility: {
      /**
       * See [`Pallet::as_derivative`].
       **/
      asDerivative: AugmentedSubmittable<(index: u16 | AnyNumber | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [u16, Call]>;
      /**
       * See [`Pallet::batch`].
       **/
      batch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::batch_all`].
       **/
      batchAll: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::dispatch_as`].
       **/
      dispatchAs: AugmentedSubmittable<(asOrigin: NodeSubspaceRuntimeOriginCaller | { system: any } | { Void: any } | { Ethereum: any } | string | Uint8Array, call: Call | IMethod | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [NodeSubspaceRuntimeOriginCaller, Call]>;
      /**
       * See [`Pallet::force_batch`].
       **/
      forceBatch: AugmentedSubmittable<(calls: Vec<Call> | (Call | IMethod | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>, [Vec<Call>]>;
      /**
       * See [`Pallet::with_weight`].
       **/
      withWeight: AugmentedSubmittable<(call: Call | IMethod | string | Uint8Array, weight: SpWeightsWeightV2Weight | { refTime?: any; proofSize?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [Call, SpWeightsWeightV2Weight]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
