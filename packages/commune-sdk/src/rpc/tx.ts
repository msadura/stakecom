import type { ApiPromise } from "@polkadot/api";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { KeyringPair } from "@polkadot/keyring/types";
import type { SpRuntimeDispatchError } from "@polkadot/types/lookup";
import type { ISubmittableResult } from "@polkadot/types/types";

import type {
  RegisterInput,
  StakeInput,
  TransferInput,
  TxError,
} from "../types";
import {
  getBalances,
  getBurn,
  getClient,
  getMinStake,
  getStakeByModule,
  getSubnetName,
} from "../rpc";
import { toAmountValue } from "../utils";

export async function estimateTransferFee({
  amount,
  recipient,
  signer,
}: TransferInput) {
  const api = await getClient();
  const fees = await api.tx.balances
    .transferKeepAlive(recipient, amount)
    .paymentInfo(signer);

  return fees.partialFee;
}

export async function transfer({ amount, recipient, signer }: TransferInput) {
  const api = await getClient();

  const tx = api.tx.balances.transferKeepAlive(recipient, amount);

  return broadcastTx({
    tx,
    signer,
    api,
    successMessage: "Transfer successful",
  });
}

export async function transferAll({
  recipient,
  signer,
  keepBalance = 0n,
}: {
  recipient: string;
  signer: KeyringPair;
  keepBalance?: bigint;
}) {
  const api = await getClient();
  const { balance } = await getBalances({ address: signer.address });

  if (balance === 0n) {
    return {
      success: false,
      msg: "No balance found to transfer",
    };
  }

  if (keepBalance <= 0n) {
    const tx = api.tx.balances.transferAll(recipient, false);

    return broadcastTx({
      tx,
      signer,
      api,
      successMessage: "Transfer all successful",
    });
  }

  const fee = await estimateTransferFee({ amount: balance, recipient, signer });
  const tx = api.tx.balances.transferKeepAlive(
    recipient,
    balance - keepBalance - fee.toBigInt(),
  );

  return broadcastTx({
    tx,
    signer,
    api,
    successMessage: "Transfer all successful",
  });
}

export async function stake({
  networkId = 0,
  amount,
  moduleKey,
  signer,
}: StakeInput) {
  const api = await getClient();
  const tx = api.tx.subspaceModule.addStake(networkId, moduleKey, amount);

  return broadcastTx({ tx, signer, api, successMessage: "Stake successful" });
}

export async function unstake({
  networkId = 0,
  amount,
  moduleKey,
  signer,
}: StakeInput) {
  let unstakeAmount = amount;
  console.log("🔥 amount", amount);
  if (!amount || amount === 0n) {
    unstakeAmount = await getStakeByModule({
      networkId,
      moduleKey,
      address: signer.address,
    });
  }

  if (unstakeAmount === 0n) {
    return {
      success: false,
      msg: "No stake found to unstake",
    };
  }
  console.log("🔥 unstake amount", unstakeAmount);
  const api = await getClient();
  const tx = api.tx.subspaceModule.removeStake(
    networkId,
    moduleKey,
    unstakeAmount,
  );

  return broadcastTx({ tx, signer, api, successMessage: "Unstake successful" });
}

export async function register({
  networkId = 0,
  stake = 0n,
  metadata = null,
  signer,
  name,
  address,
}: RegisterInput) {
  const api = await getClient();
  const subnetName = await getSubnetName(networkId);
  const burn = await getBurn(networkId);
  const minStake = await getMinStake(networkId);

  // 0.1 extra for tx to succeed
  const minStakeWithFees = burn + minStake + toAmountValue(0.1);
  const stakeAmount = stake > minStakeWithFees ? stake : minStakeWithFees;
  const tx = api.tx.subspaceModule.register(
    subnetName,
    name,
    address,
    stakeAmount,
    signer.address,
    metadata,
  );

  return broadcastTx({
    tx,
    signer,
    api,
    successMessage: `Module ${name} registered on subnet ${subnetName}`,
  });
}

function broadcastTx({
  tx,
  signer,
  successMessage,
  api,
}: {
  tx: SubmittableExtrinsic<"promise", ISubmittableResult>;
  signer: KeyringPair;
  successMessage?: string;
  api: ApiPromise;
}) {
  // wrap with promise
  return new Promise<{
    success: boolean;
    msg?: string;
    txHash?: string;
    errorCode?: string;
  }>((resolve, reject) => {
    tx.signAndSend(signer, ({ events = [], status, txHash }) => {
      if (status.isFinalized) {
        const txError = unwrapError(events, api);
        if (txError) {
          resolve({
            success: false,
            errorCode: txError.code,
            msg: txError.reason,
          });
        }

        resolve({
          success: true,
          txHash: txHash.toHex(),
          msg: successMessage || "Transaction successful",
        });
      }
    }).catch((e: any) => {
      reject({ success: false, message: e.message, errorCode: e.code });
    });
  });
}

function unwrapError(
  events: ISubmittableResult["events"],
  api: ApiPromise,
): TxError | undefined {
  const errors = events
    // find/filter for failed events
    .filter(({ event }) => api.events.system.ExtrinsicFailed.is(event));

  for (const {
    event: { data },
  } of errors) {
    const error = data[0] as SpRuntimeDispatchError;
    if (error?.isModule) {
      // for module errors, we have the section indexed, lookup
      const decoded = api.registry.findMetaError(error.asModule);
      const { docs, method, section } = decoded;
      return { code: `${section}.${method}`, reason: docs.join(" ") };
    } else {
      return { code: error.toString() };
    }
  }
}
