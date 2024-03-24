import type { WalletClient } from "viem";
import { bridgeAbi } from "~core/bridge";
import { publicClient } from "~core/client";
import { BRIDGE_ADDRESS } from "~core/constants";
import { getContract } from "viem";

export function getBridgeContract(walletClient?: WalletClient) {
  return getContract({
    address: BRIDGE_ADDRESS,
    abi: bridgeAbi,
    client: { public: publicClient, wallet: walletClient },
  });
}
