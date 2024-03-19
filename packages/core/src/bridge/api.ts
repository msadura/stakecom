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
    const res = await bridgeApi.get("getWithdrawalSeed", {
      searchParams: { destination },
    });
    const json: BridgeWithdrawalSeed = await res.json();

    return json;
  },
  refreshComDeposit: async (evmAddress: string) => {
    const res = await bridgeApi.post("refreshComDeposit", {
      body: JSON.stringify({ evmAddress }),
    });
    const json: BridgeWithdrawalSeed = await res.json();

    return json;
  },
  getDepositAddress: async (destination: string) => {
    const res = await bridgeApi.get("getDepositAddress", {
      searchParams: { destination },
    });
    const json: BridgeDepositAddress = await res.json();

    return json;
  },
};
