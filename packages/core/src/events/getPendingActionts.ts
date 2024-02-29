import { db } from "@stakecom/db";

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
