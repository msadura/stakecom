// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/storage';

import type { ApiTypes, AugmentedQuery, QueryableStorageEntry } from '@polkadot/api-base/types';
import type { Bytes, Option, U256, U8aFixed, Vec, bool, u128, u16, u32, u64 } from '@polkadot/types-codec';
import type { AnyNumber, ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H160, H256, Percent, Permill } from '@polkadot/types/interfaces/runtime';
import type { EthereumBlock, EthereumReceiptReceiptV3, EthereumTransactionTransactionV2, FpRpcTransactionStatus, FrameSupportDispatchPerDispatchClassWeight, FrameSystemAccountInfo, FrameSystemEventRecord, FrameSystemLastRuntimeUpgradeInfo, FrameSystemPhase, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesIdAmount, PalletBalancesReserveData, PalletEvmCodeMetadata, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletMultisigMultisig, PalletSubspaceProposal, PalletSubspaceVoterInfo, PalletTransactionPaymentReleases, SpConsensusAuraSr25519AppSr25519Public, SpRuntimeDigest } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';

export type __AugmentedQuery<ApiType extends ApiTypes> = AugmentedQuery<ApiType, () => unknown>;
export type __QueryableStorageEntry<ApiType extends ApiTypes> = QueryableStorageEntry<ApiType>;

