import { createViemPublicClient } from "../src/viem/createViemPublicClient.js";
import type { ToolConfig } from "./allTools.js";
import { getContract,formatEther } from "viem";
import type { Address } from "viem";
import {PYUSD_ABI} from "../src/constants/abi/pyusd";

import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the balance of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getBalance(wallet);
  },
};

async function getBalance(wallet: Address) {
  const publicClient = createViemPublicClient();
  const balance = await publicClient.getBalance({ address: wallet });
  const contract = getContract({
    address: '0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9',
    abi: PYUSD_ABI,
    client: publicClient,
  });
  
  const balancePYUSD= await contract.read.balanceOf([wallet.toString()]);
  const formattedBalance = Number(balancePYUSD) / 10**6;
  

  return `The PYUSD balance is ${formattedBalance} and the ETH balance (to pay gas in any transaction) is ${formatEther(balance)}` ;
}
