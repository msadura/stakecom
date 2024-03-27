import { useCallback } from "react";
import { skipToken } from "@tanstack/react-query";

import { useStaker } from "~/hooks/useStaker";
import { api } from "~/trpc/react";

export function useTxHistory() {
  const { evmAddress } = useStaker();
  const { data: txHistory, refetch } = api.stake.getStakerTransactions.useQuery(
    evmAddress ? evmAddress : skipToken,
  );

  const refreshTxHistory = useCallback(() => {
    if (evmAddress) {
      refetch().catch(console.error);
    }
  }, [evmAddress, refetch]);

  return { txHistory, refreshTxHistory };
}
