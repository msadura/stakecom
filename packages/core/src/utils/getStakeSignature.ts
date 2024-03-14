import type { Address, HDAccount } from "viem";
import { env } from "~core/env";
import { encodePacked, keccak256, toBytes } from "viem";
import { mnemonicToAccount } from "viem/accounts";

type BytesType = `0x${string}`;

export async function getStakeSignature({
  evmAddress,
  ss58Address,
  module,
}: {
  evmAddress: string;
  ss58Address: string;
  module: string;
}) {
  const signer = mnemonicToAccount(env.SIGNER_MNEMONIC);
  const packedMessage = encodePacked(
    ["address", "string", "string"],
    [evmAddress as Address, ss58Address, module],
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
