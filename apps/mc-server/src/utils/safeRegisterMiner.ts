import {
  isIpBanned,
  isRegistrationLocked,
  lockRegistration,
  setLastRegistered,
  unlockRegistration,
} from "./registerLock";
import { registerMiner } from "./registerMiner";

export async function safeRegisterMiner({
  minerName,
  port,
  networkId,
}: {
  minerName: string;
  port: number;
  networkId?: number;
}) {
  try {
    const locked = await isRegistrationLocked();
    const isBanned = await isIpBanned();

    if (isBanned) {
      console.log("🔥", "IP is banned :(, skipping...");
      return;
    }

    // TODO: check if last registration was too recent if chain is full (200 modules).
    // Cooldown time ~10-15mins

    if (locked) {
      console.log("🔥", `Registration is locked by ${locked}, skipping...`);
      return;
    }

    await lockRegistration(minerName);

    await registerMiner({ minerName, port, networkId });

    await unlockRegistration();
    await setLastRegistered();
  } catch (err) {
    console.error("❌", "Failed to register new miner", err);

    await unlockRegistration();
  }
}
