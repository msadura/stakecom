import { db, eq, schema } from "@stakecom/db";

type UpdateEvent = Partial<typeof schema.stakeEvent.$inferInsert>;

export async function updateEvent({
  id,
  updateInput,
}: {
  id: number;
  updateInput: UpdateEvent;
}) {
  return db
    .update(schema.stakeEvent)
    .set(updateInput)
    .where(eq(schema.stakeEvent.id, id))
    .returning();
}
