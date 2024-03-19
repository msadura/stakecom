import { z } from "zod";

import { statsApiRouter } from "@stakecom/core";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const statsRouter = createTRPCRouter({
  getValidators: publicProcedure.query(() => {
    return statsApiRouter.getValidators();
  }),
  getValidator: publicProcedure.input(z.string()).query(({ input }) => {
    return statsApiRouter.getValidator(input);
  }),
});
