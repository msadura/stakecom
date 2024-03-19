import { z } from "zod";

import { getStakerUser, getStakeSignature } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stakeRouter = createTRPCRouter({
  getStaker: publicProcedure
    .input(
      z.object({ evmAddress: z.string(), refresh: z.boolean().optional() }),
    )
    .query(({ input }) => {
      return getStakerUser({
        evmAddress: input.evmAddress,
        forceRefresh: input.refresh,
        createIfNotExists: true,
      });
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
