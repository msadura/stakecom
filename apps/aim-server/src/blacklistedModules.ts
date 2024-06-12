const current = import.meta.dir;
const filePath = `${current}/blacklist.json`;

async function getFileContent() {
  try {
    const file = Bun.file(filePath);
    const content = (await file.json()) as string[];

    return content;
  } catch (e) {
    await Bun.write(filePath, JSON.stringify([]));

    return [];
  }
}

export async function getBlacklistedModules() {
  return getFileContent();
}

export async function addBlacklistedModule(address: string) {
  const modules = await getFileContent();
  const addressRaw = address.split(":")[0] || address;

  if (!modules.includes(addressRaw)) {
    modules.push(addressRaw);

    await Bun.write(filePath, JSON.stringify(modules));
  }

  return modules;
}
