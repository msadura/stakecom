import { skipToken } from "@tanstack/react-query";

import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

export function useTxHistory() {
  const { evmAddress } = useStaker();
  const { data: txHistory } = api.stake.getStakerTransactions.useQuery(
    evmAddress ? evmAddress : skipToken,
  );

  return { txHistory };
}
