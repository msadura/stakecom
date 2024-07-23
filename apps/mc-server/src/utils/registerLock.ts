import { getConfig } from "../getConfig";
import { redisServer } from "./redis";

const config = await getConfig();

const regLockKey = `reg-lock:${config.tenantNickname}`;
const regLastKey = `reg-last:${config.tenantNickname}`;
const regBanKey = `reg-ban:${config.tenantNickname}`;

export const lockRegistration = (minerName: string) => {
  return redisServer.set(regLockKey, minerName);
};

export const unlockRegistration = () => {
  return redisServer.set(regLockKey, "");
};

export const isRegistrationLocked = async () => {
  const lock = await redisServer.get(regLockKey);
  return lock ? lock : false;
};

export const setLastRegistered = () => {
  return redisServer.set(regLastKey, Date.now());
};

export const getLastRegistered = async () => {
  const last = await redisServer.get(regLastKey);
  return last ? parseInt(last) : null;
};

export const isIpBanned = async () => {
  const isBanStr = await redisServer.get(regBanKey);

  try {
    return JSON.parse(isBanStr || "") as boolean;
  } catch (e) {
    return false;
  }
};

export const setIpBan = (isBan: boolean) => {
  return redisServer.set(regBanKey, JSON.stringify(isBan));
};
