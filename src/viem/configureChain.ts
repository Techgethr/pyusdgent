import { defineChain } from 'viem'

export const ethChain = defineChain({
    id: process.env.NETWORK == "testnet"? 11155111 : 1,
    name: 'Ethereum',
    nativeCurrency: {
      decimals: 18,
      name: 'ETH',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: [process.env.GCP_RPC],
      },
    }
  })