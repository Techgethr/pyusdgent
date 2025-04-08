// Importing necessary functions and types for transaction handling
import { parseEther } from "viem"; // Function to convert ETH to Wei
import { createViemWalletClient } from "../src/viem/createViemWalletClient.js"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments
import {PYUSD_ABI} from "../src/constants/abi/pyusd";

// Configuration for the send transaction tool
export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send a transaction with optional parameters",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The recipient address",
          },
          value: {
            type: "string",
            description: "The amount of PYUSD to send (in PYUSD, not Wei)",
          },
        },
        required: ["to","value"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await sendTransaction(args);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function sendTransaction({
  to,
  value,
}: SendTransactionArgs) {
  try {
    // Creating a Viem wallet client instance
    const walletClient = createViemWalletClient();

    const amountWithDecimals = Number(value) * 10**6;

    const { request } = await walletClient.simulateContract({
      account: walletClient.account,
      address: '0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9',
      abi: PYUSD_ABI,
      functionName: 'transfer',
      //value: BigInt(amountWithDecimals),
      args: [to, BigInt(amountWithDecimals)]
    });
    const hash = await walletClient.writeContract(request);

    

    // Returning the transaction hash and a success message
    return {
      success: true,
      hash,
      message: `Transaction sent successfully. Hash: ${hash}`,
    };
  } catch (error) {
    // Handling errors and returning an error message
    return {
      success: false,
      hash: null,
      message: `Failed to send transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
