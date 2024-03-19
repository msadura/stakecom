import {  getBalances, getSigner, stake, transfer, transferAll, unstake, } from "@stakecom/commune-sdk";
import { decryptData, encryptData, refreshStakerBalance } from "@stakecom/core";
import { formatUnits } from "viem/utils";


async function test() {
  const signer = await getSigner('');
  const signer2 = await getSigner('');

  const balances = await getBalances({ address: signer2.address });
  const balancesRec = await getBalances({ address: signer.address });
  console.log('balances', balances);
  const sendAmount = balances.balance - 10000000n;

  // const staked = await stake({ networkId: 0, amount: stakeAmount, moduleKey: '5GQjs8TywAmeKJ8nXnjR7Z1dXbMw4v7GnLJXyeggD1WHWgaf', signer: signer2})
  // const staked = await unstake({ networkId: 0, amount: 0n, moduleKey: '5GQjs8TywAmeKJ8nXnjR7Z1dXbMw4v7GnLJXyeggD1WHWgaf', signer: signer2})
  // console.log('🔥 stakere', staked);
  // const transfered = await transfer({  amount: sendAmount, recipient: signer.address, signer: signer2});
  // const transfered = await transferAll({ recipient: signer.address, signer: signer2});
  // console.log('🔥 tr res', transfered);

  const zz2 = await getBalances({ address: signer2.address});
  const balancesRec2 = await getBalances({ address: signer.address });
  console.log('balances2', zz2);
  console.log('🔥 send:', sendAmount);
  console.log('🔥 received:', balancesRec2.balance-balancesRec.balance);
}

test();
