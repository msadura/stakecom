import { Elysia, t } from "elysia";
import { generateCommuneWallet, getStakerUser, loadStakeEvents, } from "@stakecom/core";

const app = new Elysia().get("/", () => "Hello Elysia")
  .get("/events", async () => {
 const events =  loadStakeEvents();
 return events;
}).get('/wallet/:address', async ({params}) => {
  const stakerWallet = await getStakerUser(params.address, true);
  return stakerWallet;
}, {
  params: t.Object({
      address: t.String()
  })
}).listen(3535);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
