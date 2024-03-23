import { env } from "~core/env";
import ky from "ky";

const serverApi = ky.create({
  prefixUrl: env.SDK_SERVER_URL,
  headers: {
    authorization: `Bearer ${env.SDK_SERVER_SECRET}`,
  },
});

export const serverApiRouter = {
  triggerProcess: async () => {
    return serverApi.post(`process`);
  },
};
