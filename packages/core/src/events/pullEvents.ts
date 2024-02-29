import type { NewStakeEvent, StakeEventType } from "~/events/saveEvent";
import { getLatestBlock } from "~/events/getLatestBlock";
import { saveEvent } from "~/events/saveEvent";
import { loadStakeEvents } from "~/evm";

type ChainEvent = Awaited<ReturnType<typeof loadStakeEvents>>[0];

export async function pullEvents() {
  const latestBlock = await getLatestBlock();

  const events = await loadStakeEvents(
    latestBlock ? latestBlock + 1n : undefined,
  );

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
        return;
    }
  }
}

async function addEvent(event: ChainEvent, eventType: StakeEventType) {
  const { args, blockNumber, transactionHash } = event;

  if (!("user" in args) || !args.user) {
    // cannot save if no user
    return;
  }

  const inputEvent: NewStakeEvent = {
    evmAddress: args.user,
    eventType,
    block: blockNumber,
    status: "pending",
    amount: "amount" in args ? args.amount?.toString() || "0" : "0",
    fromAmount: "fromAmount" in args ? args.fromAmount?.toString() || "0" : "0",
    module: "module" in args ? args.module || "" : "",
    unstakeAll: "unstakeAll" in args ? args.unstakeAll || false : false,
    evmTxHash: transactionHash,
  };

  const newEvent = await saveEvent(inputEvent);

  return newEvent;
}
