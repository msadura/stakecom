import type { Address } from "viem";
import { blastSepolia, mainnet } from "viem/chains";

console.log("🔥p", process.env);
const chainId = process.env.USE_TESTNET ? blastSepolia.id : mainnet.id;

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
    BRIDGE: "0x",
    WCOMAI: "0x",
  },
};

export const STAKE_ADDRESS = contracts[chainId].STAKE;
export const BRIDGE_ADDRESS = contracts[chainId].BRIDGE;
export const WCOMAI_ADDRESS = contracts[chainId].WCOMAI;
