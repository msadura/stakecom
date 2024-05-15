import { getBalances } from "@stakecom/commune-sdk";

const getKeyBalance = async (address: string) => {
  const { balance } = await getBalances({ address });
  return balance;
};
