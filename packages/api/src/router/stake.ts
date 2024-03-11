import { z } from "zod";

import { getStakerUser, sdkServerRouter } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stakeRouter = createTRPCRouter({
  getStaker: publicProcedure.input(z.string()).query(({ input }) => {
    return getStakerUser({
      evmAddress: input,
      createIfNotExists: true,
    });
  }),
  refreshStaker: publicProcedure.input(z.string()).mutation(({ input }) => {
    return sdkServerRouter.refreshStaker(input);
  }),
});
