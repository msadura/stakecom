import { getFileContent } from "./utils/getFileContent";

const current = import.meta.dir;
const filePath = `${current}/blacklist.json`;

export async function getBlacklistedModules() {
  return getFileContent(filePath);
}

export async function addBlacklistedModule(address: string) {
  const modules = await getFileContent(filePath);
  const addressRaw = address.split(":")[0] || address;

  if (!modules.includes(addressRaw)) {
    modules.push(addressRaw);

    await Bun.write(filePath, JSON.stringify(modules));
  }

  return modules;
}
