import { Elysia, t } from "elysia";
import {  getStakerUser, loadStakeEvents, processEvents, } from "@stakecom/core";
import { cron } from '@elysiajs/cron'

const app = new Elysia().get("/", () => "Hello Elysia")
.get('/wallet/:address', async ({params}) => {
  const stakerWallet = await getStakerUser(params.address, true);
  return stakerWallet;
}, {
  params: t.Object({
      address: t.String()
  })
})
.use(
  cron({
      name: 'processEvents',
      // run every 5minutes
      pattern: '0 */5 * * * *',
      run() {
          processEvents()
      }
  }))
  .on('start', () => {
    console.log('🚀 Elysia started')

    processEvents();
  }).listen(3535);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
