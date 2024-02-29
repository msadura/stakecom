import { db, desc, schema } from "@stakecom/db";

export async function getLatestBlock() {
  const event = await db.query.stakeEvent.findFirst({
    orderBy: [desc(schema.stakeEvent.block)],
    columns: {
      block: true,
    },
  });

  return event?.block;
}
