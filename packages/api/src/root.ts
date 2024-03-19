import { authRouter } from "./router/auth";
import { bridgeRouter } from "./router/bridge";
import { stakeRouter } from "./router/stake";
import { statsRouter } from "./router/stats";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  bridge: bridgeRouter,
  stake: stakeRouter,
  stats: statsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
