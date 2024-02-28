import { db, desc, schema } from "@comstaked/db";

export async function getLatestBlock() {
  const event = await db.query.stakeEvent.findFirst({
    orderBy: [desc(schema.stakeEvent.block)],
    columns: {
      block: true,
    },
  });

  return event?.block;
}
