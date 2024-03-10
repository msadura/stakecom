import type { Address, HDAccount } from "viem";
import { env } from "~core/env";
import { encodePacked, keccak256, toBytes } from "viem";
import { mnemonicToAccount } from "viem/accounts";

type BytesType = `0x${string}`;

export async function getComAddressSignature({
  evmAddress,
  ss58Address,
}: {
  evmAddress: Address;
  ss58Address: string;
}) {
  const signer = mnemonicToAccount(env.SIGNER_MNEMONIC);
  const packedMessage = encodePacked(
    ["address", "string"],
    [evmAddress, ss58Address],
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
