// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Nonce, pallet_balances::types::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: "u32",
    consumers: "u32",
    providers: "u32",
    sufficients: "u32",
    data: "PalletBalancesAccountData",
  },
  /**
   * Lookup5: pallet_balances::types::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: "u64",
    reserved: "u64",
    frozen: "u64",
    flags: "u128",
  },
  /**
   * Lookup9: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: "SpWeightsWeightV2Weight",
    operational: "SpWeightsWeightV2Weight",
    mandatory: "SpWeightsWeightV2Weight",
  },
  /**
   * Lookup10: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: "Compact<u64>",
    proofSize: "Compact<u64>",
  },
  /**
   * Lookup14: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: "Vec<SpRuntimeDigestDigestItem>",
  },
  /**
   * Lookup16: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: "Bytes",
      __Unused1: "Null",
      __Unused2: "Null",
      __Unused3: "Null",
      Consensus: "([u8;4],Bytes)",
      Seal: "([u8;4],Bytes)",
      PreRuntime: "([u8;4],Bytes)",
      __Unused7: "Null",
      RuntimeEnvironmentUpdated: "Null",
    },
  },
  /**
   * Lookup19: frame_system::EventRecord<node_subspace_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: "FrameSystemPhase",
    event: "Event",
    topics: "Vec<H256>",
  },
  /**
   * Lookup21: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: "FrameSupportDispatchDispatchInfo",
      },
      ExtrinsicFailed: {
        dispatchError: "SpRuntimeDispatchError",
        dispatchInfo: "FrameSupportDispatchDispatchInfo",
      },
      CodeUpdated: "Null",
      NewAccount: {
        account: "AccountId32",
      },
      KilledAccount: {
        account: "AccountId32",
      },
      Remarked: {
        _alias: {
          hash_: "hash",
        },
        sender: "AccountId32",
        hash_: "H256",
      },
    },
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: "SpWeightsWeightV2Weight",
    class: "FrameSupportDispatchDispatchClass",
    paysFee: "FrameSupportDispatchPays",
  },
  /**
   * Lookup23: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ["Normal", "Operational", "Mandatory"],
  },
  /**
   * Lookup24: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ["Yes", "No"],
  },
  /**
   * Lookup25: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: "Null",
      CannotLookup: "Null",
      BadOrigin: "Null",
      Module: "SpRuntimeModuleError",
      ConsumerRemaining: "Null",
      NoProviders: "Null",
      TooManyConsumers: "Null",
      Token: "SpRuntimeTokenError",
      Arithmetic: "SpArithmeticArithmeticError",
      Transactional: "SpRuntimeTransactionalError",
      Exhausted: "Null",
      Corruption: "Null",
      Unavailable: "Null",
      RootNotAllowed: "Null",
    },
  },
  /**
   * Lookup26: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: "u8",
    error: "[u8;4]",
  },
  /**
   * Lookup27: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: [
      "FundsUnavailable",
      "OnlyProvider",
      "BelowMinimum",
      "CannotCreate",
      "UnknownAsset",
      "Frozen",
      "Unsupported",
      "CannotCreateHold",
      "NotExpendable",
      "Blocked",
    ],
  },
  /**
   * Lookup28: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ["Underflow", "Overflow", "DivisionByZero"],
  },
  /**
   * Lookup29: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ["LimitReached", "NoLayer"],
  },
  /**
   * Lookup30: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: "Vec<(SpConsensusGrandpaAppPublic,u64)>",
      },
      Paused: "Null",
      Resumed: "Null",
    },
  },
  /**
   * Lookup33: sp_consensus_grandpa::app::Public
   **/
  SpConsensusGrandpaAppPublic: "SpCoreEd25519Public",
  /**
   * Lookup34: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: "[u8;32]",
  /**
   * Lookup35: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: "AccountId32",
        freeBalance: "u64",
      },
      DustLost: {
        account: "AccountId32",
        amount: "u64",
      },
      Transfer: {
        from: "AccountId32",
        to: "AccountId32",
        amount: "u64",
      },
      BalanceSet: {
        who: "AccountId32",
        free: "u64",
      },
      Reserved: {
        who: "AccountId32",
        amount: "u64",
      },
      Unreserved: {
        who: "AccountId32",
        amount: "u64",
      },
      ReserveRepatriated: {
        from: "AccountId32",
        to: "AccountId32",
        amount: "u64",
        destinationStatus: "FrameSupportTokensMiscBalanceStatus",
      },
      Deposit: {
        who: "AccountId32",
        amount: "u64",
      },
      Withdraw: {
        who: "AccountId32",
        amount: "u64",
      },
      Slashed: {
        who: "AccountId32",
        amount: "u64",
      },
      Minted: {
        who: "AccountId32",
        amount: "u64",
      },
      Burned: {
        who: "AccountId32",
        amount: "u64",
      },
      Suspended: {
        who: "AccountId32",
        amount: "u64",
      },
      Restored: {
        who: "AccountId32",
        amount: "u64",
      },
      Upgraded: {
        who: "AccountId32",
      },
      Issued: {
        amount: "u64",
      },
      Rescinded: {
        amount: "u64",
      },
      Locked: {
        who: "AccountId32",
        amount: "u64",
      },
      Unlocked: {
        who: "AccountId32",
        amount: "u64",
      },
      Frozen: {
        who: "AccountId32",
        amount: "u64",
      },
      Thawed: {
        who: "AccountId32",
        amount: "u64",
      },
    },
  },
  /**
   * Lookup36: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ["Free", "Reserved"],
  },
  /**
   * Lookup37: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: "AccountId32",
        actualFee: "u64",
        tip: "u64",
      },
    },
  },
  /**
   * Lookup38: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: "Result<Null, SpRuntimeDispatchError>",
      },
      KeyChanged: {
        oldSudoer: "Option<AccountId32>",
      },
      SudoAsDone: {
        sudoResult: "Result<Null, SpRuntimeDispatchError>",
      },
    },
  },
  /**
   * Lookup42: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: "AccountId32",
        multisig: "AccountId32",
        callHash: "[u8;32]",
      },
      MultisigApproval: {
        approving: "AccountId32",
        timepoint: "PalletMultisigTimepoint",
        multisig: "AccountId32",
        callHash: "[u8;32]",
      },
      MultisigExecuted: {
        approving: "AccountId32",
        timepoint: "PalletMultisigTimepoint",
        multisig: "AccountId32",
        callHash: "[u8;32]",
        result: "Result<Null, SpRuntimeDispatchError>",
      },
      MultisigCancelled: {
        cancelling: "AccountId32",
        timepoint: "PalletMultisigTimepoint",
        multisig: "AccountId32",
        callHash: "[u8;32]",
      },
    },
  },
  /**
   * Lookup43: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: "u64",
    index: "u32",
  },
  /**
   * Lookup44: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: "u32",
        error: "SpRuntimeDispatchError",
      },
      BatchCompleted: "Null",
      BatchCompletedWithErrors: "Null",
      ItemCompleted: "Null",
      ItemFailed: {
        error: "SpRuntimeDispatchError",
      },
      DispatchedAs: {
        result: "Result<Null, SpRuntimeDispatchError>",
      },
    },
  },
  /**
   * Lookup45: pallet_subspace::pallet::Event<T>
   **/
  PalletSubspaceEvent: {
    _enum: {
      NetworkAdded: "(u16,Bytes)",
      NetworkRemoved: "u16",
      StakeAdded: "(AccountId32,AccountId32,u64)",
      StakeRemoved: "(AccountId32,AccountId32,u64)",
      WeightsSet: "(u16,u16)",
      ModuleRegistered: "(u16,u16,AccountId32)",
      ModuleDeregistered: "(u16,u16,AccountId32)",
      WhitelistModuleAdded: "AccountId32",
      WhitelistModuleRemoved: "AccountId32",
      BulkModulesRegistered: "(u16,u16)",
      BulkBalancesSet: "(u16,u16)",
      MaxAllowedUidsSet: "(u16,u16)",
      MinAllowedWeightSet: "(u16,u16)",
      ImmunityPeriodSet: "(u16,u16)",
      ModuleUpdated: "(u16,AccountId32)",
      DelegateAdded: "(AccountId32,AccountId32,u16)",
      UnitEmissionSet: "u64",
      MaxNameLengthSet: "u16",
      MinNameLenghtSet: "u16",
      MaxAllowedSubnetsSet: "u16",
      MaxAllowedModulesSet: "u16",
      MaxRegistrationsPerBlockSet: "u16",
      target_registrations_intervalSet: "u16",
      RegistrationBurnChanged: "u64",
      ProposalCreated: "u64",
      ApplicationCreated: "u64",
      ProposalVoted: "(u64,AccountId32,bool)",
      ProposalVoteUnregistered: "(u64,AccountId32)",
      GlobalParamsUpdated: "PalletSubspaceGlobalParams",
      SubnetParamsUpdated: "u16",
      GlobalProposalAccepted: "u64",
      CustomProposalAccepted: "u64",
      SubnetProposalAccepted: "(u64,u16)",
    },
  },
  /**
   * Lookup48: pallet_subspace::pallet::GlobalParams<T>
   **/
  PalletSubspaceGlobalParams: {
    burnRate: "u16",
    maxNameLength: "u16",
    minNameLength: "u16",
    maxAllowedSubnets: "u16",
    maxAllowedModules: "u16",
    maxRegistrationsPerBlock: "u16",
    maxAllowedWeights: "u16",
    minBurn: "u64",
    maxBurn: "u64",
    minStake: "u64",
    floorDelegationFee: "Percent",
    minWeightStake: "u64",
    targetRegistrationsPerInterval: "u16",
    targetRegistrationsInterval: "u16",
    adjustmentAlpha: "u64",
    unitEmission: "u64",
    curator: "AccountId32",
    subnetStakeThreshold: "Percent",
    proposalCost: "u64",
    proposalExpiration: "u32",
    proposalParticipationThreshold: "Percent",
    generalSubnetApplicationCost: "u64",
    floorFounderShare: "u8",
  },
  /**
   * Lookup50: pallet_ethereum::pallet::Event
   **/
  PalletEthereumEvent: {
    _enum: {
      Executed: {
        from: "H160",
        to: "H160",
        transactionHash: "H256",
        exitReason: "EvmCoreErrorExitReason",
        extraData: "Bytes",
      },
    },
  },
  /**
   * Lookup53: evm_core::error::ExitReason
   **/
  EvmCoreErrorExitReason: {
    _enum: {
      Succeed: "EvmCoreErrorExitSucceed",
      Error: "EvmCoreErrorExitError",
      Revert: "EvmCoreErrorExitRevert",
      Fatal: "EvmCoreErrorExitFatal",
    },
  },
  /**
   * Lookup54: evm_core::error::ExitSucceed
   **/
  EvmCoreErrorExitSucceed: {
    _enum: ["Stopped", "Returned", "Suicided"],
  },
  /**
   * Lookup55: evm_core::error::ExitError
   **/
  EvmCoreErrorExitError: {
    _enum: {
      StackUnderflow: "Null",
      StackOverflow: "Null",
      InvalidJump: "Null",
      InvalidRange: "Null",
      DesignatedInvalid: "Null",
      CallTooDeep: "Null",
      CreateCollision: "Null",
      CreateContractLimit: "Null",
      OutOfOffset: "Null",
      OutOfGas: "Null",
      OutOfFund: "Null",
      PCUnderflow: "Null",
      CreateEmpty: "Null",
      Other: "Text",
      MaxNonce: "Null",
      InvalidCode: "u8",
    },
  },
  /**
   * Lookup59: evm_core::error::ExitRevert
   **/
  EvmCoreErrorExitRevert: {
    _enum: ["Reverted"],
  },
  /**
   * Lookup60: evm_core::error::ExitFatal
   **/
  EvmCoreErrorExitFatal: {
    _enum: {
      NotSupported: "Null",
      UnhandledInterrupt: "Null",
      CallErrorAsFatal: "EvmCoreErrorExitError",
      Other: "Text",
    },
  },
  /**
   * Lookup61: pallet_evm::pallet::Event<T>
   **/
  PalletEvmEvent: {
    _enum: {
      Log: {
        log: "EthereumLog",
      },
      Created: {
        address: "H160",
      },
      CreatedFailed: {
        address: "H160",
      },
      Executed: {
        address: "H160",
      },
      ExecutedFailed: {
        address: "H160",
      },
    },
  },
  /**
   * Lookup62: ethereum::log::Log
   **/
  EthereumLog: {
    address: "H160",
    topics: "Vec<H256>",
    data: "Bytes",
  },
  /**
   * Lookup64: pallet_base_fee::pallet::Event
   **/
  PalletBaseFeeEvent: {
    _enum: {
      NewBaseFeePerGas: {
        fee: "U256",
      },
      BaseFeeOverflow: "Null",
      NewElasticity: {
        elasticity: "Permill",
      },
    },
  },
  /**
   * Lookup68: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: "u32",
      Finalization: "Null",
      Initialization: "Null",
    },
  },
  /**
   * Lookup71: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: "Compact<u32>",
    specName: "Text",
  },
  /**
   * Lookup73: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: "Bytes",
      },
      set_heap_pages: {
        pages: "u64",
      },
      set_code: {
        code: "Bytes",
      },
      set_code_without_checks: {
        code: "Bytes",
      },
      set_storage: {
        items: "Vec<(Bytes,Bytes)>",
      },
      kill_storage: {
        _alias: {
          keys_: "keys",
        },
        keys_: "Vec<Bytes>",
      },
      kill_prefix: {
        prefix: "Bytes",
        subkeys: "u32",
      },
      remark_with_event: {
        remark: "Bytes",
      },
    },
  },
  /**
   * Lookup77: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: "SpWeightsWeightV2Weight",
    maxBlock: "SpWeightsWeightV2Weight",
    perClass: "FrameSupportDispatchPerDispatchClassWeightsPerClass",
  },
  /**
   * Lookup78: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: "FrameSystemLimitsWeightsPerClass",
    operational: "FrameSystemLimitsWeightsPerClass",
    mandatory: "FrameSystemLimitsWeightsPerClass",
  },
  /**
   * Lookup79: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: "SpWeightsWeightV2Weight",
    maxExtrinsic: "Option<SpWeightsWeightV2Weight>",
    maxTotal: "Option<SpWeightsWeightV2Weight>",
    reserved: "Option<SpWeightsWeightV2Weight>",
  },
  /**
   * Lookup81: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: "FrameSupportDispatchPerDispatchClassU32",
  },
  /**
   * Lookup82: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: "u32",
    operational: "u32",
    mandatory: "u32",
  },
  /**
   * Lookup83: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: "u64",
    write: "u64",
  },
  /**
   * Lookup84: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: "Text",
    implName: "Text",
    authoringVersion: "u32",
    specVersion: "u32",
    implVersion: "u32",
    apis: "Vec<([u8;8],u32)>",
    transactionVersion: "u32",
    stateVersion: "u8",
  },
  /**
   * Lookup89: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: [
      "InvalidSpecName",
      "SpecVersionNeedsToIncrease",
      "FailedToExtractRuntimeVersion",
      "NonDefaultComposite",
      "NonZeroRefCount",
      "CallFiltered",
    ],
  },
  /**
   * Lookup91: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: "Compact<u64>",
      },
    },
  },
  /**
   * Lookup93: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: "SpCoreSr25519Public",
  /**
   * Lookup94: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: "[u8;32]",
  /**
   * Lookup97: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: "Null",
      PendingPause: {
        scheduledAt: "u64",
        delay: "u64",
      },
      Paused: "Null",
      PendingResume: {
        scheduledAt: "u64",
        delay: "u64",
      },
    },
  },
  /**
   * Lookup98: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: "u64",
    delay: "u64",
    nextAuthorities: "Vec<(SpConsensusGrandpaAppPublic,u64)>",
    forced: "Option<u64>",
  },
  /**
   * Lookup102: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: "SpConsensusGrandpaEquivocationProof",
        keyOwnerProof: "SpCoreVoid",
      },
      report_equivocation_unsigned: {
        equivocationProof: "SpConsensusGrandpaEquivocationProof",
        keyOwnerProof: "SpCoreVoid",
      },
      note_stalled: {
        delay: "u64",
        bestFinalizedBlockNumber: "u64",
      },
    },
  },
  /**
   * Lookup103: sp_consensus_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocationProof: {
    setId: "u64",
    equivocation: "SpConsensusGrandpaEquivocation",
  },
  /**
   * Lookup104: sp_consensus_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocation: {
    _enum: {
      Prevote: "FinalityGrandpaEquivocationPrevote",
      Precommit: "FinalityGrandpaEquivocationPrecommit",
    },
  },
  /**
   * Lookup105: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: "u64",
    identity: "SpConsensusGrandpaAppPublic",
    first: "(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)",
    second: "(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)",
  },
  /**
   * Lookup106: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: "H256",
    targetNumber: "u64",
  },
  /**
   * Lookup107: sp_consensus_grandpa::app::Signature
   **/
  SpConsensusGrandpaAppSignature: "SpCoreEd25519Signature",
  /**
   * Lookup108: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: "[u8;64]",
  /**
   * Lookup111: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: "u64",
    identity: "SpConsensusGrandpaAppPublic",
    first: "(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)",
    second: "(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)",
  },
  /**
   * Lookup112: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: "H256",
    targetNumber: "u64",
  },
  /**
   * Lookup114: sp_core::Void
   **/
  SpCoreVoid: "Null",
  /**
   * Lookup115: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: [
      "PauseFailed",
      "ResumeFailed",
      "ChangePending",
      "TooSoon",
      "InvalidKeyOwnershipProof",
      "InvalidEquivocationProof",
      "DuplicateOffenceReport",
    ],
  },
  /**
   * Lookup117: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: "[u8;8]",
    amount: "u64",
    reasons: "PalletBalancesReasons",
  },
  /**
   * Lookup118: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ["Fee", "Misc", "All"],
  },
  /**
   * Lookup121: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: "[u8;8]",
    amount: "u64",
  },
  /**
   * Lookup124: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: "Null",
    amount: "u64",
  },
  /**
   * Lookup126: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer_allow_death: {
        dest: "MultiAddress",
        value: "Compact<u64>",
      },
      set_balance_deprecated: {
        who: "MultiAddress",
        newFree: "Compact<u64>",
        oldReserved: "Compact<u64>",
      },
      force_transfer: {
        source: "MultiAddress",
        dest: "MultiAddress",
        value: "Compact<u64>",
      },
      transfer_keep_alive: {
        dest: "MultiAddress",
        value: "Compact<u64>",
      },
      transfer_all: {
        dest: "MultiAddress",
        keepAlive: "bool",
      },
      force_unreserve: {
        who: "MultiAddress",
        amount: "u64",
      },
      upgrade_accounts: {
        who: "Vec<AccountId32>",
      },
      transfer: {
        dest: "MultiAddress",
        value: "Compact<u64>",
      },
      force_set_balance: {
        who: "MultiAddress",
        newFree: "Compact<u64>",
      },
    },
  },
  /**
   * Lookup130: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: [
      "VestingBalance",
      "LiquidityRestrictions",
      "InsufficientBalance",
      "ExistentialDeposit",
      "Expendability",
      "ExistingVestingSchedule",
      "DeadAccount",
      "TooManyReserves",
      "TooManyHolds",
      "TooManyFreezes",
    ],
  },
  /**
   * Lookup132: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ["V1Ancient", "V2"],
  },
  /**
   * Lookup133: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: "Call",
      },
      sudo_unchecked_weight: {
        call: "Call",
        weight: "SpWeightsWeightV2Weight",
      },
      set_key: {
        _alias: {
          new_: "new",
        },
        new_: "MultiAddress",
      },
      sudo_as: {
        who: "MultiAddress",
        call: "Call",
      },
    },
  },
  /**
   * Lookup135: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: "Vec<AccountId32>",
        call: "Call",
      },
      as_multi: {
        threshold: "u16",
        otherSignatories: "Vec<AccountId32>",
        maybeTimepoint: "Option<PalletMultisigTimepoint>",
        call: "Call",
        maxWeight: "SpWeightsWeightV2Weight",
      },
      approve_as_multi: {
        threshold: "u16",
        otherSignatories: "Vec<AccountId32>",
        maybeTimepoint: "Option<PalletMultisigTimepoint>",
        callHash: "[u8;32]",
        maxWeight: "SpWeightsWeightV2Weight",
      },
      cancel_as_multi: {
        threshold: "u16",
        otherSignatories: "Vec<AccountId32>",
        timepoint: "PalletMultisigTimepoint",
        callHash: "[u8;32]",
      },
    },
  },
  /**
   * Lookup137: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: "Vec<Call>",
      },
      as_derivative: {
        index: "u16",
        call: "Call",
      },
      batch_all: {
        calls: "Vec<Call>",
      },
      dispatch_as: {
        asOrigin: "NodeSubspaceRuntimeOriginCaller",
        call: "Call",
      },
      force_batch: {
        calls: "Vec<Call>",
      },
      with_weight: {
        call: "Call",
        weight: "SpWeightsWeightV2Weight",
      },
    },
  },
  /**
   * Lookup139: node_subspace_runtime::OriginCaller
   **/
  NodeSubspaceRuntimeOriginCaller: {
    _enum: {
      system: "FrameSupportDispatchRawOrigin",
      __Unused1: "Null",
      Void: "SpCoreVoid",
      __Unused3: "Null",
      __Unused4: "Null",
      __Unused5: "Null",
      __Unused6: "Null",
      __Unused7: "Null",
      __Unused8: "Null",
      __Unused9: "Null",
      __Unused10: "Null",
      Ethereum: "PalletEthereumRawOrigin",
    },
  },
  /**
   * Lookup140: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: "Null",
      Signed: "AccountId32",
      None: "Null",
    },
  },
  /**
   * Lookup141: pallet_ethereum::RawOrigin
   **/
  PalletEthereumRawOrigin: {
    _enum: {
      EthereumTransaction: "H160",
    },
  },
  /**
   * Lookup142: pallet_subspace::pallet::Call<T>
   **/
  PalletSubspaceCall: {
    _enum: {
      set_weights: {
        netuid: "u16",
        uids: "Vec<u16>",
        weights: "Vec<u16>",
      },
      add_stake: {
        netuid: "u16",
        moduleKey: "AccountId32",
        amount: "u64",
      },
      add_stake_multiple: {
        netuid: "u16",
        moduleKeys: "Vec<AccountId32>",
        amounts: "Vec<u64>",
      },
      remove_stake: {
        netuid: "u16",
        moduleKey: "AccountId32",
        amount: "u64",
      },
      remove_stake_multiple: {
        netuid: "u16",
        moduleKeys: "Vec<AccountId32>",
        amounts: "Vec<u64>",
      },
      transfer_stake: {
        netuid: "u16",
        moduleKey: "AccountId32",
        newModuleKey: "AccountId32",
        amount: "u64",
      },
      transfer_multiple: {
        destinations: "Vec<AccountId32>",
        amounts: "Vec<u64>",
      },
      update_module: {
        netuid: "u16",
        name: "Bytes",
        address: "Bytes",
        delegationFee: "Option<Percent>",
        metadata: "Option<Bytes>",
      },
      register: {
        network: "Bytes",
        name: "Bytes",
        address: "Bytes",
        stake: "u64",
        moduleKey: "AccountId32",
        metadata: "Option<Bytes>",
      },
      deregister: {
        netuid: "u16",
      },
      add_profit_shares: {
        _alias: {
          keys_: "keys",
        },
        keys_: "Vec<AccountId32>",
        shares: "Vec<u16>",
      },
      add_to_whitelist: {
        moduleKey: "AccountId32",
        recommendedWeight: "u8",
      },
      remove_from_whitelist: {
        moduleKey: "AccountId32",
      },
      update_subnet: {
        netuid: "u16",
        founder: "AccountId32",
        founderShare: "u16",
        immunityPeriod: "u16",
        incentiveRatio: "u16",
        maxAllowedUids: "u16",
        maxAllowedWeights: "u16",
        maxStake: "u64",
        minAllowedWeights: "u16",
        maxWeightAge: "u64",
        minStake: "u64",
        name: "Bytes",
        tempo: "u16",
        trustRatio: "u16",
        maximumSetWeightCallsPerEpoch: "u16",
        voteMode: "PalletSubspaceVotingVoteMode",
        bondsMa: "u64",
      },
      add_global_proposal: {
        burnRate: "u16",
        maxNameLength: "u16",
        minNameLength: "u16",
        maxAllowedSubnets: "u16",
        maxAllowedModules: "u16",
        maxRegistrationsPerBlock: "u16",
        maxAllowedWeights: "u16",
        maxBurn: "u64",
        minBurn: "u64",
        minStake: "u64",
        floorDelegationFee: "Percent",
        floorFounderShare: "u8",
        minWeightStake: "u64",
        targetRegistrationsPerInterval: "u16",
        targetRegistrationsInterval: "u16",
        adjustmentAlpha: "u64",
        unitEmission: "u64",
        curator: "AccountId32",
        subnetStakeThreshold: "Percent",
        proposalCost: "u64",
        proposalExpiration: "u32",
        proposalParticipationThreshold: "Percent",
        generalSubnetApplicationCost: "u64",
      },
      add_subnet_proposal: {
        netuid: "u16",
        founder: "AccountId32",
        name: "Bytes",
        founderShare: "u16",
        immunityPeriod: "u16",
        incentiveRatio: "u16",
        maxAllowedUids: "u16",
        maxAllowedWeights: "u16",
        minAllowedWeights: "u16",
        maxStake: "u64",
        minStake: "u64",
        maxWeightAge: "u64",
        tempo: "u16",
        trustRatio: "u16",
        maximumSetWeightCallsPerEpoch: "u16",
        voteMode: "PalletSubspaceVotingVoteMode",
        bondsMa: "u64",
      },
      add_custom_proposal: {
        data: "Bytes",
      },
      add_dao_application: {
        applicationKey: "AccountId32",
        data: "Bytes",
      },
      refuse_dao_application: {
        id: "u64",
      },
      add_custom_subnet_proposal: {
        netuid: "u16",
        data: "Bytes",
      },
      add_transfer_dao_treasury_proposal: {
        data: "Bytes",
        value: "u64",
        dest: "AccountId32",
      },
      vote_proposal: {
        proposalId: "u64",
        agree: "bool",
      },
      unvote_proposal: {
        proposalId: "u64",
      },
    },
  },
  /**
   * Lookup147: pallet_subspace::voting::VoteMode
   **/
  PalletSubspaceVotingVoteMode: {
    _enum: ["Authority", "Vote"],
  },
  /**
   * Lookup148: pallet_ethereum::pallet::Call<T>
   **/
  PalletEthereumCall: {
    _enum: {
      transact: {
        transaction: "EthereumTransactionTransactionV2",
      },
    },
  },
  /**
   * Lookup149: ethereum::transaction::TransactionV2
   **/
  EthereumTransactionTransactionV2: {
    _enum: {
      Legacy: "EthereumTransactionLegacyTransaction",
      EIP2930: "EthereumTransactionEip2930Transaction",
      EIP1559: "EthereumTransactionEip1559Transaction",
    },
  },
  /**
   * Lookup150: ethereum::transaction::LegacyTransaction
   **/
  EthereumTransactionLegacyTransaction: {
    nonce: "U256",
    gasPrice: "U256",
    gasLimit: "U256",
    action: "EthereumTransactionTransactionAction",
    value: "U256",
    input: "Bytes",
    signature: "EthereumTransactionTransactionSignature",
  },
  /**
   * Lookup151: ethereum::transaction::TransactionAction
   **/
  EthereumTransactionTransactionAction: {
    _enum: {
      Call: "H160",
      Create: "Null",
    },
  },
  /**
   * Lookup152: ethereum::transaction::TransactionSignature
   **/
  EthereumTransactionTransactionSignature: {
    v: "u64",
    r: "H256",
    s: "H256",
  },
  /**
   * Lookup154: ethereum::transaction::EIP2930Transaction
   **/
  EthereumTransactionEip2930Transaction: {
    chainId: "u64",
    nonce: "U256",
    gasPrice: "U256",
    gasLimit: "U256",
    action: "EthereumTransactionTransactionAction",
    value: "U256",
    input: "Bytes",
    accessList: "Vec<EthereumTransactionAccessListItem>",
    oddYParity: "bool",
    r: "H256",
    s: "H256",
  },
  /**
   * Lookup156: ethereum::transaction::AccessListItem
   **/
  EthereumTransactionAccessListItem: {
    address: "H160",
    storageKeys: "Vec<H256>",
  },
  /**
   * Lookup157: ethereum::transaction::EIP1559Transaction
   **/
  EthereumTransactionEip1559Transaction: {
    chainId: "u64",
    nonce: "U256",
    maxPriorityFeePerGas: "U256",
    maxFeePerGas: "U256",
    gasLimit: "U256",
    action: "EthereumTransactionTransactionAction",
    value: "U256",
    input: "Bytes",
    accessList: "Vec<EthereumTransactionAccessListItem>",
    oddYParity: "bool",
    r: "H256",
    s: "H256",
  },
  /**
   * Lookup158: pallet_evm::pallet::Call<T>
   **/
  PalletEvmCall: {
    _enum: {
      withdraw: {
        address: "H160",
        value: "u64",
      },
      call: {
        source: "H160",
        target: "H160",
        input: "Bytes",
        value: "U256",
        gasLimit: "u64",
        maxFeePerGas: "U256",
        maxPriorityFeePerGas: "Option<U256>",
        nonce: "Option<U256>",
        accessList: "Vec<(H160,Vec<H256>)>",
      },
      create: {
        source: "H160",
        init: "Bytes",
        value: "U256",
        gasLimit: "u64",
        maxFeePerGas: "U256",
        maxPriorityFeePerGas: "Option<U256>",
        nonce: "Option<U256>",
        accessList: "Vec<(H160,Vec<H256>)>",
      },
      create2: {
        source: "H160",
        init: "Bytes",
        salt: "H256",
        value: "U256",
        gasLimit: "u64",
        maxFeePerGas: "U256",
        maxPriorityFeePerGas: "Option<U256>",
        nonce: "Option<U256>",
        accessList: "Vec<(H160,Vec<H256>)>",
      },
    },
  },
  /**
   * Lookup162: pallet_base_fee::pallet::Call<T>
   **/
  PalletBaseFeeCall: {
    _enum: {
      set_base_fee_per_gas: {
        fee: "U256",
      },
      set_elasticity: {
        elasticity: "Permill",
      },
    },
  },
  /**
   * Lookup163: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ["RequireSudo"],
  },
  /**
   * Lookup165: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: "PalletMultisigTimepoint",
    deposit: "u64",
    depositor: "AccountId32",
    approvals: "Vec<AccountId32>",
  },
  /**
   * Lookup167: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: [
      "MinimumThreshold",
      "AlreadyApproved",
      "NoApprovalsNeeded",
      "TooFewSignatories",
      "TooManySignatories",
      "SignatoriesOutOfOrder",
      "SenderInSignatories",
      "NotFound",
      "NotOwner",
      "NoTimepoint",
      "WrongTimepoint",
      "UnexpectedTimepoint",
      "MaxWeightTooLow",
      "AlreadyStored",
    ],
  },
  /**
   * Lookup168: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ["TooManyCalls"],
  },
  /**
   * Lookup180: pallet_subspace::voting::Proposal<T>
   **/
  PalletSubspaceVotingProposal: {
    id: "u64",
    proposer: "AccountId32",
    expirationBlock: "u64",
    data: "PalletSubspaceVotingProposalData",
    status: "PalletSubspaceVotingProposalStatus",
    votesFor: "BTreeSet<AccountId32>",
    votesAgainst: "BTreeSet<AccountId32>",
    proposalCost: "u64",
    creationBlock: "u64",
    finalizationBlock: "Option<u64>",
  },
  /**
   * Lookup181: pallet_subspace::voting::ProposalData<T>
   **/
  PalletSubspaceVotingProposalData: {
    _enum: {
      Custom: "Bytes",
      GlobalParams: "PalletSubspaceGlobalParams",
      SubnetParams: {
        netuid: "u16",
        params: "PalletSubspaceSubnetParams",
      },
      SubnetCustom: {
        netuid: "u16",
        data: "Bytes",
      },
      Expired: "Null",
      TransferDaoTreasury: {
        data: "Bytes",
        value: "u64",
        dest: "AccountId32",
      },
    },
  },
  /**
   * Lookup182: pallet_subspace::pallet::SubnetParams<T>
   **/
  PalletSubspaceSubnetParams: {
    founder: "AccountId32",
    founderShare: "u16",
    immunityPeriod: "u16",
    incentiveRatio: "u16",
    maxAllowedUids: "u16",
    maxAllowedWeights: "u16",
    minAllowedWeights: "u16",
    maxStake: "u64",
    maxWeightAge: "u64",
    minStake: "u64",
    name: "Bytes",
    tempo: "u16",
    trustRatio: "u16",
    maximumSetWeightCallsPerEpoch: "u16",
    voteMode: "PalletSubspaceVotingVoteMode",
    bondsMa: "u64",
  },
  /**
   * Lookup183: pallet_subspace::voting::ProposalStatus
   **/
  PalletSubspaceVotingProposalStatus: {
    _enum: ["Pending", "Accepted", "Refused", "Expired"],
  },
  /**
   * Lookup185: pallet_subspace::voting::CuratorApplication<T>
   **/
  PalletSubspaceVotingCuratorApplication: {
    id: "u64",
    userId: "AccountId32",
    payingFor: "AccountId32",
    data: "Bytes",
    status: "PalletSubspaceVotingApplicationStatus",
    applicationCost: "u64",
  },
  /**
   * Lookup186: pallet_subspace::voting::ApplicationStatus
   **/
  PalletSubspaceVotingApplicationStatus: {
    _enum: ["Pending", "Accepted", "Refused"],
  },
  /**
   * Lookup187: pallet_subspace::pallet::Error<T>
   **/
  PalletSubspaceError: {
    _enum: [
      "NetworkDoesNotExist",
      "TooFewVotesForNewProposal",
      "NetworkExist",
      "InvalidIpType",
      "NotRegistered",
      "NotEnoughStakeToWithdraw",
      "NotEnoughBalanceToStake",
      "BalanceWithdrawalError",
      "WeightVecNotEqualSize",
      "DuplicateUids",
      "InvalidUid",
      "InvalidUidsLength",
      "NotSettingEnoughWeights",
      "TooManyRegistrationsPerBlock",
      "AlreadyRegistered",
      "MaxAllowedUIdsNotAllowed",
      "CouldNotConvertToBalance",
      "StakeAlreadyAdded",
      "StorageValueOutOfRange",
      "TempoHasNotSet",
      "InvalidTempo",
      "SettingWeightsTooFast",
      "BalanceSetError",
      "MaxAllowedUidsExceeded",
      "TooManyUids",
      "InvalidMaxAllowedUids",
      "NetuidDoesNotExist",
      "SubnetNameAlreadyExists",
      "MissingSubnetName",
      "SubnetNameTooShort",
      "SubnetNameTooLong",
      "InvalidSubnetName",
      "BalanceNotAdded",
      "StakeNotRemoved",
      "KeyAlreadyRegistered",
      "EmptyKeys",
      "TooManyKeys",
      "NotCurator",
      "ApplicationNotFound",
      "AlreadyWhitelisted",
      "NotWhitelisted",
      "InvalidShares",
      "ProfitSharesNotAdded",
      "NotFounder",
      "NameAlreadyRegistered",
      "NotEnoughStakeToSetWeights",
      "NotEnoughStakeToStartNetwork",
      "NotEnoughStakePerWeight",
      "NoSelfWeight",
      "DifferentLengths",
      "NotEnoughBalanceToRegister",
      "StakeNotAdded",
      "BalanceNotRemoved",
      "BalanceCouldNotBeRemoved",
      "NotEnoughStakeToRegister",
      "StillRegistered",
      "MaxAllowedModules",
      "NotEnoughBalanceToTransfer",
      "NotVoteMode",
      "InvalidTrustRatio",
      "InvalidMinAllowedWeights",
      "InvalidMaxAllowedWeights",
      "InvalidMinStake",
      "InvalidMinDelegationFee",
      "InvalidSubnetStakeThreshold",
      "InvalidModuleMetadata",
      "ModuleMetadataTooLong",
      "InvalidMaxNameLength",
      "InvalidMinNameLenght",
      "InvalidMaxAllowedSubnets",
      "InvalidMaxAllowedModules",
      "InvalidMaxRegistrationsPerBlock",
      "InvalidTargetRegistrationsInterval",
      "InvalidVoteThreshold",
      "InvalidUnitEmission",
      "InvalidBurnRate",
      "InvalidMinBurn",
      "InvalidMaxBurn",
      "InvalidTargetRegistrationsPerInterval",
      "ModuleNameTooLong",
      "ModuleNameTooShort",
      "InvalidModuleName",
      "ModuleAddressTooLong",
      "InvalidModuleAddress",
      "ModuleNameDoesNotExist",
      "ModuleNameAlreadyExists",
      "ProposalNotFound",
      "InvalidProposalStatus",
      "InvalidProposalData",
      "AlreadyVoted",
      "InvalidVoteMode",
      "InvalidImmunityPeriod",
      "InvalidFounderShare",
      "InvalidIncentiveRatio",
      "InvalidProposalCost",
      "InvalidGeneralSubnetApplicationCost",
      "InvalidProposalExpiration",
      "InvalidProposalParticipationThreshold",
      "InsufficientStake",
      "VoteNotFound",
      "InvalidProposalCustomData",
      "ProposalCustomDataTooSmall",
      "ProposalCustomDataTooLarge",
      "ApplicationTooSmall",
      "ApplicationTooLarge",
      "ApplicationNotPending",
      "InvalidApplication",
      "NotEnoughBalanceToPropose",
      "NotEnoughtBalnceToApply",
      "InvalidMaxWeightAge",
      "InvalidRecommendedWeight",
      "InvalidMaxStake",
      "ArithmeticError",
      "MaximumSetWeightsPerEpochReached",
      "InsufficientDaoTreasuryFunds",
    ],
  },
  /**
   * Lookup190: fp_rpc::TransactionStatus
   **/
  FpRpcTransactionStatus: {
    transactionHash: "H256",
    transactionIndex: "u32",
    from: "H160",
    to: "Option<H160>",
    contractAddress: "Option<H160>",
    logs: "Vec<EthereumLog>",
    logsBloom: "EthbloomBloom",
  },
  /**
   * Lookup193: ethbloom::Bloom
   **/
  EthbloomBloom: "[u8;256]",
  /**
   * Lookup195: ethereum::receipt::ReceiptV3
   **/
  EthereumReceiptReceiptV3: {
    _enum: {
      Legacy: "EthereumReceiptEip658ReceiptData",
      EIP2930: "EthereumReceiptEip658ReceiptData",
      EIP1559: "EthereumReceiptEip658ReceiptData",
    },
  },
  /**
   * Lookup196: ethereum::receipt::EIP658ReceiptData
   **/
  EthereumReceiptEip658ReceiptData: {
    statusCode: "u8",
    usedGas: "U256",
    logsBloom: "EthbloomBloom",
    logs: "Vec<EthereumLog>",
  },
  /**
   * Lookup197: ethereum::block::Block<ethereum::transaction::TransactionV2>
   **/
  EthereumBlock: {
    header: "EthereumHeader",
    transactions: "Vec<EthereumTransactionTransactionV2>",
    ommers: "Vec<EthereumHeader>",
  },
  /**
   * Lookup198: ethereum::header::Header
   **/
  EthereumHeader: {
    parentHash: "H256",
    ommersHash: "H256",
    beneficiary: "H160",
    stateRoot: "H256",
    transactionsRoot: "H256",
    receiptsRoot: "H256",
    logsBloom: "EthbloomBloom",
    difficulty: "U256",
    number: "U256",
    gasLimit: "U256",
    gasUsed: "U256",
    timestamp: "u64",
    extraData: "Bytes",
    mixHash: "H256",
    nonce: "EthereumTypesHashH64",
  },
  /**
   * Lookup199: ethereum_types::hash::H64
   **/
  EthereumTypesHashH64: "[u8;8]",
  /**
   * Lookup204: pallet_ethereum::pallet::Error<T>
   **/
  PalletEthereumError: {
    _enum: ["InvalidSignature", "PreLogExists"],
  },
  /**
   * Lookup205: pallet_evm::CodeMetadata
   **/
  PalletEvmCodeMetadata: {
    _alias: {
      size_: "size",
      hash_: "hash",
    },
    size_: "u64",
    hash_: "H256",
  },
  /**
   * Lookup207: pallet_evm::pallet::Error<T>
   **/
  PalletEvmError: {
    _enum: [
      "BalanceLow",
      "FeeOverflow",
      "PaymentOverflow",
      "WithdrawFailed",
      "GasPriceTooLow",
      "InvalidNonce",
      "GasLimitTooLow",
      "GasLimitTooHigh",
      "Undefined",
      "Reentrancy",
      "TransactionMustComeFromEOA",
    ],
  },
  /**
   * Lookup209: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: "SpCoreEd25519Signature",
      Sr25519: "SpCoreSr25519Signature",
      Ecdsa: "SpCoreEcdsaSignature",
    },
  },
  /**
   * Lookup210: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: "[u8;64]",
  /**
   * Lookup211: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: "[u8;65]",
  /**
   * Lookup214: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: "Null",
  /**
   * Lookup215: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: "Null",
  /**
   * Lookup216: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: "Null",
  /**
   * Lookup217: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: "Null",
  /**
   * Lookup220: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: "Compact<u32>",
  /**
   * Lookup221: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: "Null",
  /**
   * Lookup222: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: "Compact<u64>",
  /**
   * Lookup224: node_subspace_runtime::Runtime
   **/
  NodeSubspaceRuntimeRuntime: "Null",
};
