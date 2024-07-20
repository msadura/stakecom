import { getConfig } from "../getConfig";
import { redisServer } from "./redis";

const config = await getConfig();

const regLockKey = `reg-lock:${config.tenantNickname}`;
const regLastKey = `reg-last:${config.tenantNickname}`;

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
