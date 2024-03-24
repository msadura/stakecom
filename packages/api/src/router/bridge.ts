import { z } from "zod";

import { bridgeApiRouter, getBridgeWithdrawalSeed } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bridgeRouter = createTRPCRouter({
  getWithdrawalSeed: publicProcedure.input(z.string()).query(({ input }) => {
    return getBridgeWithdrawalSeed(input);
  }),
  refreshComDeposit: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      await bridgeApiRouter.refreshComDeposit(input);

      return getBridgeWithdrawalSeed(input);
    }),
});
