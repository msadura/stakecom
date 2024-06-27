import { COMAI_DECIMALS } from "@stakecom/commune-sdk";

import { getModules } from "./getModules";

interface MinerHealth {
  registered: boolean;
  active: boolean;
  lowEmission: boolean;
  bans: number;
  registrations: number;
  icon: string;
}

const icons = {
  fine: "🟢",
  unregistered: "🔴",
  inactive: "🟡",
  lowEmission: "🐢",
};

const isSlowEmission = (emission: number) =>
  emission > 0 && emission < 0.1 * 10 ** COMAI_DECIMALS;

const minerHealth: MinerHealth = {
  registered: true,
  active: true,
  lowEmission: false,
  // TODO - stats to redis
  bans: 0,
  registrations: 0,
  icon: icons.fine,
};

export const getMinerHealth = () => ({ ...minerHealth });
export const incrementBans = () => minerHealth.bans++;
export const incrementRegistrations = () => minerHealth.registrations++;
export const resetMinerHealth = () => {
  minerHealth.registered = false;
  minerHealth.active = false;
  minerHealth.lowEmission = false;
  minerHealth.icon = icons.inactive;
};

export async function checkMinerHealth(minerName: string) {
  const modules = await getModules({ refresh: true });
  const minerModule = modules.find((module) => module.name === minerName);

  if (!minerModule) {
    minerHealth.registered = false;
    minerHealth.active = false;
    minerHealth.icon = icons.unregistered;
    return;
  }

  minerHealth.registered = true;

  if (minerModule.emission === 0) {
    minerHealth.active = false;
    minerHealth.icon = icons.inactive;
    return;
  }

  // if miner was marked as lowEmission once it will keep the state even if emission goes to 0
  minerHealth.active = true;
  const isLowEmission = isSlowEmission(minerModule.emission);
  minerHealth.lowEmission = isLowEmission;
  minerHealth.icon = isLowEmission ? icons.lowEmission : icons.fine;
}
