import { stakeComAIV1 } from "~/abi";
import { publicClient } from "~/client";
import { STAKE_ADDRESS } from "~/constants";

export async function loadStakeEvents(fromBlock?: bigint) {
  const events = await publicClient.getContractEvents({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1,
    fromBlock: fromBlock,
  });

  console.log("🔥 events", events);

  return events;
}
