import { db, schema } from "@comstaked/db";

import { encryptData } from "~/utils/dataEncryption";
import { generateCommuneWallet } from "~/wallet";

export type NewStaker = typeof schema.staker.$inferInsert;

export interface CommuneWalletEncryptedSeed {
  mnemonicEncrypted: string;
  ss58Address: string;
}

export async function getCommuneWalletForEvm(
  evmAddress: string,
  createIfNotExists = false,
): Promise<CommuneWalletEncryptedSeed> {
  const existingWallet = await db.query.staker.findFirst({
    where: (staker, { eq }) => eq(staker.evmAddress, evmAddress),
  });

  if (existingWallet?.ss58Address) {
    return {
      mnemonicEncrypted: existingWallet.mnemonicEncrypted,
      ss58Address: existingWallet.ss58Address,
    };
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

    return {
      ss58Address: newStaker[0]?.ss58Address || ss58Address,
      mnemonicEncrypted: newStaker[0]?.mnemonicEncrypted || mnemonicEncrypted,
    };
  }

  throw new Error("Staker not found or missing commune address");
}
