import type { ApiPromise } from "@polkadot/api";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import type { KeyringPair } from "@polkadot/keyring/types";
import type { SpRuntimeDispatchError } from "@polkadot/types/lookup";
import type { ISubmittableResult } from "@polkadot/types/types";

import type { StakeInput, TransferInput, TxError } from "../types";
import { getClient, getStakeByModule } from "../rpc";

export async function transfer({ amount, recipient, signer }: TransferInput) {
  const api = await getClient();
  const tx = api.tx.balances.transfer(recipient, amount);

  return broadcastTx({
    tx,
    signer,
    api,
    successMessage: "Transfer successful",
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

  const api = await getClient();
  const tx = api.tx.subspaceModule.removeStake(
    networkId,
    moduleKey,
    unstakeAmount,
  );

  return broadcastTx({ tx, signer, api, successMessage: "Stake successful" });
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
      console.log(`Current status is ${status.type}`);

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
