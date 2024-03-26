import { getLatestBlock } from "~core/events/getLatestBlock";
import { saveEvent } from "~core/events/saveEvent";
import { loadStakeEvents } from "~core/evm";
import { COMToWCOMAmountValue } from "~core/utils/COMToWCOMAmountValue";
import { getStakerWallet } from "~core/wallet";

import { getBalances } from "@stakecom/commune-sdk";

import type { NewStakeEvent, StakeEventType } from "~core/events/saveEvent";

type ChainEvent = Awaited<ReturnType<typeof loadStakeEvents>>[0];

export async function pullEvents() {
  const latestBlock = await getLatestBlock();

  const events = await loadStakeEvents(
    latestBlock ? latestBlock + 1n : undefined,
  );

  console.log("🔥", `Loaded ${events.length} new events from chain`);

  for (const event of events) {
    switch (event.eventName) {
      case "Staked": {
        await addEvent(event, "stake");
        return;
      }
      case "InitUnstake": {
        await addEvent(event, "initUnstake");
        return;
      }
      case "ModuleChanged": {
        await addEvent(event, "changeModule");
        return;
      }
      default:
        continue;
    }
  }
}

async function addEvent(event: ChainEvent, eventType: StakeEventType) {
  const { args, blockNumber, transactionHash } = event;

  if (!("user" in args) || !args.user) {
    // cannot save if no user
    return;
  }

  let amount = "amount" in args ? args.amount?.toString() || "0" : "0";
  const unstakeAll = "unstakeAll" in args ? args.unstakeAll || false : false;

  if (unstakeAll) {
    // set amount to the real staked amount
    const { moduleKey } = await getStakerWallet({ evmAddress: args.user });
    const { stake } = await getBalances({ address: args.user });
    const stakedKey = moduleKey || Object.keys(stake)[0];
    const staked = stake[stakedKey || ""];
    if (staked) {
      amount = COMToWCOMAmountValue(staked.toString()).toString();
    }
  }

  const inputEvent: NewStakeEvent = {
    evmAddress: args.user,
    eventType,
    block: blockNumber,
    status: "pending",
    amount,
    fromAmount: "fromAmount" in args ? args.fromAmount?.toString() || "0" : "0",
    moduleKey: "module" in args ? args.module || "" : "",
    unstakeAll: "unstakeAll" in args ? args.unstakeAll || false : false,
    evmTxHash: transactionHash,
  };

  const newEvent = await saveEvent(inputEvent);

  return newEvent;
}
