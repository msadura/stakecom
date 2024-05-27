import { getBurn, getMinStake, getSubnetName } from "@stakecom/commune-sdk";
import { formatCOMAmount } from "@stakecom/core/formatters";

const burnAmount = await getBurn(17);
console.log("🔥 burn:", formatCOMAmount(burnAmount));
const subnetName = await getSubnetName(17);
console.log("🔥 subnet:", subnetName);
const minStake = await getMinStake(17);
console.log("🔥 min stake:", formatCOMAmount(minStake));

process.exit();
