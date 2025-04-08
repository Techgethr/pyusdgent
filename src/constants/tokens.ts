import { PYUSD_ABI} from "./abi/pyusd";


interface Token {
    name: string;        // Nombre del token
    symbol: string;      // Símbolo del token
    decimals: number;    // Decimales del token
    contractId: string;  // ID del contrato
}

export const tokensAvailable: Token[] = [
    {
        name: "PayPal USD",
        symbol: "PYUSD",
        decimals: 6,
        contractId: "0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9",
    },
    
  ];

export const abiByToken = [
    {
        contractId: "0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9",
        ABI: PYUSD_ABI
    },
    
]

export const concatenatedTokens = tokensAvailable
        .map(
        (token) =>
            `Name: ${token.name}, Symbol: ${token.symbol}, Decimals: ${token.decimals}, Contract ID: ${token.contractId}`
        )
        .join("\n");