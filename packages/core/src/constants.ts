import type { Address } from "viem";
import { blastSepolia, mainnet } from "viem/chains";

export const chain =
  process.env.USE_TESTNET === "true" ? blastSepolia : mainnet;
const chainId = chain.id;

interface CoreContract {
  STAKE: Address;
  BRIDGE: Address;
  WCOMAI: Address;
}

export const contracts: Record<168587773 | 1, CoreContract> = {
  [blastSepolia.id]: {
    STAKE: "0xCAB41763BAb08C20AF6F21903F9AA088eEa7dc89",
    BRIDGE: "0xc49294f243CE435fB4e7Dc1790F277Fba6fcCcB2",
    WCOMAI: "0x1397d3b5c668Fa2Ebb3fF4EA8f024A29E8f3eF3C",
  },
  [mainnet.id]: {
    STAKE: "0x",
    BRIDGE: "0xabe8dd90DADB368434b4a7a38Adb1F754a34f3A4",
    WCOMAI: "0xc78B628b060258300218740B1A7a5b3c82b3bd9f",
  },
};

export const STAKE_ADDRESS = contracts[chainId].STAKE;
export const BRIDGE_ADDRESS = contracts[chainId].BRIDGE;
export const WCOMAI_ADDRESS = contracts[chainId].WCOMAI;
