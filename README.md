# 🌊 AquaDAO - Decentralized Autonomous Organization

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.24-363636.svg)](https://soliditylang.org/)
[![Foundry](https://img.shields.io/badge/Built%20with-Foundry-000000.svg)](https://getfoundry.sh/)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Next.js-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg)](https://www.typescriptlang.org/)

> **AquaDAO** is a modern, fully-decentralized autonomous organization platform that empowers communities to make collective decisions through transparent, on-chain governance.

<div align="center">
  <img src="imgs/logo.png" alt="AquaDAO Logo" width="200"/>
</div>

## 🌟 What is AquaDAO?

AquaDAO is a complete DAO ecosystem that combines powerful smart contracts with an intuitive user interface. It enables any community to:

- **Create Proposals** for community decisions
- **Vote Democratically** using governance tokens
- **Manage Treasury** funds securely and transparently
- **Execute Decisions** automatically based on voting outcomes

## 🚀 Key Features

### 🗳️ **Governance & Voting**

- **Decentralized Proposals**: Anyone can create proposals for community consideration
- **Token-Based Voting**: Democratic voting weighted by governance token holdings
- **Flexible Voting Periods**: Customizable proposal duration (days/weeks)
- **Transparent Execution**: Successful proposals executed on-chain

### 💎 **Tokenomics**

- **AQUA Governance Token**: ERC20 token for voting rights
- **Simple Minting**: Acquire tokens by paying ETH (1 wei = 1 token)
- **Treasury Funding**: All minting fees flow directly to DAO treasury
- **Fair Distribution**: Open minting ensures equitable access

### 🏦 **Treasury Management**

- **Secure Fund Storage**: Multi-signature controlled treasury
- **Transparent Operations**: All fund movements recorded on-chain
- **Controlled Disbursement**: Only authorized personnel can move funds
- **Community Oversight**: Treasury activities visible to all members

### 📊 **Analytics & Insights**

- **Real-time Governance Data**: Live proposal and voting statistics
- **Historical Records**: Complete audit trail of all DAO activities
- **Member Analytics**: Individual voting history and participation
- **Treasury Metrics**: Fund flow tracking and allocation insights

## 🏗️ Architecture

AquaDAO is built with a modern, modular architecture:

```
┌─────────────────────┐    ┌─────────────────────┐
│      Frontend       │    │    Smart Contracts  │
│                     │    │                     │
│ • React.js          │◄──►│ • AquaDAO.sol       │
│ • Next.js           │    │ • AquaGovToken.sol  │
│ • TypeScript        │    │ • AquaDAOTreasury   │
│ • TailwindCSS       │    │                     │
│ • Wagmi             │    │ Built with Foundry  │
│ • RainbowKit        │    │ Deployed on Ethereum│
└─────────────────────┘    └─────────────────────┘
```

## 📁 Project Structure

```
AquaDAO/
├── 📁 aqua-dao-contact/          # Smart contracts (Backend)
│   ├── 📁 src/                   # Contract source code
│   ├── 📁 test/                  # Comprehensive test suite
│   ├── 📁 script/                # Deployment scripts
│   └── 📄 README.md              # Backend documentation
│
├── 📁 frontend/                  # React frontend (Coming Soon)
│   ├── 📁 src/                   # Frontend source code
│   ├── 📁 components/            # Reusable UI components
│   ├── 📁 pages/                 # Next.js pages
│   └── 📄 README.md              # Frontend documentation
│
├── 📁 imgs/                      # Project assets
└── 📄 README.md                  # This file
```

## 🛠️ Technology Stack

### **Backend (Smart Contracts)**

- **Solidity** - Smart contract development
- **Foundry** - Development framework and testing
- **OpenZeppelin** - Secure contract libraries
- **Ethereum** - Blockchain platform

### **Frontend (Coming Soon)**

- **React.js** - User interface library
- **Next.js** - Full-stack React framework
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Wagmi** - Ethereum React hooks
- **RainbowKit** - Wallet connection UI

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/kavinda-100/AquaDAO.git
cd AquaDAO
```

### 2. Smart Contracts Setup

```bash
cd aqua-dao-contact
forge install
forge build
forge test
```

### 3. Deploy Contracts (Local)

```bash
# Start local blockchain
anvil

# Deploy contracts
isDev=true forge script script/DeployAquaDAO.s.sol --rpc-url http://127.0.0.1:8545 --private-key <private_key> --broadcast
```

### 4. Frontend Setup (Coming Soon)

```bash
cd frontend
bun install
bun run dev
```

## 📖 Documentation

| Component           | Description                            | Link                                                       |
| ------------------- | -------------------------------------- | ---------------------------------------------------------- |
| **Smart Contracts** | Backend contracts, deployment, testing | [📄 Backend README](./aqua-dao-contact/README.md)          |
| **Frontend**        | UI components, pages, integration      | [📄 Frontend README](./frontend/README.md) _(Coming Soon)_ |
| **API Reference**   | Contract methods and events            | [📚 API Docs](./docs/api.md) _(Coming Soon)_               |

## 🧪 Testing & Coverage

AquaDAO maintains high code quality with comprehensive testing:

- ✅ **Unit Tests**: All contract functions tested
- ✅ **Fuzz Tests**: Property-based testing for security
- ✅ **Integration Tests**: End-to-end workflow validation
- ✅ **98%+ Coverage**: Lines, statements, and branches

```bash
# Run all tests
cd aqua-dao-contact && forge test

# Generate coverage report
forge coverage
```

## 🔧 Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Bun.js](https://bun.sh/)
- [Foundry](https://getfoundry.sh/)
- [Git](https://git-scm.com/)

## 🛡️ Security

AquaDAO prioritizes security:

- **Audited Contracts**: Comprehensive testing and review
- **Best Practices**: Following Solidity security patterns
- **Access Controls**: Proper permission management
- **Transparent Operations**: All activities on-chain

⚠️ **Note**: This is experimental software. Always audit before mainnet deployment.

## 🗺️ Roadmap

### Phase 1: Core DAO ✅

- [x] Smart contract development
- [x] Comprehensive testing
- [x] Deployment scripts

### Phase 2: Frontend 🚧

- [ ] React.js user interface
- [ ] Wallet integration (RainbowKit)
- [ ] Real-time updates
- [ ] Responsive design

## 📊 Stats

- **Smart Contracts**: 3 core contracts
- **Test Coverage**: 98%+
- **Gas Optimized**: Efficient contract design
- **Security Focused**: Best practice implementation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenZeppelin** for secure smart contract libraries
- **Foundry** for excellent development tools
- **Ethereum** community for continuous innovation
- **React** and **Next.js** teams for amazing frontend tools

---

<div align="center">
  <p><strong>Built with ❤️ for the decentralized future</strong></p>
  <p><em>AquaDAO - Where communities make decisions together</em></p>
</div>
