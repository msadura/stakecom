// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import "@polkadot/api-base/types/events";

import type { ApiTypes, AugmentedEvent } from "@polkadot/api-base/types";
import type {
  Bytes,
  Null,
  Option,
  Result,
  U8aFixed,
  u16,
  u32,
  u64,
  U256,
  Vec,
} from "@polkadot/types-codec";
import type { ITuple } from "@polkadot/types-codec/types";
import type {
  AccountId32,
  H160,
  H256,
  Permill,
} from "@polkadot/types/interfaces/runtime";
import type {
  EthereumLog,
  EvmCoreErrorExitReason,
  FrameSupportDispatchDispatchInfo,
  FrameSupportTokensMiscBalanceStatus,
  PalletMultisigTimepoint,
  PalletSubspaceGlobalParams,
  SpConsensusGrandpaAppPublic,
  SpRuntimeDispatchError,
} from "@polkadot/types/lookup";

export type __AugmentedEvent<ApiType extends ApiTypes> =
  AugmentedEvent<ApiType>;

declare module "@polkadot/api-base/types/events" {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<
        ApiType,
        [who: AccountId32, free: u64],
        { who: AccountId32; free: u64 }
      >;
      /**
       * Some amount was burned from an account.
       **/
      Burned: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<
        ApiType,
        [account: AccountId32, amount: u64],
        { account: AccountId32; amount: u64 }
      >;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<
        ApiType,
        [account: AccountId32, freeBalance: u64],
        { account: AccountId32; freeBalance: u64 }
      >;
      /**
       * Some balance was frozen.
       **/
      Frozen: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Total issuance was increased by `amount`, creating a credit to be balanced.
       **/
      Issued: AugmentedEvent<ApiType, [amount: u64], { amount: u64 }>;
      /**
       * Some balance was locked.
       **/
      Locked: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some amount was minted into an account.
       **/
      Minted: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Total issuance was decreased by `amount`, creating a debt to be balanced.
       **/
      Rescinded: AugmentedEvent<ApiType, [amount: u64], { amount: u64 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<
        ApiType,
        [
          from: AccountId32,
          to: AccountId32,
          amount: u64,
          destinationStatus: FrameSupportTokensMiscBalanceStatus,
        ],
        {
          from: AccountId32;
          to: AccountId32;
          amount: u64;
          destinationStatus: FrameSupportTokensMiscBalanceStatus;
        }
      >;
      /**
       * Some amount was restored into an account.
       **/
      Restored: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some amount was suspended from an account (it can be restored later).
       **/
      Suspended: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some balance was thawed.
       **/
      Thawed: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<
        ApiType,
        [from: AccountId32, to: AccountId32, amount: u64],
        { from: AccountId32; to: AccountId32; amount: u64 }
      >;
      /**
       * Some balance was unlocked.
       **/
      Unlocked: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * An account was upgraded.
       **/
      Upgraded: AugmentedEvent<
        ApiType,
        [who: AccountId32],
        { who: AccountId32 }
      >;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<
        ApiType,
        [who: AccountId32, amount: u64],
        { who: AccountId32; amount: u64 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    baseFee: {
      BaseFeeOverflow: AugmentedEvent<ApiType, []>;
      NewBaseFeePerGas: AugmentedEvent<ApiType, [fee: U256], { fee: U256 }>;
      NewElasticity: AugmentedEvent<
        ApiType,
        [elasticity: Permill],
        { elasticity: Permill }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    ethereum: {
      /**
       * An ethereum transaction was successfully executed.
       **/
      Executed: AugmentedEvent<
        ApiType,
        [
          from: H160,
          to: H160,
          transactionHash: H256,
          exitReason: EvmCoreErrorExitReason,
          extraData: Bytes,
        ],
        {
          from: H160;
          to: H160;
          transactionHash: H256;
          exitReason: EvmCoreErrorExitReason;
          extraData: Bytes;
        }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    evm: {
      /**
       * A contract has been created at given address.
       **/
      Created: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      /**
       * A contract was attempted to be created, but the execution failed.
       **/
      CreatedFailed: AugmentedEvent<
        ApiType,
        [address: H160],
        { address: H160 }
      >;
      /**
       * A contract has been executed successfully with states applied.
       **/
      Executed: AugmentedEvent<ApiType, [address: H160], { address: H160 }>;
      /**
       * A contract has been executed with errors. States are reverted with only gas fees applied.
       **/
      ExecutedFailed: AugmentedEvent<
        ApiType,
        [address: H160],
        { address: H160 }
      >;
      /**
       * Ethereum events from contracts.
       **/
      Log: AugmentedEvent<ApiType, [log: EthereumLog], { log: EthereumLog }>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<
        ApiType,
        [authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>>],
        { authoritySet: Vec<ITuple<[SpConsensusGrandpaAppPublic, u64]>> }
      >;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<
        ApiType,
        [
          approving: AccountId32,
          timepoint: PalletMultisigTimepoint,
          multisig: AccountId32,
          callHash: U8aFixed,
        ],
        {
          approving: AccountId32;
          timepoint: PalletMultisigTimepoint;
          multisig: AccountId32;
          callHash: U8aFixed;
        }
      >;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<
        ApiType,
        [
          cancelling: AccountId32,
          timepoint: PalletMultisigTimepoint,
          multisig: AccountId32,
          callHash: U8aFixed,
        ],
        {
          cancelling: AccountId32;
          timepoint: PalletMultisigTimepoint;
          multisig: AccountId32;
          callHash: U8aFixed;
        }
      >;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<
        ApiType,
        [
          approving: AccountId32,
          timepoint: PalletMultisigTimepoint,
          multisig: AccountId32,
          callHash: U8aFixed,
          result: Result<Null, SpRuntimeDispatchError>,
        ],
        {
          approving: AccountId32;
          timepoint: PalletMultisigTimepoint;
          multisig: AccountId32;
          callHash: U8aFixed;
          result: Result<Null, SpRuntimeDispatchError>;
        }
      >;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<
        ApiType,
        [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed],
        { approving: AccountId32; multisig: AccountId32; callHash: U8aFixed }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    subspaceModule: {
      BulkBalancesSet: AugmentedEvent<ApiType, [u16, u16]>;
      BulkModulesRegistered: AugmentedEvent<ApiType, [u16, u16]>;
      CustomProposalAccepted: AugmentedEvent<ApiType, [u64]>;
      DelegateAdded: AugmentedEvent<ApiType, [AccountId32, AccountId32, u16]>;
      GlobalParamsUpdated: AugmentedEvent<
        ApiType,
        [PalletSubspaceGlobalParams]
      >;
      GlobalProposalAccepted: AugmentedEvent<ApiType, [u64]>;
      ImmunityPeriodSet: AugmentedEvent<ApiType, [u16, u16]>;
      MaxAllowedModulesSet: AugmentedEvent<ApiType, [u16]>;
      MaxAllowedSubnetsSet: AugmentedEvent<ApiType, [u16]>;
      MaxAllowedUidsSet: AugmentedEvent<ApiType, [u16, u16]>;
      MaxNameLengthSet: AugmentedEvent<ApiType, [u16]>;
      MaxRegistrationsPerBlockSet: AugmentedEvent<ApiType, [u16]>;
      MinAllowedWeightSet: AugmentedEvent<ApiType, [u16, u16]>;
      ModuleDeregistered: AugmentedEvent<ApiType, [u16, u16, AccountId32]>;
      ModuleRegistered: AugmentedEvent<ApiType, [u16, u16, AccountId32]>;
      ModuleUpdated: AugmentedEvent<ApiType, [u16, AccountId32]>;
      NetworkAdded: AugmentedEvent<ApiType, [u16, Bytes]>;
      NetworkRemoved: AugmentedEvent<ApiType, [u16]>;
      RegistrationBurnChanged: AugmentedEvent<ApiType, [u64]>;
      StakeAdded: AugmentedEvent<ApiType, [AccountId32, AccountId32, u64]>;
      StakeRemoved: AugmentedEvent<ApiType, [AccountId32, AccountId32, u64]>;
      SubnetParamsUpdated: AugmentedEvent<ApiType, [u16]>;
      SubnetProposalAccepted: AugmentedEvent<ApiType, [u64, u16]>;
      target_registrations_intervalSet: AugmentedEvent<ApiType, [u16]>;
      TxRateLimitSet: AugmentedEvent<ApiType, [u64]>;
      UnitEmissionSet: AugmentedEvent<ApiType, [u64]>;
      WeightsSet: AugmentedEvent<ApiType, [u16, u16]>;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<
        ApiType,
        [oldSudoer: Option<AccountId32>],
        { oldSudoer: Option<AccountId32> }
      >;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<
        ApiType,
        [sudoResult: Result<Null, SpRuntimeDispatchError>],
        { sudoResult: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<
        ApiType,
        [sudoResult: Result<Null, SpRuntimeDispatchError>],
        { sudoResult: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<
        ApiType,
        [
          dispatchError: SpRuntimeDispatchError,
          dispatchInfo: FrameSupportDispatchDispatchInfo,
        ],
        {
          dispatchError: SpRuntimeDispatchError;
          dispatchInfo: FrameSupportDispatchDispatchInfo;
        }
      >;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<
        ApiType,
        [dispatchInfo: FrameSupportDispatchDispatchInfo],
        { dispatchInfo: FrameSupportDispatchDispatchInfo }
      >;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<
        ApiType,
        [account: AccountId32],
        { account: AccountId32 }
      >;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<
        ApiType,
        [account: AccountId32],
        { account: AccountId32 }
      >;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<
        ApiType,
        [sender: AccountId32, hash_: H256],
        { sender: AccountId32; hash_: H256 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<
        ApiType,
        [who: AccountId32, actualFee: u64, tip: u64],
        { who: AccountId32; actualFee: u64; tip: u64 }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<
        ApiType,
        [index: u32, error: SpRuntimeDispatchError],
        { index: u32; error: SpRuntimeDispatchError }
      >;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<
        ApiType,
        [result: Result<Null, SpRuntimeDispatchError>],
        { result: Result<Null, SpRuntimeDispatchError> }
      >;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<
        ApiType,
        [error: SpRuntimeDispatchError],
        { error: SpRuntimeDispatchError }
      >;
      /**
       * Generic event
       **/
      [key: string]: AugmentedEvent<ApiType>;
    };
  } // AugmentedEvents
} // declare module
