# 🎨 AquaDAO Frontend dApp

<div align="center">
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black?logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Wagmi](https://img.shields.io/badge/Wagmi-2.16.9-ff6b6b?logo=ethereum)](https://wagmi.sh/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
  [![Bun](https://img.shields.io/badge/Bun-1.0-black?logo=bun)](https://bun.sh/)

**Modern, responsive, and user-friendly Web3 interface for the AquaDAO governance platform**

[🏠 Back to Main](../README.md) • [🔗 Smart Contracts](../aqua-dao-contact/README.md) • [🚀 Live Demo](https://aqua-dao.vercel.app) • [📱 Mobile Preview](#mobile-experience)

</div>

---

## 🌟 Overview

The AquaDAO frontend is a cutting-edge Web3 application built with the latest technologies to provide an exceptional user experience for decentralized governance. It seamlessly integrates with our smart contracts to offer a complete DAO management platform.

<div align="center">
  <img src="https://img.icons8.com/color/96/000000/react-native.png" width="80"/>
</div>

### ✨ What Makes Our dApp Special?

- 🎨 **Modern UI/UX** - Beautiful, intuitive interface with Glass Morphism effects
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark Mode Support** - Elegant dark/light theme switching
- ⚡ **Lightning Fast** - Built with Next.js 15 and optimized for performance
- 🔐 **Secure Web3 Integration** - RainbowKit + Wagmi for seamless wallet connections
- ♿ **Accessibility First** - WCAG compliant with keyboard navigation support

---

## 🏗️ Tech Stack

### 🎯 **Core Technologies**

<table>
  <tr>
    <th width="25%">Category</th>
    <th width="35%">Technology</th>
    <th width="40%">Purpose</th>
  </tr>
  <tr>
    <td><strong>⚛️ Framework</strong></td>
    <td>Next.js 15.2.3</td>
    <td>Full-stack React framework with App Router</td>
  </tr>
  <tr>
    <td><strong>🔗 Web3 Integration</strong></td>
    <td>Wagmi v2 + RainbowKit</td>
    <td>Ethereum wallet connection and contract interaction</td>
  </tr>
  <tr>
    <td><strong>🎨 Styling</strong></td>
    <td>Tailwind CSS</td>
    <td>Utility-first CSS with beautiful components</td>
  </tr>
  <tr>
    <td><strong>📝 Type Safety</strong></td>
    <td>TypeScript 5.0</td>
    <td>Static type checking and enhanced DX</td>
  </tr>
  <tr>
    <td><strong>🔄 State Management</strong></td>
    <td>TanStack Query</td>
    <td>Server state management and caching</td>
  </tr>
  <tr>
    <td><strong>📦 Package Manager</strong></td>
    <td>Bun</td>
    <td>Fast package management and bundling</td>
  </tr>
</table>

### 🎨 **UI Component Library**

- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful and consistent icon library
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

---

## ✨ Key Features

### 🗳️ **Governance Interface**

<div align="center">
  <img src="https://img.icons8.com/color/64/000000/voting-box.png"/>
</div>

#### Proposal Management

- ✅ **Create Proposals** - Intuitive proposal creation with form validation
- ✅ **View All Proposals** - Organized tabs for Active, Executed, and Failed proposals
- ✅ **Proposal Details** - Comprehensive proposal information and voting status
- ✅ **Real-time Updates** - Live proposal state and vote count updates

#### Voting Experience

- ✅ **One-Click Voting** - Simplified For/Against voting with visual feedback
- ✅ **Vote Confirmation** - Transaction status tracking with Etherscan links
- ✅ **Voting Power Display** - Clear indication of user's governance token balance
- ✅ **Vote History** - Track personal voting activity and outcomes

### 💎 **Token Management**

<div align="center">
  <img src="https://img.icons8.com/color/64/000000/ethereum.png"/>
</div>

#### Token Acquisition

- ✅ **Easy Minting** - Simple interface for purchasing AQUA tokens
- ✅ **Real-time Pricing** - Live ETH/AQUA conversion rates
- ✅ **Balance Display** - Current token balance and voting power

#### Wallet Integration

- ✅ **Multi-Wallet Support** - MetaMask, WalletConnect, Coinbase Wallet, and more
- ✅ **Network Switching** - Automatic network detection and switching
- ✅ **Connection Status** - Clear wallet connection state indicators
- ✅ **Transaction Signing** - Intuitive transaction confirmation flows

### 🎨 **User Experience**

<div align="center">
  <img src="https://img.icons8.com/color/64/000000/design.png"/>
</div>

#### Design System

- ✅ **Consistent Branding** - Cohesive visual identity throughout
- ✅ **Glass Morphism** - Modern frosted glass effects
- ✅ **Gradient Accents** - Beautiful color gradients and animations
- ✅ **Micro-interactions** - Delightful hover effects and transitions

#### Responsive Design

- ✅ **Mobile First** - Optimized for smartphones and tablets
- ✅ **Tablet Support** - Perfect experience on medium screens
- ✅ **Desktop Excellence** - Full-featured desktop interface
- ✅ **Touch Friendly** - Large touch targets and gesture support

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed:

```bash
# Node.js (v18 or higher)
node --version

# Bun (recommended) or npm
bun --version

# Git
git --version
```

### ⚡ Quick Setup

```bash
# Clone the repository
git clone https://github.com/kavinda-100/AquaDAO.git
cd AquaDAO/aqua-dao-ui

# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

### 🔧 Environment Configuration

Create a `.env` file with the following variables:

```bash
# Wallet Connect Project ID (required for wallet connections)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Contract addresses (auto-configured for local development)
NEXT_PUBLIC_AQUA_DAO_ADDRESS=0x...
NEXT_PUBLIC_AQUA_GOV_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_AQUA_DAO_TREASURY_ADDRESS=0x...

# RPC URLs (optional - falls back to public RPCs)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_MAINNET_RPC_URL=https://mainnet.infura.io/v3/YOUR_KEY
```

---

## 🛠️ Development

### 📚 **Available Scripts**

```bash
# Development
bun dev              # Start development server with hot reload
bun dev --turbo      # Start with Turbo mode for faster builds

# Building
bun build            # Create production build
bun start            # Start production server
bun preview          # Build and preview production locally

# Code Quality
bun lint             # Run ESLint
bun lint:fix         # Fix auto-fixable ESLint issues
bun typecheck        # TypeScript type checking
bun format:check     # Check code formatting
bun format:write     # Format code with Prettier

# Testing
bun test             # Run test suite
bun test:watch       # Run tests in watch mode
bun test:coverage    # Generate coverage report

# Utilities
bun check            # Run lint + typecheck together
```

### 🔗 **Web3 Integration**

#### Wagmi Configuration

```tsx
// lib/wagmi.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet, anvil } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "AquaDAO",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains: [sepolia, mainnet, anvil],
  ssr: true,
});
```

#### Contract Interaction Hook

```tsx
// hooks/useCreateProposal.ts
import { useWriteContract } from "wagmi";
import { AQUA_DAO_ADDRESS } from "@/abi";
import AquaDAOABI from "@/abi/AquaDAO.json";

export function useCreateProposal() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const createProposal = (description: string, durationInDays: bigint) => {
    writeContract({
      address: AQUA_DAO_ADDRESS as `0x${string}`,
      abi: AquaDAOABI.abi,
      functionName: "createProposal",
      args: [description, Bigint(durationInDays)],
    });
  };

  return {
    createProposal,
    hash,
    isPending,
    error,
  };
}
```

---

## 📱 Mobile Experience

Our dApp is designed mobile-first with touch-optimized interactions:

### 📲 **Mobile Features**

- ✅ **Touch-Friendly Interface** - Large tap targets and gesture support
- ✅ **Responsive Navigation** - Collapsible sidebar and bottom navigation
- ✅ **Mobile Wallet Integration** - Native mobile wallet support
- ✅ **Offline Indicators** - Clear connection status and error states
- ✅ **Pull-to-Refresh** - Native refresh behavior on mobile devices

### 📊 **Mobile Optimization**

```tsx
// Example: Mobile-optimized layout
<div className="container mx-auto px-4 lg:px-8">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    {proposals.map((proposal) => (
      <ProposalCard key={proposal.id} proposal={proposal} />
    ))}
  </div>
</div>
```

---

## 🚀 Deployment

### 🌐 **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Production deployment
vercel --prod
```

### 🐳 **Docker Deployment**

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### ⚙️ **Environment Variables for Production**

```bash
# Production environment variables
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_AQUA_DAO_ADDRESS=deployed_contract_address
NEXT_PUBLIC_AQUA_GOV_TOKEN_ADDRESS=deployed_token_address
NEXT_PUBLIC_AQUA_DAO_TREASURY_ADDRESS=deployed_treasury_address
```

### 📝 **Code Style**

We use ESLint and Prettier for consistent code formatting:

```bash
# Check formatting
bun format:check

# Fix formatting
bun format:write

# Check linting
bun lint

# Fix linting issues
bun lint:fix
```

---

## 📚 Resources

### 📖 **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

### 🎓 **Learning Resources**

- [React Patterns](https://reactpatterns.com/)
- [Web3 Development Guide](https://ethereum.org/en/developers/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Wagmi Team** - For excellent Web3 React hooks
- **shadcn** - For the beautiful UI component library
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the consistent icon library

---

<div align="center">
  <b>🎨 Frontend by <a href="https://github.com/kavinda-100">Kavinda Rathnayake</a></b><br/>
  <i>Crafting beautiful and intuitive Web3 experiences</i><br/><br/>
  
  [🏠 Back to Main](../README.md) • [🔗 Smart Contracts Documentation](../aqua-dao-contact/README.md)
</div>
