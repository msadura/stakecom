import { z } from "zod";

import {
  getStakerUser,
  getStakerWallet,
  getStakeSignature,
} from "@stakecom/core";

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
        moduleKey: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { ss58Address } = await getStakerWallet({
        evmAddress: input.evmAddress,
        createIfNotExists: true,
      });

      return {
        signature: await getStakeSignature({ ...input, ss58Address }),
        evmAddress: input.evmAddress,
        moduleKey: input.moduleKey,
        ss58Address,
      };
    }),
});
