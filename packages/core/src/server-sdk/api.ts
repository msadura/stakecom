import { env } from "~core/env";
import ky from "ky";

const sdkServerApi = ky.create({
  prefixUrl: env.SDK_SERVER_URL,
});

export const sdkServerRouter = {
  refreshStaker: async (evmAddress: string) => {
    const json: { refreshed: boolean } = await sdkServerApi
      .put(`wallet/${evmAddress}/refresh`)
      .json();

    return json;
  },
};
