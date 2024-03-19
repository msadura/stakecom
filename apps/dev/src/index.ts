import { getBalances, getSigner, stake, transfer, } from "@stakecom/commune-sdk";
import { decryptData, encryptData, refreshStakerBalance } from "@stakecom/core";


async function test() {
  const signer = await getSigner('');
  const signer2 = await getSigner('');

  const zz = await getBalances({ address: ''});
  console.log('balances', zz);

  // const staked = await stake({ networkId: 1, amount: BigInt(5000000000), moduleKey: '5GQjs8TywAmeKJ8nXnjR7Z1dXbMw4v7GnLJXyeggD1WHWgaf', signer})
  const transfered = await transfer({  amount: BigInt(1000000000), recipient: signer2.address, signer})

  const zz2 = await getBalances({ address: ''});
  console.log('balances2', zz2);
}

test();
