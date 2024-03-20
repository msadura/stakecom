import { api } from "~/trpc/react";

export function useValidators(addressOrName?: string) {
  const { data: validatorsData } = api.stats.getValidators.useQuery();

  const validator = addressOrName
    ? validatorsData?.validators?.find(
        (v) => v.address === addressOrName || v.name === addressOrName,
      )
    : undefined;

  return { validatorsData, validator };
}
