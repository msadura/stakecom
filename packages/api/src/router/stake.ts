import { z } from "zod";

import { getStakerUser, getStakeSignature } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stakeRouter = createTRPCRouter({
  getStaker: publicProcedure.input(z.string()).query(({ input }) => {
    return getStakerUser({
      evmAddress: input,
      createIfNotExists: true,
    });
  }),
  refreshStaker: publicProcedure.input(z.string()).mutation(({ input }) => {
    return getStakerUser({ evmAddress: input, forceRefresh: true });
  }),
  getSignature: publicProcedure
    .input(
      z.object({
        evmAddress: z.string(),
        ss58Address: z.string(),
        module: z.string(),
      }),
    )
    .query(({ input }) => {
      return getStakeSignature(input);
    }),
});
