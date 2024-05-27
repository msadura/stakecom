import type { HDAccount } from "viem";
import { env } from "~core/env";
import { encodePacked, isAddress, keccak256, toBytes } from "viem";
import { mnemonicToAccount } from "viem/accounts";

import { isSS58Address } from "@stakecom/commune-sdk/utils";

type BytesType = `0x${string}`;

export async function getStakeSignature({
  evmAddress,
  ss58Address,
  moduleKey,
}: {
  evmAddress: string;
  ss58Address: string;
  moduleKey: string;
}) {
  if (!isAddress(evmAddress)) {
    throw new Error("Invalid Staker EVM address");
  }

  if (moduleKey && !isSS58Address(moduleKey)) {
    throw new Error("Invalid module key");
  }

  if (ss58Address && !isSS58Address(ss58Address)) {
    throw new Error("Invalid Staker Commune address");
  }

  if (!env.SIGNER_MNEMONIC) {
    throw new Error("SIGNER_MNEMONIC is not set");
  }

  const signer = mnemonicToAccount(env.SIGNER_MNEMONIC);
  const packedMessage = encodePacked(
    ["address", "string", "string"],
    [evmAddress, ss58Address, moduleKey],
  );
  const signature = await signPackedMessage({ signer, packedMessage });

  return signature;
}

export async function signPackedMessage({
  signer,
  packedMessage,
}: {
  signer: HDAccount;
  packedMessage: BytesType;
}) {
  const hash = keccak256(encodePacked(["bytes"], [packedMessage]));
  const signature = await signer.signMessage({
    message: { raw: toBytes(hash) },
  });

  return signature;
}
