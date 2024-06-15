import ky, { HTTPError } from "ky";

import {
  addBlacklistedModule,
  getBlacklistedModules,
} from "./blacklistedModules";
import { getActiveModules } from "./getActiveModules";
import { addProModule, getProModules } from "./proModules";

export async function classifyModules() {
  const pro = await getProModules();
  const blacklist = await getBlacklistedModules();

  console.info("🔵 Getting active modules");
  const activeModules = await getActiveModules({
    ignoreBlacklist: true,
    refresh: true,
  });

  console.info(
    `🕵️‍♀️ Found ${activeModules.length} active modules. Proceed with classifing.`,
  );

  const shouldBeBlacklisted: string[] = [...blacklist];
  const shouldBePro: string[] = [...pro];

  let moduleNumber = 0;

  for (const activeModule of activeModules) {
    const ip = activeModule.address.split(":")[0] || activeModule.address;

    moduleNumber++;
    console.info(
      `🔵 Classifing module number ${moduleNumber}: ${activeModule.name} - ${activeModule.address}`,
    );
    try {
      console.info("ip", ip);
      const isAlreadyBlacklisted = shouldBeBlacklisted.some((entry) =>
        entry.includes(ip),
      );
      if (isAlreadyBlacklisted) {
        throw { code: "AlreadyBlacklisted" };
      }
      await ky
        .post(`http://${activeModule.address}/method/generate`, {
          timeout: 3000,
        })
        .json();
    } catch (e: any) {
      if (e.code === "ConnectionRefused" || e.code === "AlreadyBlacklisted") {
        console.log(`🔴 [BLACKLIST] ${activeModule.name} - ConnectionRefused`);
        shouldBeBlacklisted.push(activeModule.address);
      } else if (e instanceof HTTPError) {
        if (e.response.status === 400) {
          console.log(`🚀 [PRO] ${activeModule.name}`);
          shouldBePro.push(activeModule.address);
        }
      } else {
        console.error(`🔴 [Responded] ${activeModule.name}`, e);
      }
    }
  }

  console.info("Classifing completed.");
  if (shouldBeBlacklisted.length) {
    console.info("🔵 Permanently blacklisting IPs:");
    console.table(shouldBeBlacklisted);
    for (const blacklistAddress of shouldBeBlacklisted) {
      await addBlacklistedModule(blacklistAddress).catch(console.error);
    }
    console.info("✅ Blacklisting completed.");
  }

  if (shouldBePro.length) {
    console.info("🔵 Adding to PRO IPs:");
    console.table(shouldBePro);
    for (const newPro of shouldBePro) {
      await addProModule(newPro).catch(console.error);
    }
    console.info("✅ Updating pro list completed.");
  }
}
