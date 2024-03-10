import { z } from "zod";

import { getStakerUser } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stakeRouter = createTRPCRouter({
  getStaker: publicProcedure
    .input(z.object({ address: z.string(), refresh: z.boolean().optional() }))
    .query(({ input }) => {
      return getStakerUser({
        evmAddress: input.address,
        forceRefresh: input.refresh,
        createIfNotExists: true,
      });
    }),
});
