import { getMinerHealth, incrementBans } from "./checkMinerHealth";
import { regenerateMiner } from "./regenerateMiner";
import { safeRegisterMiner } from "./safeRegisterMiner";

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
    await safeRegisterMiner({ minerName, port, networkId });
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
