import figlet from "figlet";

import { app } from "./api/honoClient";
import { validatorRequestBodySchema } from "./entities/validatorRequestBodySchema";
import env from "./logic/env";

figlet("Alternative Miner", (err, data) => {
  if (err) {
    console.dir(err);
    return;
  }
  console.info(data);
  console.info("MINER_NAME: ", env.MINER_NAME);
  console.info("PORT: ", env.PORT);
});

app.post("/method/generate", async (c) => {
  const req = c.req;

  const parsedBody = validatorRequestBodySchema.safeParse(await req.json());
  if (!parsedBody.success) {
    console.error("❗[ERROR] Invalid request body: ", parsedBody.error);
    return c.json([]);
  }

  try {
    const result = await ky.post();

    return c.json(res || []);
  } catch (e) {
    console.error("❗[ERROR]", e);
    return c.json([]);
  }
});

export default {
  port: env.PORT,
  fetch: app.fetch,
  host: "0.0.0.0",
};
