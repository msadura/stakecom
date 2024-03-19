// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import "@polkadot/api-base/types/errors";

import type { ApiTypes, AugmentedError } from "@polkadot/api-base/types";

export type __AugmentedError<ApiType extends ApiTypes> =
  AugmentedError<ApiType>;

declare module "@polkadot/api-base/types/errors" {
  interface AugmentedErrors<ApiType extends ApiTypes> {
    balances: {
      /**
       * Beneficiary account must pre-exist.
       **/
      DeadAccount: AugmentedError<ApiType>;
      /**
       * Value too low to create account due to existential deposit.
       **/
      ExistentialDeposit: AugmentedError<ApiType>;
      /**
       * A vesting schedule already exists for this account.
       **/
      ExistingVestingSchedule: AugmentedError<ApiType>;
      /**
       * Transfer/payment would kill account.
       **/
      Expendability: AugmentedError<ApiType>;
      /**
       * Balance too low to send value.
       **/
      InsufficientBalance: AugmentedError<ApiType>;
      /**
       * Account liquidity restrictions prevent withdrawal.
       **/
      LiquidityRestrictions: AugmentedError<ApiType>;
      /**
       * Number of freezes exceed `MaxFreezes`.
       **/
      TooManyFreezes: AugmentedError<ApiType>;
      /**
       * Number of holds exceed `MaxHolds`.
       **/
      TooManyHolds: AugmentedError<ApiType>;
      /**
       * Number of named reserves exceed `MaxReserves`.
       **/
      TooManyReserves: AugmentedError<ApiType>;
      /**
       * Vesting balance too high to send value.
       **/
      VestingBalance: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    ethereum: {
      /**
       * Signature is invalid.
       **/
      InvalidSignature: AugmentedError<ApiType>;
      /**
       * Pre-log is present, therefore transact is not allowed.
       **/
      PreLogExists: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    evm: {
      /**
       * Not enough balance to perform action
       **/
      BalanceLow: AugmentedError<ApiType>;
      /**
       * Calculating total fee overflowed
       **/
      FeeOverflow: AugmentedError<ApiType>;
      /**
       * Gas limit is too high.
       **/
      GasLimitTooHigh: AugmentedError<ApiType>;
      /**
       * Gas limit is too low.
       **/
      GasLimitTooLow: AugmentedError<ApiType>;
      /**
       * Gas price is too low.
       **/
      GasPriceTooLow: AugmentedError<ApiType>;
      /**
       * Nonce is invalid
       **/
      InvalidNonce: AugmentedError<ApiType>;
      /**
       * Calculating total payment overflowed
       **/
      PaymentOverflow: AugmentedError<ApiType>;
      /**
       * EVM reentrancy
       **/
      Reentrancy: AugmentedError<ApiType>;
      /**
       * EIP-3607,
       **/
      TransactionMustComeFromEOA: AugmentedError<ApiType>;
      /**
       * Undefined error.
       **/
      Undefined: AugmentedError<ApiType>;
      /**
       * Withdraw fee failed
       **/
      WithdrawFailed: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    grandpa: {
      /**
       * Attempt to signal GRANDPA change with one already pending.
       **/
      ChangePending: AugmentedError<ApiType>;
      /**
       * A given equivocation report is valid but already previously reported.
       **/
      DuplicateOffenceReport: AugmentedError<ApiType>;
      /**
       * An equivocation proof provided as part of an equivocation report is invalid.
       **/
      InvalidEquivocationProof: AugmentedError<ApiType>;
      /**
       * A key ownership proof provided as part of an equivocation report is invalid.
       **/
      InvalidKeyOwnershipProof: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA pause when the authority set isn't live
       * (either paused or already pending pause).
       **/
      PauseFailed: AugmentedError<ApiType>;
      /**
       * Attempt to signal GRANDPA resume when the authority set isn't paused
       * (either live or already pending resume).
       **/
      ResumeFailed: AugmentedError<ApiType>;
      /**
       * Cannot signal forced change so soon after last.
       **/
      TooSoon: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    multisig: {
      /**
       * Call is already approved by this signatory.
       **/
      AlreadyApproved: AugmentedError<ApiType>;
      /**
       * The data to be stored is already stored.
       **/
      AlreadyStored: AugmentedError<ApiType>;
      /**
       * The maximum weight information provided was too low.
       **/
      MaxWeightTooLow: AugmentedError<ApiType>;
      /**
       * Threshold must be 2 or greater.
       **/
      MinimumThreshold: AugmentedError<ApiType>;
      /**
       * Call doesn't need any (more) approvals.
       **/
      NoApprovalsNeeded: AugmentedError<ApiType>;
      /**
       * Multisig operation not found when attempting to cancel.
       **/
      NotFound: AugmentedError<ApiType>;
      /**
       * No timepoint was given, yet the multisig operation is already underway.
       **/
      NoTimepoint: AugmentedError<ApiType>;
      /**
       * Only the account that originally created the multisig is able to cancel it.
       **/
      NotOwner: AugmentedError<ApiType>;
      /**
       * The sender was contained in the other signatories; it shouldn't be.
       **/
      SenderInSignatories: AugmentedError<ApiType>;
      /**
       * The signatories were provided out of order; they should be ordered.
       **/
      SignatoriesOutOfOrder: AugmentedError<ApiType>;
      /**
       * There are too few signatories in the list.
       **/
      TooFewSignatories: AugmentedError<ApiType>;
      /**
       * There are too many signatories in the list.
       **/
      TooManySignatories: AugmentedError<ApiType>;
      /**
       * A timepoint was given, yet no multisig operation is underway.
       **/
      UnexpectedTimepoint: AugmentedError<ApiType>;
      /**
       * A different timepoint was given to the multisig operation that is underway.
       **/
      WrongTimepoint: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    subspaceModule: {
      AlreadyControlled: AugmentedError<ApiType>;
      AlreadyController: AugmentedError<ApiType>;
      AlreadyRegistered: AugmentedError<ApiType>;
      BalanceNotAdded: AugmentedError<ApiType>;
      BalanceNotRemoved: AugmentedError<ApiType>;
      BalanceSetError: AugmentedError<ApiType>;
      BalanceWithdrawalError: AugmentedError<ApiType>;
      CouldNotConvertToBalance: AugmentedError<ApiType>;
      DifferentLengths: AugmentedError<ApiType>;
      DuplicateUids: AugmentedError<ApiType>;
      InvalidBurnRate: AugmentedError<ApiType>;
      InvalidGlobalParams: AugmentedError<ApiType>;
      InvalidIpAddress: AugmentedError<ApiType>;
      InvalidIpType: AugmentedError<ApiType>;
      InvalidMaxAllowedModules: AugmentedError<ApiType>;
      InvalidMaxAllowedSubnets: AugmentedError<ApiType>;
      InvalidMaxAllowedUids: AugmentedError<ApiType>;
      InvalidMaxAllowedWeights: AugmentedError<ApiType>;
      InvalidMaxBurn: AugmentedError<ApiType>;
      InvalidMaxNameLength: AugmentedError<ApiType>;
      InvalidMaxProposals: AugmentedError<ApiType>;
      InvalidMaxRegistrationsPerBlock: AugmentedError<ApiType>;
      InvalidMaxStake: AugmentedError<ApiType>;
      InvalidMaxWeightAge: AugmentedError<ApiType>;
      InvalidMinAllowedWeights: AugmentedError<ApiType>;
      InvalidMinBurn: AugmentedError<ApiType>;
      InvalidMinDelegationFee: AugmentedError<ApiType>;
      InvalidMinStake: AugmentedError<ApiType>;
      InvalidProposalData: AugmentedError<ApiType>;
      InvalidProposalId: AugmentedError<ApiType>;
      InvalidTargetRegistrationsInterval: AugmentedError<ApiType>;
      InvalidTempo: AugmentedError<ApiType>;
      InvalidTrustRatio: AugmentedError<ApiType>;
      InvalidTxRateLimit: AugmentedError<ApiType>;
      InvalidUid: AugmentedError<ApiType>;
      InvalidUnitEmission: AugmentedError<ApiType>;
      InvalidVoteMode: AugmentedError<ApiType>;
      InvalidVoteThreshold: AugmentedError<ApiType>;
      KeyAlreadyRegistered: AugmentedError<ApiType>;
      KeyNameMismatch: AugmentedError<ApiType>;
      MaxAllowedModules: AugmentedError<ApiType>;
      MaxAllowedUidsExceeded: AugmentedError<ApiType>;
      MaxAllowedUIdsNotAllowed: AugmentedError<ApiType>;
      ModuleAddressTooLong: AugmentedError<ApiType>;
      ModuleNameAlreadyExists: AugmentedError<ApiType>;
      ModuleNameDoesNotExist: AugmentedError<ApiType>;
      ModuleNameTooLong: AugmentedError<ApiType>;
      NameAlreadyRegistered: AugmentedError<ApiType>;
      NetworkAlreadyRegistered: AugmentedError<ApiType>;
      NetworkDoesNotExist: AugmentedError<ApiType>;
      NetworkExist: AugmentedError<ApiType>;
      NetworkRegistrationFailed: AugmentedError<ApiType>;
      NoSelfWeight: AugmentedError<ApiType>;
      NotAuthorityMode: AugmentedError<ApiType>;
      NotEnoughBalanceToRegister: AugmentedError<ApiType>;
      NotEnoughBalanceToStake: AugmentedError<ApiType>;
      NotEnoughBalanceToTransfer: AugmentedError<ApiType>;
      NotEnoughStakeToRegister: AugmentedError<ApiType>;
      NotEnoughStaketoSetWeights: AugmentedError<ApiType>;
      NotEnoughStakeToStartNetwork: AugmentedError<ApiType>;
      NotEnoughStaketoWithdraw: AugmentedError<ApiType>;
      NotEnoughtStakePerWeight: AugmentedError<ApiType>;
      NotEnoughVotesToAccept: AugmentedError<ApiType>;
      NotFounder: AugmentedError<ApiType>;
      NotRegistered: AugmentedError<ApiType>;
      NotSettingEnoughWeights: AugmentedError<ApiType>;
      ProposalDataTooLarge: AugmentedError<ApiType>;
      ProposalDoesNotExist: AugmentedError<ApiType>;
      SettingWeightsTooFast: AugmentedError<ApiType>;
      StakeAlreadyAdded: AugmentedError<ApiType>;
      StakeNotAdded: AugmentedError<ApiType>;
      StakeNotRemoved: AugmentedError<ApiType>;
      StillRegistered: AugmentedError<ApiType>;
      StorageValueOutOfRange: AugmentedError<ApiType>;
      SubnetNameAlreadyExists: AugmentedError<ApiType>;
      SubnetNameNotExists: AugmentedError<ApiType>;
      TempoHasNotSet: AugmentedError<ApiType>;
      TooFewVotesForNewProposal: AugmentedError<ApiType>;
      TooManyRegistrationsPerBlock: AugmentedError<ApiType>;
      TooManyUids: AugmentedError<ApiType>;
      TooMuchUpdateProposals: AugmentedError<ApiType>;
      TxRateLimitExceeded: AugmentedError<ApiType>;
      UpdateProposalAlreadyVoted: AugmentedError<ApiType>;
      UpdateProposalVoteNotAvailable: AugmentedError<ApiType>;
      VoterIsNotRegistered: AugmentedError<ApiType>;
      VoterIsRegistered: AugmentedError<ApiType>;
      VotingPowerIsZero: AugmentedError<ApiType>;
      WeightVecNotEqualSize: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    sudo: {
      /**
       * Sender must be the Sudo account
       **/
      RequireSudo: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    system: {
      /**
       * The origin filter prevent the call to be dispatched.
       **/
      CallFiltered: AugmentedError<ApiType>;
      /**
       * Failed to extract the runtime version from the new runtime.
       *
       * Either calling `Core_version` or decoding `RuntimeVersion` failed.
       **/
      FailedToExtractRuntimeVersion: AugmentedError<ApiType>;
      /**
       * The name of specification does not match between the current runtime
       * and the new runtime.
       **/
      InvalidSpecName: AugmentedError<ApiType>;
      /**
       * Suicide called when the account has non-default composite data.
       **/
      NonDefaultComposite: AugmentedError<ApiType>;
      /**
       * There is a non-zero reference count preventing the account from being purged.
       **/
      NonZeroRefCount: AugmentedError<ApiType>;
      /**
       * The specification version is not allowed to decrease between the current runtime
       * and the new runtime.
       **/
      SpecVersionNeedsToIncrease: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
    utility: {
      /**
       * Too many calls batched.
       **/
      TooManyCalls: AugmentedError<ApiType>;
      /**
       * Generic error
       **/
      [key: string]: AugmentedError<ApiType>;
    };
  } // AugmentedErrors
} // declare module