declare module '@polkadot/api-base/types/storage' {
  interface AugmentedQueries<ApiType extends ApiTypes> {
    aura: {
      /**
       * The current authority set.
       **/
      authorities: AugmentedQuery<ApiType, () => Observable<Vec<SpConsensusAuraSr25519AppSr25519Public>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current slot of this block.
       * 
       * This will be set in `on_initialize`.
       **/
      currentSlot: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    balances: {
      /**
       * The Balances pallet example of storing the balance of an account.
       * 
       * # Example
       * 
       * ```nocompile
       * impl pallet_balances::Config for Runtime {
       * type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
       * }
       * ```
       * 
       * You can also store the balance of an account in the `System` pallet.
       * 
       * # Example
       * 
       * ```nocompile
       * impl pallet_balances::Config for Runtime {
       * type AccountStore = System
       * }
       * ```
       * 
       * But this comes with tradeoffs, storing account balances in the system pallet stores
       * `frame_system` data alongside the account data contrary to storing account balances in the
       * `Balances` pallet, which uses a `StorageMap` to store balances data only.
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletBalancesAccountData>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Freeze locks on account balances.
       **/
      freezes: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesIdAmount>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Holds on account balances.
       **/
      holds: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesIdAmount>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * The total units of outstanding deactivated balance in the system.
       **/
      inactiveIssuance: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesBalanceLock>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<PalletBalancesReserveData>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    baseFee: {
      baseFeePerGas: AugmentedQuery<ApiType, () => Observable<U256>, []> & QueryableStorageEntry<ApiType, []>;
      elasticity: AugmentedQuery<ApiType, () => Observable<Permill>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    ethereum: {
      blockHash: AugmentedQuery<ApiType, (arg: U256 | AnyNumber | Uint8Array) => Observable<H256>, [U256]> & QueryableStorageEntry<ApiType, [U256]>;
      /**
       * The current Ethereum block.
       **/
      currentBlock: AugmentedQuery<ApiType, () => Observable<Option<EthereumBlock>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current Ethereum receipts.
       **/
      currentReceipts: AugmentedQuery<ApiType, () => Observable<Option<Vec<EthereumReceiptReceiptV3>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current transaction statuses.
       **/
      currentTransactionStatuses: AugmentedQuery<ApiType, () => Observable<Option<Vec<FpRpcTransactionStatus>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current building block's transactions and receipts.
       **/
      pending: AugmentedQuery<ApiType, () => Observable<Vec<ITuple<[EthereumTransactionTransactionV2, FpRpcTransactionStatus, EthereumReceiptReceiptV3]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evm: {
      accountCodes: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Bytes>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      accountCodesMetadata: AugmentedQuery<ApiType, (arg: H160 | string | Uint8Array) => Observable<Option<PalletEvmCodeMetadata>>, [H160]> & QueryableStorageEntry<ApiType, [H160]>;
      accountStorages: AugmentedQuery<ApiType, (arg1: H160 | string | Uint8Array, arg2: H256 | string | Uint8Array) => Observable<H256>, [H160, H256]> & QueryableStorageEntry<ApiType, [H160, H256]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    evmChainId: {
      /**
       * The EVM chain ID.
       **/
      chainId: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    grandpa: {
      /**
       * The number of changes (both in terms of keys and underlying economic responsibilities)
       * in the "set" of Grandpa validators from genesis.
       **/
      currentSetId: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * next block number where we can force a change.
       **/
      nextForced: AugmentedQuery<ApiType, () => Observable<Option<u64>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Pending change: (signaled at, scheduled change).
       **/
      pendingChange: AugmentedQuery<ApiType, () => Observable<Option<PalletGrandpaStoredPendingChange>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * A mapping from grandpa set ID to the index of the *most recent* session for which its
       * members were responsible.
       * 
       * This is only used for validating equivocation proofs. An equivocation proof must
       * contains a key-ownership proof for a given session, therefore we need a way to tie
       * together sessions and GRANDPA set ids, i.e. we need to validate that a validator
       * was the owner of a given key on a given session, and what the active set ID was
       * during that session.
       * 
       * TWOX-NOTE: `SetId` is not under user control.
       **/
      setIdSession: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<Option<u32>>, [u64]> & QueryableStorageEntry<ApiType, [u64]>;
      /**
       * `true` if we are currently stalled.
       **/
      stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[u64, u64]>>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * State of the current authority set.
       **/
      state: AugmentedQuery<ApiType, () => Observable<PalletGrandpaStoredState>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    multisig: {
      /**
       * The set of open multisig operations.
       **/
      multisigs: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: U8aFixed | string | Uint8Array) => Observable<Option<PalletMultisigMultisig>>, [AccountId32, U8aFixed]> & QueryableStorageEntry<ApiType, [AccountId32, U8aFixed]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<H256>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    subspaceModule: {
      address: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<Bytes>, [u16, u16]> & QueryableStorageEntry<ApiType, [u16, u16]>;
      adjustmentAlpha: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      burn: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      burnRate: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      controller2Keys: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: Vec<AccountId32> | (AccountId32 | string | Uint8Array)[]) => Observable<Option<u16>>, [AccountId32, Vec<AccountId32>]> & QueryableStorageEntry<ApiType, [AccountId32, Vec<AccountId32>]>;
      delegationFee: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Percent>, [u16, AccountId32]> & QueryableStorageEntry<ApiType, [u16, AccountId32]>;
      dividends: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<u16>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      emission: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      floorDelegationFee: AugmentedQuery<ApiType, () => Observable<Percent>, []> & QueryableStorageEntry<ApiType, []>;
      founder: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<AccountId32>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      founderShare: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      globalVoteThreshold: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      immunityPeriod: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      incentive: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<u16>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      incentiveRatio: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      key2Controller: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Option<u16>>, [AccountId32, AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32, AccountId32]>;
      keys: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<AccountId32>, [u16, u16]> & QueryableStorageEntry<ApiType, [u16, u16]>;
      lastTxBlock: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<u64>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      lastUpdate: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<u64>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      loanFrom: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<ITuple<[AccountId32, u64]>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      loanTo: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<ITuple<[AccountId32, u64]>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      maxAllowedModules: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      maxAllowedSubnets: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      maxAllowedUids: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      maxAllowedWeights: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      maxAllowedWeightsGlobal: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      maxBurn: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      maxNameLength: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      maxProposals: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      maxRegistrationsPerBlock: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      maxStake: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      maxWeightAge: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      minAllowedWeights: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      minBurn: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      minStake: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      minStakeGlobal: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      minWeightStake: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      n: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      name: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<Bytes>, [u16, u16]> & QueryableStorageEntry<ApiType, [u16, u16]>;
      pendingEmission: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      profitShares: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<Vec<ITuple<[AccountId32, u16]>>>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      profitShareUnit: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      proposals: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<PalletSubspaceProposal>, [u64]> & QueryableStorageEntry<ApiType, [u64]>;
      quadraticVoting: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<bool>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      registrationBlock: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16, u16]> & QueryableStorageEntry<ApiType, [u16, u16]>;
      registrationsPerBlock: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      registrationsThisInterval: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      selfVote: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<bool>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      stake: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<u64>, [u16, AccountId32]> & QueryableStorageEntry<ApiType, [u16, AccountId32]>;
      stakeFrom: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Vec<ITuple<[AccountId32, u64]>>>, [u16, AccountId32]> & QueryableStorageEntry<ApiType, [u16, AccountId32]>;
      stakeTo: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Vec<ITuple<[AccountId32, u64]>>>, [u16, AccountId32]> & QueryableStorageEntry<ApiType, [u16, AccountId32]>;
      subnetEmission: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      subnetNames: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Bytes>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      targetRegistrationsInterval: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      targetRegistrationsPerInterval: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      tempo: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      totalStake: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u64>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      totalSubnets: AugmentedQuery<ApiType, () => Observable<u16>, []> & QueryableStorageEntry<ApiType, []>;
      trust: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Vec<u16>>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      trustRatio: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      txRateLimit: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      uids: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: AccountId32 | string | Uint8Array) => Observable<Option<u16>>, [u16, AccountId32]> & QueryableStorageEntry<ApiType, [u16, AccountId32]>;
      unitEmission: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      voteModeGlobal: AugmentedQuery<ApiType, () => Observable<Bytes>, []> & QueryableStorageEntry<ApiType, []>;
      voteModeSubnet: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<Bytes>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      voter2Info: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<PalletSubspaceVoterInfo>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      voteThresholdSubnet: AugmentedQuery<ApiType, (arg: u16 | AnyNumber | Uint8Array) => Observable<u16>, [u16]> & QueryableStorageEntry<ApiType, [u16]>;
      weights: AugmentedQuery<ApiType, (arg1: u16 | AnyNumber | Uint8Array, arg2: u16 | AnyNumber | Uint8Array) => Observable<Vec<ITuple<[u16, u16]>>>, [u16, u16]> & QueryableStorageEntry<ApiType, [u16, u16]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    sudo: {
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<Option<AccountId32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    system: {
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId32 | string | Uint8Array) => Observable<FrameSystemAccountInfo>, [AccountId32]> & QueryableStorageEntry<ApiType, [AccountId32]>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: u64 | AnyNumber | Uint8Array) => Observable<H256>, [u64]> & QueryableStorageEntry<ApiType, [u64]>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<FrameSupportDispatchPerDispatchClassWeight>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<SpRuntimeDigest>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<u32>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Events deposited for the current block.
       * 
       * NOTE: The item is unbound and should therefore never be read on chain.
       * It could otherwise inflate the PoV size of a block.
       * 
       * Events have a large in-memory size. Box the events to not go out-of-memory
       * just in case someone still reads them from within the runtime.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<FrameSystemEventRecord>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       * 
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       * 
       * The value has the type `(BlockNumberFor<T>, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<ApiType, (arg: H256 | string | Uint8Array) => Observable<Vec<ITuple<[u64, u32]>>>, [H256]> & QueryableStorageEntry<ApiType, [H256]>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemPhase>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>, [u32]> & QueryableStorageEntry<ApiType, [u32]>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<FrameSystemLastRuntimeUpgradeInfo>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<H256>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
       * (default) if not.
       **/
      upgradedToTripleRefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
       **/
      upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<u64>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<u128>, []> & QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<PalletTransactionPaymentReleases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
