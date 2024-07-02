import {
  getMinerHealth,
  incrementBans,
  incrementRegistrations,
} from "./checkMinerHealth";
import { regenerateMiner } from "./regenerateMiner";
import { registerMiner } from "./registerMiner";

export async function fixMinerHealth({
  minerName,
  port,
  networkId = 17,
}: {
  minerName: string;
  port: number;
  networkId?: number;
}) {
  const { registered, lowEmission } = getMinerHealth();

  // if not registered and not banned - register
  if (!registered && !lowEmission) {
    console.log("🔥", "Trying to re-register miner...");
    await registerMiner({
      minerName,
      port,
      networkId,
    })
      .then(() => {
        incrementRegistrations();
        console.log("🔥", "Miner registered again");
      })
      .catch((e: any) => {
        console.log("🔥", "Failed to re-register.", e.message);
      });

    return;
  }

  if (lowEmission) {
    console.log(
      "🐢",
      "Miner is banned trying to wipe and regen with new key...",
    );

    await regenerateMiner({ minerName, port, networkId })
      .then(() => {
        incrementBans();
        console.log("🔥", "Miner regenerated.");
      })
      .catch((e: any) => {
        console.log("🔥", "Failed to regenerate miner.", e);
      });
  }
}
