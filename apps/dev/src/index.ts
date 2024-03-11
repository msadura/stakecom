import { decryptData, encryptData, refreshStakerBalance } from "@stakecom/core";


async function test() {
  const mnemonic = '';
  const mnemonicEncrypted = encryptData(mnemonic);

  console.log('🔥m enc', mnemonicEncrypted);
  console.log('m dec', decryptData(mnemonicEncrypted));

  await refreshStakerBalance('0x464fEcdb86cA7275c74bc65Fe95E72AA549Fa7ba')
}

test();
