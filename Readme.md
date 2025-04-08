# PYUSDgent

## Description

**PYUSDgent** is a powerful AI tool designed to interact with [PYUSD](https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd) following the principles of the [PostWeb by Outlier Ventures](http://postweb.io/). It leverages OpenAI's GPT-4o-mini model to provide a conversational interface for users to perform various blockchain operations, such as checking wallet balances, sending transactions, and more. 

## What is the problem?
Blockchain networks have brought many new opportunities to millions (if not billions) of people, but the problem lies in the interaction, since Web3 has not managed to popularize such opportunities because it is complex to use for non-technical users (managing wallets, signing transactions, many approvals before spending, among others).

AI appears as an opportunity not only to reach non-technical users, but also to reduce the time and steps for each interaction, that is, to do a lot with few instructions.

## PYUSDgent was born to solve this problem
There are already many frameworks designed to connect AI agents to Blockchain, but PYUSDgent goes one step further, with the following features:
- Lightweight, with few dependencies needed.
- Focused on the PYUSD token (to send and get balance of any wallet).
- Ability to execute several on-chain actions with a single instruction (for example: "check the balance and if you have over 10 PYSD, send 1 to .....").

## Mode
For now, PYUSDgent works in a CLI mode, in the future, it will be available to integrate in other platforms, such as messaging.


## Features

- **Conversational Interface**: Engage with the assistant to perform blockchain operations through natural language.
- **Wallet Operations**: Check wallet balances, and retrieve connected wallet addresses, and more soon.
- **Transaction Management**: Send transactions (PYUSD) in a simple way
- **Error Handling**: Robust error handling and feedback for failed operations.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- TypeScript
- [OpenAI API key](https://platform.openai.com/) to enable the AI agent.
- [Google Cloud Blockchain RPC](https://cloud.google.com/blockchain-rpc/docs/overview) to execute onchain actions. 

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/techgethr/pyusdgent.git
   cd pyusdgent
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your OpenAI API key, wallet key file and other information for the network:
   ```plaintext
      # OPENAI_API_KEY=************ enter your key here
      # WALLET_PRIVATE_KEY=**************** enter your key here
      # NETWORK=*************mainnet|testnet
      # GCP_RPC=*******enter the GCP Blockchain RPC from https://console.cloud.google.com/blockchain/rpc
   ```

_The RPC needs to match with the network (mainnet or testnet/sepolia)_

### Usage

To start the assistant, run:

```bash
bun run src/index.ts
```

You can then interact with the assistant in the command line. Type "exit" to end the conversation.

### Tools

The assistant has access to various tools for performing blockchain operations:

#### Read Operations
- **get_balance**: Check wallet balance (in PYUSD)
- **get_wallet_address**: Retrieve the connected wallet's address


#### Write Operations
- **send_transaction**: Send transactions with customizable parameters including:
  - Transaction value in PYUSD
  - Address.

#### How to extend

1. Create the actions in the [src](./src/) folder
2. Create a new tool file in the [tools](./tools/) folder.
3. Add the function in the tool with unique name.
4. Register the tool in [allTools](./tools/allTools.ts)
5. Update the prompt (**in the prompt file inside the constants folder**) for the assistant to understand when it must run the tool.


## Codebase Flow

The following sequence diagram illustrates the core flow of the application:

```mermaid
sequenceDiagram
    participant User
    participant Main
    participant Assistant
    participant Thread
    participant Tools
    participant Blockchain

    User->>Main: Start Application
    Main->>Assistant: Create Assistant
    Main->>Thread: Create Thread
    
    loop Chat Session
        User->>Main: Enter Command
        alt Command == "exit"
            Main->>User: End Session
        else Valid Command
            Main->>Thread: Add Message
            Thread->>Assistant: Process Message
            
            opt Requires Blockchain Action
                Assistant->>Tools: Call Tool
                Tools->>Blockchain: Execute Operation
                Blockchain-->>Tools: Return Result
                Tools-->>Assistant: Return Response
            end
            
            Assistant-->>Thread: Update Thread
            Thread-->>Main: Return Response
            Main->>User: Display Response
        end
    end
```

### Diagram Explanation

The sequence diagram above shows the interaction flow between different components:

1. **Initialization**:
   - PYUSDgent starts with creating an OpenAI Assistant
   - A new Thread is created for the conversation

2. **Chat Session Loop**:
   - User enters commands through the CLI
   - Commands are processed through the Thread and Assistant
   - For blockchain operations in the network, specific Tools are called
   - Results are returned through the chain of components

3. **Blockchain Integration**:
   - Tools interface with the blockchain through typescript sdks client
   - Operations are executed on the network
   - Results are propagated back to the user

4. **Session Management**:
   - Users can exit the application at any time
   - Each command is processed in a sequential manner
   - Responses are displayed back to the user


## Team

**Company**: [Techgethr](https://www.techgethr.com/), a Blockchain and Web3 Venture Builder

1. Nestor Campos (developer): https://www.linkedin.com/in/nescampos/


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.