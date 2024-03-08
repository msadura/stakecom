import { z } from "zod";

import { bridgeApiRouter } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bridgeRouter = createTRPCRouter({
  getWithdrawalSeed: publicProcedure.input(z.string()).query(({ input }) => {
    return bridgeApiRouter.getWithdrawalSeed(input);
  }),
  refreshComDeposit: publicProcedure.input(z.string()).mutation(({ input }) => {
    return bridgeApiRouter.refreshComDeposit(input);
  }),
});
