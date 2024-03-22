import { db, schema } from "@stakecom/db";

export type NewStakeEvent = typeof schema.stakeEvent.$inferInsert;
export type StakeEventType = NewStakeEvent["eventType"];

export async function saveEvent(input: NewStakeEvent) {
  const event = await db
    .insert(schema.stakeEvent)
    .values({ ...input, status: "pending" })

    .returning();

  return event[0];
}
