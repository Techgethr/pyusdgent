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
        contractId: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    },
    
  ];

export const abiByToken = [
    {
        contractId: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
        ABI: PYUSD_ABI
    },
    
]

export const concatenatedTokens = tokensAvailable
        .map(
        (token) =>
            `Name: ${token.name}, Symbol: ${token.symbol}, Decimals: ${token.decimals}, Contract ID: ${token.contractId}`
        )
        .join("\n");