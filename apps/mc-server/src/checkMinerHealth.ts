import { COMAI_DECIMALS } from "@stakecom/commune-sdk";

import { getModules } from "./getModules";

interface MinerHealth {
  registered: boolean;
  active: boolean;
  lowEmissions: boolean;
}

const icons = {
  fine: "🟢",
  unregistered: "🔴",
  inactive: "🟡",
  lowEmissions: "🐢",
};

const isSlowEmission = (emission: number) =>
  emission > 0 && emission < 0.1 * 10 ** COMAI_DECIMALS;

const minerHealth: MinerHealth = {
  registered: true,
  active: true,
  lowEmissions: false,
};

export const getMinerHealth = () => {
  return { ...minerHealth };
};

const getIcon = () => {
  if (!minerHealth.registered) {
    return icons.unregistered;
  }

  if (minerHealth.lowEmissions) {
    return icons.lowEmissions;
  }

  if (!minerHealth.active) {
    return icons.inactive;
  }

  return icons.fine;
};

export async function checkMinerHealth(minerName: string) {
  const modules = await getModules({ refresh: false });
  const minerModule = modules.find((module) => module.name === minerName);

  if (!minerModule) {
    minerHealth.registered = false;
    minerHealth.active = false;
    return;
  }

  minerHealth.active = minerModule.emission > 0;
  minerHealth.lowEmissions = isSlowEmission(minerModule.emission);

  console.log(getIcon(), `[${minerName}] health:`, minerHealth);

  return minerHealth;
}
