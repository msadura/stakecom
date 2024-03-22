import { parseAbi } from "viem";

const humanAbi = [
  "function claimTokens(bytes signature, uint256 tokenAmount) external",
  "function claimedTokens(address add) external pure returns (uint256)",
  "function owner() external pure returns (address)",
] as const;

export const bridgeAbi = parseAbi(humanAbi);
