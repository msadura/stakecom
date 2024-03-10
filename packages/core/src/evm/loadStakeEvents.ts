import { stakeComAIV1Abi } from "~core/abi";
import { publicClient } from "~core/client";
import { STAKE_ADDRESS } from "~core/constants";

export async function loadStakeEvents(fromBlock?: bigint) {
  const logs = await publicClient.getContractEvents({
    address: STAKE_ADDRESS,
    abi: stakeComAIV1Abi,
    toBlock: "latest",
    fromBlock: fromBlock || "earliest",
  });

  return logs;
}
