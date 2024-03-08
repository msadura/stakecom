import { db, schema } from "@stakecom/db";

import { encryptData } from "~/utils/dataEncryption";
import { generateCommuneWallet } from "~/wallet/generateCommuneWallet";

export type NewStaker = typeof schema.staker.$inferInsert;
export type Staker = typeof schema.staker.$inferSelect;

export interface CommuneWalletEncryptedSeed {
  mnemonicEncrypted: string;
  ss58Address: string;
}

export async function getStakerWallet(
  evmAddress: string,
  createIfNotExists = false,
): Promise<Staker> {
  const existingStaker = await db.query.staker.findFirst({
    where: (staker, { eq }) => eq(staker.evmAddress, evmAddress),
  });

  if (existingStaker) {
    if (!existingStaker.ss58Address) {
      throw new Error("Staker missing commune address");
    }

    return existingStaker;
  }

  if (createIfNotExists) {
    const { mnemonic, ss58Address } = generateCommuneWallet(evmAddress);
    const mnemonicEncrypted = encryptData(mnemonic);

    const newStaker = await db
      .insert(schema.staker)
      .values({
        evmAddress,
        ss58Address,
        mnemonicEncrypted,
      })
      .onConflictDoNothing()
      .returning();

    return newStaker[0]!;
  }

  throw new Error(`Staker not found ${evmAddress}`);
}
