import { db, eq, schema } from "@stakecom/db";

type UpdateStaker = Partial<typeof schema.staker.$inferInsert>;

export async function updateStaker({
  evmAddress,
  updateInput,
}: {
  evmAddress: string;
  updateInput: UpdateStaker;
}) {
  return db
    .update(schema.staker)
    .set({ ...updateInput, updatedAt: new Date() })
    .where(eq(schema.staker.evmAddress, evmAddress))
    .returning();
}
