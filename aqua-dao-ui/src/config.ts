import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  zksync,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  anvil,
} from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Aqua DAO",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, zksync, polygon, optimism, arbitrum, base, sepolia, anvil],
  ssr: true, // If your dApp uses server side rendering (SSR)
  // add `transports` when deploying
});

export default config;
