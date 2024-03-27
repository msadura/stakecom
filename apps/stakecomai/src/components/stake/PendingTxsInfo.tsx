import { formatWCOMAmount } from "~core/formatters";

import type { StakeTransaction } from "~core/wallet";
import { Badge } from "~/components/ui/badge";
import { Box } from "~/components/ui/box";

interface Props {
  txs: StakeTransaction[] | undefined;
}

export const PendingTxsInfo = ({ txs }: Props) => {
  const pending = txs?.filter(
    (tx) => tx.status === "pending" || tx.pendingTransfer,
  );

  if (!pending?.length) {
    return null;
  }

  return (
    <Box direction="col" className="mt-3 gap-1">
      {pending.map((tx) => (
        <Box key={tx.id} className="gap-1">
          <Badge className="animate-pulse text-xs uppercase">
            {getTxTypeLabel(tx)}
          </Badge>
          <p className="text-sm text-primary">
            You have pending {getTxTypeLabel(tx)}{" "}
            {tx.amount ? formatWCOMAmount(tx.amount) : "-"}
            {" COMAI"} transaction.
          </p>
        </Box>
      ))}
    </Box>
  );
};

function getTxTypeLabel(tx: StakeTransaction) {
  switch (tx.eventType) {
    case "stake":
      return "stake";
    case "initUnstake":
      return "unstake";
    case "changeModule":
      return "change module";
    default:
      return tx.eventType;
  }
}
