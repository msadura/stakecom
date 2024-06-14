import { Hono } from "hono";
import { logger } from "hono/logger";
import ky, { HTTPError } from "ky";

import blacklist from "./blacklist.json";
import { addBlacklistedModule } from "./blacklistedModules";
import { getActiveModules } from "./getActiveModules";
import pro from "./pro.json";
import { addProModule } from "./proModules";
import { queryMiner } from "./queryMiner";
import { sleep } from "./sleep";
import { validatorRequestBodySchema } from "./types";

const app = new Hono();

app.use(logger());

const PORT = process.env.PORT;
const MINER_NAME = process.env.MINER_NAME;

if (!MINER_NAME) {
  throw new Error("MINER_NAME var is required");
}

if (!PORT) {
  throw new Error("PORT var is required");
}

console.log("🔥 MINER_NAME: ", MINER_NAME);
console.log("🔥 PORT: ", PORT);

export default {
  port: PORT,
  fetch: app.fetch,
};

app.post("/method/generate", async (c) => {
  const req = c.req;

  const body = await req.json();
  const parsedBody = validatorRequestBodySchema.parse(body);

  try {
    const res = await Promise.any([
      queryMiner({
        prompt: parsedBody.params.prompt,
        keyName: MINER_NAME,
      }),
      queryMiner({
        prompt: parsedBody.params.prompt,
        keyName: MINER_NAME,
      }),
      queryMiner({
        prompt: parsedBody.params.prompt,
        keyName: MINER_NAME,
      }),
      sleep(12000),
    ]);

    return c.json(res || []);
  } catch (e) {
    // TODO: what if request fails?
    return c.json([]);
  }
});

app.post("/classifyMiners", async (c) => {
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
    moduleNumber++;
    console.info(
      `🔵 Classifing module number ${moduleNumber}: ${activeModule.name} - ${activeModule.address}`,
    );
    try {
      const [ip] = activeModule.address.split(":");
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
    } catch (e) {
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

  return c.json([]);
});

// refresh modules periodically
const refreshModules = () => {
  console.log("🔥", "Refreshing modules list");
  getActiveModules({ ignoreBlacklist: true, refresh: true }).catch(() =>
    console.log("Failed to refresh modules"),
  );
};

refreshModules();

setInterval(
  refreshModules,
  5 * 60 * 1000, // 5 minutes
);
