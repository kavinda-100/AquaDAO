# AquaDAO Smart Contracts 🌊

[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue.svg)](https://soliditylang.org/)
[![Foundry](https://img.shields.io/badge/Built%20with-Foundry-000000.svg)](https://getfoundry.sh/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Test Coverage](https://img.shields.io/badge/Coverage-98%25-brightgreen.svg)](#testing)

> **AquaDAO** is a decentralized autonomous organization built on Ethereum that enables community-driven governance through token-based voting and proposal management.

## 🏗️ Architecture Overview

AquaDAO consists of three core smart contracts that work together to provide a complete DAO ecosystem:

### Core Contracts

| Contract                | Purpose                  | Key Features                                 |
| ----------------------- | ------------------------ | -------------------------------------------- |
| **AquaDAO.sol**         | Main governance contract | Proposal creation, voting, execution         |
| **AquaGovToken.sol**    | ERC20 governance token   | Mintable governance tokens, treasury funding |
| **AquaDAOTreasury.sol** | Treasury management      | Secure fund storage, controlled disbursement |

## ✨ Features

### 🗳️ **Governance System**

- **Proposal Creation**: Anyone can create proposals with customizable voting periods
- **Democratic Voting**: Token-based voting with support/opposition options
- **Proposal Execution**: Successful proposals can be executed by their creators
- **Transparent Process**: All governance actions are recorded on-chain

### 💰 **Token Economics**

- **Mintable Governance Tokens**: Users can mint AQUA tokens by paying ETH
- **Treasury Integration**: All minting fees go directly to the DAO treasury
- **Fixed Pricing**: Simple 1 wei per token pricing model

### 🏦 **Treasury Management**

- **Secure Storage**: Multi-sig controlled treasury for DAO funds
- **Controlled Access**: Only owner can authorize fund disbursements
- **Transparent Operations**: All treasury activities are logged via events

### 📊 **Advanced Features**

- **Proposal Categorization**: Active, executed, and failed proposal tracking
- **Vote Tracking**: Individual voting history and status
- **Time-bound Voting**: Proposals have configurable deadlines
- **Comprehensive Views**: Rich data structures for frontend integration

## 🚀 Getting Started

### Prerequisites

- [Foundry](https://getfoundry.sh/) - Ethereum development toolkit
- [Git](https://git-scm.com/) - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kavinda-100/AquaDAO.git
   cd AquaDAO/aqua-dao-contact
   ```

2. **Install dependencies**

   ```bash
   forge install
   ```

3. **Build the contracts**
   ```bash
   forge build
   ```

## 🧪 Testing

AquaDAO maintains high test coverage with comprehensive unit and fuzz tests.

### Run All Tests

```bash
forge test
```

### Run Specific Test Contract

```bash
forge test --match-contract AquaDAOTest
```

### Generate Coverage Report

```bash
forge coverage
```

### Test Categories

- **Unit Tests**: Complete functionality testing for all contracts
- **Fuzz Tests**: Property-based testing for edge cases and security

**Current Coverage**: 98%+ lines, statements, and branches covered

## 📦 Deployment

### Local Development

1. **Start local blockchain**

   ```bash
   anvil
   ```

2. **Deploy contracts** (with deployment summary)
   ```bash
   isDev=true forge script script/DeployAquaDAO.s.sol --rpc-url http://127.0.0.1:8545 --private-key <private_key> --broadcast
   ```

### Production Deployment

```bash
forge script script/DeployAquaDAO.s.sol --rpc-url <rpc_url> --private-key <private_key> --broadcast --verify
```

## 📋 Contract Interactions

### Creating a Proposal

```solidity
aquaDAO.createProposal("Increase marketing budget", 7); // 7 days voting period
```

### Voting on a Proposal

```solidity
aquaDAO.vote(1, true); // Vote 'yes' on proposal ID 1
```

### Minting Governance Tokens

```solidity
aquaGovToken.mint{value: 100 wei}(100); // Mint 100 tokens for 100 wei
```

## 🛠️ Development Commands

### Format Code

```bash
forge fmt
```

### Gas Snapshots

```bash
forge snapshot
```

### Analyze Contract Size

```bash
forge build --sizes
```

### Static Analysis

```bash
slither .
```

## 🔒 Security Features

- **Access Control**: Role-based permissions using OpenZeppelin's Ownable
- **Reentrancy Protection**: Safe external calls and state management
- **Input Validation**: Comprehensive parameter checking
- **Error Handling**: Custom errors for gas-efficient reverts
- **Event Logging**: Complete audit trail of all operations

## 📚 Contract Documentation

### AquaDAO.sol

- **Main governance contract**
- Handles proposal lifecycle management
- Implements voting mechanics and execution logic

### AquaGovToken.sol

- **ERC20 governance token**
- Mintable with ETH payment requirement
- Integrated with treasury funding

### AquaDAOTreasury.sol

- **Treasury management contract**
- Owner-controlled fund disbursement
- Receives all token minting fees

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🔗 Links

- [Frontend Repository](../frontend) _(Coming Soon)_
- [Documentation](./docs) _(Coming Soon)_
- [Live Demo](https://aquadao.example.com) _(Coming Soon)_

---

**Built with ❤️ by [Kavinda Rathnayake](https://github.com/kavinda-100)**
