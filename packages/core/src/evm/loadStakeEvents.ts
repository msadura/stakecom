import { publicClient } from "~/client";
import { STAKE_ADDRESS } from "~/constants";

export async function loadStakeEvents(fromBlock?: bigint) {
  const events = await publicClient.getLogs({
    address: STAKE_ADDRESS,
    fromBlock: fromBlock,
  });

  console.log("🔥 events", events);

  return events;
}
