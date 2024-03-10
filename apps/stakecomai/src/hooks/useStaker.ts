import { skipToken } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { api } from "~/trpc/react";

export function useStaker() {
  const { address } = useAccount();
  const { data } = api.stake.getStaker.useQuery(
    address ? { address, refresh: false } : skipToken,
  );

  console.log("🔥", data);
}
