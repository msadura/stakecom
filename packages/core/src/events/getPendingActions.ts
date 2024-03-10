import type { schema } from "@stakecom/db";
import { db } from "@stakecom/db";

import type { Staker } from "~core/wallet";

export type PendingAction = typeof schema.stakeEvent.$inferSelect & {
  staker: Staker;
};

export async function getPendingActions() {
  const actions = await db.query.stakeEvent.findMany({
    where: (stakeEvent, { eq }) => eq(stakeEvent.status, "pending"),
    orderBy: (stakeEvent, { asc }) => [asc(stakeEvent.id)],
    with: {
      staker: true,
    },
  });

  return actions;
}
