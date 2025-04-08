// Importing necessary functions and types for transaction handling
import { parseEther } from "viem"; // Function to convert ETH to Wei
import { createViemWalletClient } from "../src/viem/createViemWalletClient.js"; // Function to create a Viem wallet client
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments

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
            optional: true,
          },
        },
        required: ["to"],
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
  data,
  nonce,
  gasPrice,
  accessList,
  factoryDeps,
  paymaster,
  paymasterInput,
}: SendTransactionArgs) {
  try {
    // Creating a Viem wallet client instance
    const walletClient = createViemWalletClient();

    // Sending the transaction with the provided parameters
    const hash = await walletClient.sendTransaction({
      to,
      value: value ? parseEther(value) : undefined,
      data,
      nonce: nonce || undefined,
      gasPrice: gasPrice ? parseEther(gasPrice) : undefined,
      accessList: accessList || undefined,
      customData: {
        factoryDeps: factoryDeps || undefined,
        paymaster: paymaster || undefined,
        paymasterInput: paymasterInput || undefined,
      },
    });

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
