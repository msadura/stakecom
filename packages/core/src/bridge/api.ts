import ky from "ky";

const bridgeApi = ky.create({
  prefixUrl: "https://api.bridge.comwallet.io/bridge",
});

export interface BridgeWithdrawalSeed {
  amount: string;
  evmAddress: string;
  signature: string;
}

export interface BridgeDepositAddress {
  evmAddress: string;
  comAddress: string;
}

export const bridgeApiRouter = {
  getWithdrawalSeed: async (destination: string) => {
    const json: BridgeWithdrawalSeed = await bridgeApi
      .get("getWithdrawalSeed", {
        searchParams: { destination },
      })
      .json();

    return json;
  },
  refreshComDeposit: async (evmAddress: string) => {
    const json: BridgeWithdrawalSeed = await bridgeApi
      .post("refreshComDeposit", {
        body: JSON.stringify({ evmAddress }),
      })
      .json();

    return json;
  },
  getDepositAddress: async (destination: string) => {
    const json: BridgeDepositAddress = await bridgeApi
      .get("getDepositAddress", {
        searchParams: { destination },
      })
      .json();

    return json;
  },
};
