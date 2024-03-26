import { db } from "@stakecom/db";

export interface StakeTransaction {
  id: number;
  evmAddress: string;
  module: string | null;
  eventType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  amount: string | null;
  pendingTransfer: boolean;
}

export async function getStakerTransactions({
  evmAddress,
}: {
  evmAddress: string;
}): Promise<StakeTransaction[]> {
  const transactions = await db.query.stakeEvent.findMany({
    where: (stakeEvent, { eq }) => eq(stakeEvent.evmAddress, evmAddress),
    orderBy: (stakeEvent, { desc }) => [desc(stakeEvent.createdAt)],
    columns: {
      id: true,
      evmAddress: true,
      moduleKey: true,
      eventType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      amount: true,
      pendingTransfer: true,
    },
  });

  return transactions.map((t) => ({
    id: t.id,
    evmAddress: t.evmAddress,
    module: t.moduleKey,
    eventType: t.eventType,
    status: t.status,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    amount: t.amount,
    pendingTransfer: !!t.pendingTransfer,
  }));
}
