import { z } from "zod";

import {
  getStakerTransactions,
  getStakerUser,
  getStakerWallet,
  getStakeSignature,
  serverApiRouter,
} from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const stakeRouter = createTRPCRouter({
  getStaker: publicProcedure.input(z.string()).query(({ input }) => {
    return getStakerUser({
      evmAddress: input,
      createIfNotExists: true,
    });
  }),
  getStakerTransactions: publicProcedure
    .input(z.string())
    .query(({ input }) => {
      return getStakerTransactions({
        evmAddress: input,
      });
    }),
  refreshUserEvents: publicProcedure.input(z.string()).mutation(({ input }) => {
    // invoke event processing
    serverApiRouter.triggerProcess().catch(console.error);

    return getStakerUser({ evmAddress: input, forceRefresh: true });
  }),
  refreshStaker: publicProcedure.input(z.string()).mutation(({ input }) => {
    // invoke event processing
    serverApiRouter.triggerProcess().catch(console.error);

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
