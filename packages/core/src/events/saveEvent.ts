import { db, schema } from "@stakecom/db";

export type NewStakeEvent = typeof schema.stakeEvent.$inferInsert;
export type StakeEventType = NewStakeEvent["eventType"];

export async function saveEvent(input: NewStakeEvent) {
  console.log("🔥i ?", input);
  const event = await db
    .insert(schema.stakeEvent)
    .values({ ...input, status: "pending" })
    .onConflictDoNothing()
    .returning();

  return event[0];
}
