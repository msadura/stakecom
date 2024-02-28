import { stakeComAIV1Abi } from "~/abi";
import { publicClient } from "~/client";
import { STAKE_ADDRESS } from "~/constants";

export async function loadStakeEvents(fromBlock?: bigint) {
  const logs = await publicClient.getContractEvents({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1Abi,
    toBlock: "latest",
    fromBlock: fromBlock || "earliest",
  });

  return logs;
}
