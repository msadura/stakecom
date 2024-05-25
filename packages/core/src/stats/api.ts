import ky from "ky";

const statsApi = ky.create({
  prefixUrl: "https://api.comstats.org",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface StatsValidator {
  subnet_id: number;
  name: string;
  address: string;
  emission: number;
  incentive: number;
  dividends: number;
  regblock: number;
  last_update: number;
  balance: number;
  stake: number;
  total_stakers: number;
  delegation_fee: number;
  type: string;
  key: string;
  apy: number;
}

export interface ValidatorsInfo {
  total: number;
  page: number;
  limit: number;
  validators: StatsValidator[];
}

export interface StatsValidatorStake {
  stake_from: [string, number][];
}

export const statsApiRouter = {
  getValidators: async ({
    limit = 10000,
    page = 1,
    subnet_id = 0,
  }: {
    limit?: number;
    page?: number;
    subnet_id?: number;
  } = {}) => {
    const res = await statsApi.get("validators/", {
      searchParams: { limit, page, subnet_id },
    });
    const json: ValidatorsInfo = await res.json();

    return json;
  },
  getValidator: async (key: string, subnet_id = 0) => {
    const res = await statsApi.get(`validators/${key}`, {
      searchParams: { subnet_id },
    });
    const json: StatsValidator & StatsValidatorStake = await res.json();

    return json;
  },
};
